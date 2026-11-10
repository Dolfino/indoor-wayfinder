import { createContext, useEffect, useMemo, useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { useSearchParams } from "react-router-dom";
import {
  MapDataContextType,
  Navigation,
  NavigationContextType,
  ObjectItem,
  Category,
  DemarcationDraft,
  StoreType,
  LocationPoint,
  CorridorLine,
  SectorId,
  CrossSectorTransition,
  SECTOR_META_MAP,
} from "../utils/types";
import IndoorMapWrapper from "@/components/IndoorMapWrapper";
import MobileRouteDetails from "@/components/MobileRouteDetails";
import Toolbar from "@/components/Toolbar";
import Sidebar from "@/components/Sidebar";
import ConfigModal from "@/components/ConfigModal/ConfigModal";
import db from "@/assets/db.json";
import { graph } from "@/algorithms/dijkstra";
import { setGraphData } from "@/store/graphData";
import {
  generateGraphData,
  getDefaultLocationPoints,
  getDefaultCorridorLines,
} from "@/utils/graphBuilder";
import { navigateToObject, resetEdges } from "@/utils/navigationHelper";
import { toast } from "react-toastify";

export const NavigationContext = createContext<NavigationContextType | null>(null);
export const MapDataContext = createContext<MapDataContextType | null>(null);

const STORAGE_KEY_STORES = "centro-fashion:stores-v3";
const STORAGE_KEY_LOCATIONS = "centro-fashion:locations-v1";
const STORAGE_KEY_CORRIDORS = "centro-fashion:corridors-v1";
const DEFAULT_POSITION = "v_pedro_pereira_centro";
const SUPPORTED_SECTORS: SectorId[] = ["verde", "azul"];

function normalizeSector(sectorId?: string): SectorId {
  if (
    sectorId === "verde" ||
    sectorId === "azul" ||
    sectorId === "amarelo" ||
    sectorId === "roxo" ||
    sectorId === "branco"
  ) {
    return sectorId;
  }
  return "verde";
}

function loadStores(): ObjectItem[] {
  try {
    localStorage.removeItem("centro-fashion:stores");
    localStorage.removeItem("centro-fashion:stores-v2");
  } catch {
    /* ignore */
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_STORES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((o: ObjectItem) => ({
          ...o,
          sectorId: normalizeSector(o.sectorId),
        }));
      }
    }
  } catch {
    /* ignore corrupt data */
  }

  return ((db as any).objects as ObjectItem[]).map((o) => ({
    ...o,
    sectorId: normalizeSector(o.sectorId),
    type: (o.type || "loja") as StoreType,
    x: o.x ?? 0,
    y: o.y ?? 0,
    width: o.width ?? 80,
    height: o.height ?? 70,
    entranceX: o.entranceX ?? o.x ?? 0,
    entranceY: o.entranceY ?? o.y ?? 0,
  }));
}

function persistStores(stores: ObjectItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY_STORES, JSON.stringify(stores));
  } catch {
    /* ignore */
  }
}

function loadLocations(): LocationPoint[] {
  let points: LocationPoint[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCATIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        points = parsed.map((p: LocationPoint) => ({
          ...p,
          sectorId: normalizeSector(p.sectorId),
        }));
      }
    }
  } catch {
    /* ignore */
  }

  const dbPoints = ((db as any).locationPoints as LocationPoint[] | undefined) || [];

  // Garante que cada setor suportado tenha seus pontos carregados
  SUPPORTED_SECTORS.forEach((sec) => {
    const hasPoints = points.some((p) => normalizeSector(p.sectorId) === sec);
    if (!hasPoints) {
      const fromDb = dbPoints.filter((dbp) => normalizeSector(dbp.sectorId) === sec);
      if (fromDb.length > 0) {
        points.push(...fromDb.map((p) => ({ ...p, sectorId: sec })));
      } else {
        points.push(...getDefaultLocationPoints(sec));
      }
    }
  });

  return points;
}

function persistLocations(points: LocationPoint[]) {
  try {
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(points));
  } catch {
    /* ignore */
  }
}

function loadCorridorLines(): CorridorLine[] {
  let lines: CorridorLine[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CORRIDORS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        lines = parsed.map((l: CorridorLine) => ({
          ...l,
          sectorId: normalizeSector(l.sectorId),
        }));
      }
    }
  } catch {
    /* ignore */
  }

  const dbCorridors = ((db as any).corridorLines as CorridorLine[] | undefined) || [];

  // Garante que cada setor suportado tenha suas retas de corredores carregadas
  SUPPORTED_SECTORS.forEach((sec) => {
    const hasLines = lines.some((l) => normalizeSector(l.sectorId) === sec);
    if (!hasLines) {
      const fromDb = dbCorridors.filter((dbc) => normalizeSector(dbc.sectorId) === sec);
      if (fromDb.length > 0) {
        lines.push(...fromDb.map((c) => ({ ...c, sectorId: sec })));
      } else {
        lines.push(...getDefaultCorridorLines(sec));
      }
    }
  });

  return lines;
}

function persistCorridorLines(lines: CorridorLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY_CORRIDORS, JSON.stringify(lines));
  } catch {
    /* ignore */
  }
}

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSector = normalizeSector(searchParams.get("sector") || "verde");
  const rawPosition = searchParams.get("position");

  // CRUD Lojas / Estabelecimentos (Todos os setores)
  const [storeList, setStoreList] = useState<ObjectItem[]>(loadStores);
  const [isDemarcating, setIsDemarcating] = useState(false);
  const [demarcationDraft, setDemarcationDraft] = useState<DemarcationDraft | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<ObjectItem | null>(null);

  // CRUD Pontos de Localização ("Você está aqui" - Todos os setores)
  const [allLocationPoints, setAllLocationPoints] = useState<LocationPoint[]>(loadLocations);
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [editingLocationPoint, setEditingLocationPoint] = useState<LocationPoint | null>(null);

  // CRUD Retas de Corredores (Todos os setores)
  const [allCorridorLines, setAllCorridorLines] = useState<CorridorLine[]>(loadCorridorLines);
  const [isDrawingCorridor, setIsDrawingCorridor] = useState(false);
  const [showCorridorLines, setShowCorridorLines] = useState(false);

  const initialPointsForSector = useMemo(
    () => allLocationPoints.filter((p) => normalizeSector(p.sectorId) === initialSector),
    [allLocationPoints, initialSector]
  );

  const startPosition =
    (rawPosition && allLocationPoints.some((p) => p.id === rawPosition) ? rawPosition : null) ||
    initialPointsForSector[0]?.id ||
    DEFAULT_POSITION;

  const [activeSector, setActiveSectorState] = useState<SectorId>(initialSector);
  const [navigation, setNavigation] = useState<Navigation>({
    start: startPosition,
    end: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingCrossSectorRoute, setPendingCrossSectorRoute] =
    useState<CrossSectorTransition | null>(null);

  const categories: Category[] = db.categories;

  // Enrich all objects with categoryName and normalized sectorId
  const allObjects = useMemo(() => {
    const catMap = new globalThis.Map(categories.map((c) => [c.id, c.name]));
    return storeList.map((o) => ({
      ...o,
      sectorId: normalizeSector(o.sectorId),
      categoryName: catMap.get(o.categoryId) || "",
    }));
  }, [storeList, categories]);

  // Dados filtrados apenas para o setor ativo
  const objects = useMemo(
    () => allObjects.filter((o) => normalizeSector(o.sectorId) === activeSector),
    [allObjects, activeSector]
  );

  const locationPoints = useMemo(
    () =>
      allLocationPoints.filter(
        (p) => normalizeSector(p.sectorId) === activeSector
      ),
    [allLocationPoints, activeSector]
  );

  const corridorLines = useMemo(
    () =>
      allCorridorLines.filter(
        (l) => normalizeSector(l.sectorId) === activeSector
      ),
    [allCorridorLines, activeSector]
  );

  // Rebuild graph para um setor específico
  function rebuildGraphForSector(
    sector: SectorId,
    storesSource: ObjectItem[] = storeList,
    pointsSource: LocationPoint[] = allLocationPoints,
    linesSource: CorridorLine[] = allCorridorLines
  ) {
    const sectorStores = storesSource.filter(
      (s) => normalizeSector(s.sectorId) === sector
    );
    const sectorPoints = pointsSource.filter(
      (p) => normalizeSector(p.sectorId) === sector
    );
    const sectorLines = linesSource.filter(
      (l) => normalizeSector(l.sectorId) === sector
    );

    const newGraph = generateGraphData(sectorStores, sectorPoints, sectorLines);
    setGraphData(newGraph);
    graph.loadGraph(newGraph);
  }

  // Troca de Setor Ativo
  function setActiveSector(nextSector: SectorId) {
    if (nextSector === activeSector) return;
    resetEdges();
    setPendingCrossSectorRoute(null);
    setActiveSectorState(nextSector);

    const sectorPoints = allLocationPoints.filter(
      (p) => normalizeSector(p.sectorId) === nextSector
    );
    const nextStart = sectorPoints[0]?.id || "";
    setNavigation({ start: nextStart, end: "" });
    rebuildGraphForSector(
      nextSector,
      storeList,
      allLocationPoints,
      allCorridorLines
    );
  }

  /**
   * Roteamento Inteligente Entre Setores (Cross-Sector Wayfinding):
   * 1. Se o destino pertence ao setor atual, traça a rota diretamente.
   * 2. Se o destino pertence a outro setor:
   *    - Procura no setor atual por portais conectados ao setor de destino (`portalToSectorId === targetSector`)
   *      ou por nome/tipo sugestivo (ex: "Entrada Setor Azul", "Passagem Setor Azul", "Esteira Rolante", "Elevador").
   *    - Escolhe o portal com a menor rota a partir de "Você está aqui", traça o tracejado até o portal
   *      e ativa o banner de transição ("Ir para Setor X e continuar rota").
   */
  function navigateToStoreAcrossSectors(targetStore: ObjectItem) {
    const targetSector = normalizeSector(targetStore.sectorId);

    // Mesmo setor -> rota direta normal
    if (targetSector === activeSector) {
      setPendingCrossSectorRoute(null);
      navigateToObject(targetStore.name, navigation, setNavigation);
      return;
    }

    // Destino em outro setor -> procura portal no setor atual que leve ao targetSector
    const currentSectorStores = allObjects.filter(
      (o) => normalizeSector(o.sectorId) === activeSector
    );

    // 1ª prioridade: locais com `portalToSectorId === targetSector` configurado explicitamente
    let candidatePortals = currentSectorStores.filter(
      (o) => o.portalToSectorId === targetSector
    );

    // 2ª prioridade: entradas/acessos cujo nome menciona a cor do setor de destino (ex: "Setor Azul")
    const targetSectorShort =
      SECTOR_META_MAP[targetSector].shortName.toLowerCase();
    if (candidatePortals.length === 0) {
      candidatePortals = currentSectorStores.filter((o) =>
        o.name.toLowerCase().includes(targetSectorShort)
      );
    }

    // 3ª prioridade: qualquer Esteira Rolante, Escada Rolante, Elevador ou Entrada/Saída no setor atual
    if (candidatePortals.length === 0) {
      candidatePortals = currentSectorStores.filter(
        (o) =>
          o.type === "entrada_saida" ||
          o.type === "esteira_rolante" ||
          o.type === "escada_rolante" ||
          o.type === "elevador"
      );
    }

    if (candidatePortals.length > 0) {
      const chosenPortal = candidatePortals[0];
      setPendingCrossSectorRoute({
        portalObject: chosenPortal,
        targetSectorId: targetSector,
        finalDestinationObject: targetStore,
      });
      navigateToObject(chosenPortal.name, navigation, setNavigation);
      toast.info(
        `Siga até "${chosenPortal.name}" para acessar o ${SECTOR_META_MAP[targetSector].name} rumo a "${targetStore.name}"!`
      );
    } else {
      // Caso o setor atual ainda não tenha nenhum portal ou corredor que chegue a um portal,
      // muda diretamente para o setor de destino e traça a rota lá
      toast.info(
        `Alternando para ${SECTOR_META_MAP[targetSector].name} para exibir "${targetStore.name}".`
      );
      resetEdges();
      setActiveSectorState(targetSector);
      const targetPoints = allLocationPoints.filter(
        (p) => normalizeSector(p.sectorId) === targetSector
      );
      const nextStart = targetPoints[0]?.id || "";
      const nextNav = { start: nextStart, end: targetStore.name };
      setNavigation(nextNav);
      rebuildGraphForSector(
        targetSector,
        storeList,
        allLocationPoints,
        allCorridorLines
      );
      setTimeout(() => {
        navigateToObject(targetStore.name, nextNav, setNavigation);
      }, 50);
    }
  }

  /**
   * Executa a 2ª etapa da rota multi-setor quando o usuário clica em "Ir para o Setor X":
   * - Muda para o setor de destino
   * - Define o ponto de partida no portal correspondente (ou ponto mais próximo)
   * - Traça a linha tracejada até o local desejado!
   */
  function continueCrossSectorRoute() {
    if (!pendingCrossSectorRoute) return;
    const { portalObject, targetSectorId, finalDestinationObject } =
      pendingCrossSectorRoute;

    resetEdges();
    setPendingCrossSectorRoute(null);
    setActiveSectorState(targetSectorId);

    const targetPoints = allLocationPoints.filter(
      (p) => normalizeSector(p.sectorId) === targetSectorId
    );
    const targetStores = storeList.filter(
      (s) => normalizeSector(s.sectorId) === targetSectorId
    );

    // Determina o melhor ponto inicial ("Você está aqui") ao entrar no novo setor:
    // 1) Se o portal tiver `portalTargetObjectId` apontando para um ponto ou objeto no setor de destino
    let startId = targetPoints[0]?.id || "";
    if (portalObject.portalTargetObjectId) {
      const matchingPt = targetPoints.find(
        (p) => p.id === portalObject.portalTargetObjectId
      );
      if (matchingPt) {
        startId = matchingPt.id;
      } else {
        const matchingObj = targetStores.find(
          (s) => s.id === portalObject.portalTargetObjectId
        );
        if (matchingObj && targetPoints.length > 0) {
          // Escolhe o ponto de localização mais próximo ao objeto de entrada no novo setor
          const ox = matchingObj.entranceX ?? matchingObj.x ?? 1600;
          const oy = matchingObj.entranceY ?? matchingObj.y ?? 1800;
          let bestDist = Infinity;
          for (const pt of targetPoints) {
            const d = Math.hypot(pt.cx - ox, pt.cy - oy);
            if (d < bestDist) {
              bestDist = d;
              startId = pt.id;
            }
          }
        }
      }
    }

    const nextNav: Navigation = {
      start: startId,
      end: finalDestinationObject.name,
    };
    setNavigation(nextNav);
    rebuildGraphForSector(
      targetSectorId,
      storeList,
      allLocationPoints,
      allCorridorLines
    );

    setTimeout(() => {
      navigateToObject(finalDestinationObject.name, nextNav, setNavigation);
    }, 60);
  }

  // Initial graph load & garante que navigation.start aponte para um ponto de localização existente no setor
  useEffect(() => {
    rebuildGraphForSector(
      activeSector,
      storeList,
      allLocationPoints,
      allCorridorLines
    );
    if (
      locationPoints.length > 0 &&
      !locationPoints.some((p) => p.id === navigation.start)
    ) {
      setNavigation((prev) => ({ ...prev, start: locationPoints[0].id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sincroniza automaticamente com src/assets/db.json quando em ambiente de desenvolvimento
  useEffect(() => {
    fetch("/api/sync-db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        objects: storeList,
        locationPoints: allLocationPoints,
        corridorLines: allCorridorLines,
      }),
    }).catch(() => {
      /* ignore in production */
    });
  }, [storeList, allLocationPoints, allCorridorLines]);

  useEffect(() => {
    setSearchParams({
      sector: activeSector,
      position: navigation.start,
    });
  }, [activeSector, navigation.start, setSearchParams]);

  // CRUD Lojas (opera no setor ativo por padrão)
  function addStore(store: Omit<ObjectItem, "id"> & { id?: string }) {
    const newStore: ObjectItem = {
      ...store,
      id: store.id || `cf-custom-${Date.now()}`,
      sectorId: store.sectorId || activeSector,
    } as ObjectItem;
    const updated = [...storeList, newStore];
    setStoreList(updated);
    persistStores(updated);
    rebuildGraphForSector(
      activeSector,
      updated,
      allLocationPoints,
      allCorridorLines
    );
  }

  function updateStore(store: ObjectItem) {
    const normalized: ObjectItem = {
      ...store,
      sectorId: store.sectorId || activeSector,
    };
    const updated = storeList.map((s) =>
      s.id === normalized.id ? normalized : s
    );
    setStoreList(updated);
    persistStores(updated);
    rebuildGraphForSector(
      activeSector,
      updated,
      allLocationPoints,
      allCorridorLines
    );
  }

  function deleteStore(storeId: string) {
    const updated = storeList.filter((s) => s.id !== storeId);
    setStoreList(updated);
    persistStores(updated);
    rebuildGraphForSector(
      activeSector,
      updated,
      allLocationPoints,
      allCorridorLines
    );
  }

  function resetDefaultStores() {
    // Remove apenas os locais do setor ativo
    const updated = storeList.filter(
      (s) => normalizeSector(s.sectorId) !== activeSector
    );
    setStoreList(updated);
    persistStores(updated);
    rebuildGraphForSector(
      activeSector,
      updated,
      allLocationPoints,
      allCorridorLines
    );
  }

  // CRUD Pontos de Localização (opera no setor ativo)
  function addLocationPoint(point: Omit<LocationPoint, "id"> & { id?: string }) {
    const newPoint: LocationPoint = {
      ...point,
      id: point.id || `loc-${Date.now()}`,
      sectorId: point.sectorId || activeSector,
    };
    const updated = [...allLocationPoints, newPoint];
    setAllLocationPoints(updated);
    persistLocations(updated);
    const sectorPts = updated.filter(
      (p) => normalizeSector(p.sectorId) === activeSector
    );
    if (
      sectorPts.length === 1 ||
      !sectorPts.some((p) => p.id === navigation.start)
    ) {
      setNavigation((prev) => ({ ...prev, start: newPoint.id }));
    }
    rebuildGraphForSector(activeSector, storeList, updated, allCorridorLines);
  }

  function updateLocationPoint(point: LocationPoint) {
    const normalized: LocationPoint = {
      ...point,
      sectorId: point.sectorId || activeSector,
    };
    const updated = allLocationPoints.map((p) =>
      p.id === normalized.id ? normalized : p
    );
    setAllLocationPoints(updated);
    persistLocations(updated);
    rebuildGraphForSector(activeSector, storeList, updated, allCorridorLines);
  }

  function deleteLocationPoint(pointId: string) {
    const updated = allLocationPoints.filter((p) => p.id !== pointId);
    setAllLocationPoints(updated);
    persistLocations(updated);
    const sectorPts = updated.filter(
      (p) => normalizeSector(p.sectorId) === activeSector
    );
    if (navigation.start === pointId && sectorPts.length > 0) {
      setNavigation((prev) => ({ ...prev, start: sectorPts[0].id }));
    }
    rebuildGraphForSector(activeSector, storeList, updated, allCorridorLines);
  }

  function clearAllLocationPoints() {
    const updated = allLocationPoints.filter(
      (p) => normalizeSector(p.sectorId) !== activeSector
    );
    setAllLocationPoints(updated);
    persistLocations(updated);
    rebuildGraphForSector(activeSector, storeList, updated, allCorridorLines);
  }

  function resetDefaultLocationPoints() {
    const others = allLocationPoints.filter(
      (p) => normalizeSector(p.sectorId) !== activeSector
    );
    const defaults = getDefaultLocationPoints(activeSector).map((p) => ({
      ...p,
      sectorId: activeSector,
    }));
    const updated = [...others, ...defaults];
    setAllLocationPoints(updated);
    persistLocations(updated);
    rebuildGraphForSector(activeSector, storeList, updated, allCorridorLines);
  }

  // CRUD Retas de Corredores (opera no setor ativo)
  function addCorridorLine(line: Omit<CorridorLine, "id"> & { id?: string }) {
    const newLine: CorridorLine = {
      ...line,
      id: line.id || `cor-${Date.now()}`,
      sectorId: line.sectorId || activeSector,
    };
    const updated = [...allCorridorLines, newLine];
    setAllCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraphForSector(activeSector, storeList, allLocationPoints, updated);
  }

  function updateCorridorLine(line: CorridorLine) {
    const normalized: CorridorLine = {
      ...line,
      sectorId: line.sectorId || activeSector,
    };
    const updated = allCorridorLines.map((l) =>
      l.id === normalized.id ? normalized : l
    );
    setAllCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraphForSector(activeSector, storeList, allLocationPoints, updated);
  }

  function deleteCorridorLine(lineId: string) {
    const updated = allCorridorLines.filter((l) => l.id !== lineId);
    setAllCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraphForSector(activeSector, storeList, allLocationPoints, updated);
  }

  /**
   * Remove apenas um trecho específico (x1, y1)-(x2, y2) de uma reta de corredor do setor ativo.
   * Se o trecho estiver no meio de uma reta longa, divide a reta nas duas partes restantes!
   */
  function deleteCorridorSubsegment(
    sx1: number,
    sy1: number,
    sx2: number,
    sy2: number
  ) {
    const updated: CorridorLine[] = [];

    for (const line of allCorridorLines) {
      if (normalizeSector(line.sectorId) !== activeSector) {
        updated.push(line);
        continue;
      }

      const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
      if (len < 1) continue;

      const dx = line.x2 - line.x1;
      const dy = line.y2 - line.y1;
      const lenSq = dx * dx + dy * dy;

      const t1 = ((sx1 - line.x1) * dx + (sy1 - line.y1) * dy) / lenSq;
      const t2 = ((sx2 - line.x1) * dx + (sy2 - line.y1) * dy) / lenSq;

      const p1x = line.x1 + t1 * dx;
      const p1y = line.y1 + t1 * dy;
      const p2x = line.x1 + t2 * dx;
      const p2y = line.y1 + t2 * dy;

      const dist1 = Math.hypot(sx1 - p1x, sy1 - p1y);
      const dist2 = Math.hypot(sx2 - p2x, sy2 - p2y);

      const tMin = Math.max(0, Math.min(t1, t2));
      const tMax = Math.min(1, Math.max(t1, t2));

      if (dist1 <= 12 && dist2 <= 12 && tMax - tMin > 0.01) {
        const pStartX = Math.round(line.x1 + tMin * dx);
        const pStartY = Math.round(line.y1 + tMin * dy);
        if (Math.hypot(pStartX - line.x1, pStartY - line.y1) >= 12) {
          updated.push({
            id: `${line.id}_a_${Date.now()}`,
            name: `${line.name} (Trecho 1)`,
            x1: line.x1,
            y1: line.y1,
            x2: pStartX,
            y2: pStartY,
            sectorId: activeSector,
          });
        }

        const pEndX = Math.round(line.x1 + tMax * dx);
        const pEndY = Math.round(line.y1 + tMax * dy);
        if (Math.hypot(line.x2 - pEndX, line.y2 - pEndY) >= 12) {
          updated.push({
            id: `${line.id}_b_${Date.now() + 1}`,
            name: `${line.name} (Trecho 2)`,
            x1: pEndX,
            y1: pEndY,
            x2: line.x2,
            y2: line.y2,
            sectorId: activeSector,
          });
        }
      } else {
        updated.push(line);
      }
    }

    setAllCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraphForSector(activeSector, storeList, allLocationPoints, updated);
  }

  function clearAllCorridorLines() {
    const updated = allCorridorLines.filter(
      (l) => normalizeSector(l.sectorId) !== activeSector
    );
    setAllCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraphForSector(activeSector, storeList, allLocationPoints, updated);
  }

  function resetDefaultCorridorLines() {
    const others = allCorridorLines.filter(
      (l) => normalizeSector(l.sectorId) !== activeSector
    );
    const defaults = getDefaultCorridorLines(activeSector).map((l) => ({
      ...l,
      sectorId: activeSector,
    }));
    const updated = [...others, ...defaults];
    setAllCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraphForSector(activeSector, storeList, allLocationPoints, updated);
  }

  function importMapData(data: {
    objects?: ObjectItem[];
    locationPoints?: LocationPoint[];
    corridorLines?: CorridorLine[];
  }) {
    const nextStores = Array.isArray(data.objects)
      ? data.objects.map((o) => ({
          ...o,
          sectorId: normalizeSector(o.sectorId),
        }))
      : storeList;
    const nextPoints = Array.isArray(data.locationPoints)
      ? data.locationPoints.map((p) => ({
          ...p,
          sectorId: normalizeSector(p.sectorId),
        }))
      : allLocationPoints;
    const nextCorridors = Array.isArray(data.corridorLines)
      ? data.corridorLines.map((l) => ({
          ...l,
          sectorId: normalizeSector(l.sectorId),
        }))
      : allCorridorLines;

    setStoreList(nextStores);
    persistStores(nextStores);

    setAllLocationPoints(nextPoints);
    persistLocations(nextPoints);

    setAllCorridorLines(nextCorridors);
    persistCorridorLines(nextCorridors);

    const sectorPts = nextPoints.filter(
      (p) => normalizeSector(p.sectorId) === activeSector
    );
    if (
      sectorPts.length > 0 &&
      !sectorPts.some((p) => p.id === navigation.start)
    ) {
      setNavigation((prev) => ({ ...prev, start: sectorPts[0].id }));
    }

    rebuildGraphForSector(activeSector, nextStores, nextPoints, nextCorridors);
  }

  const navigationValue: NavigationContextType = {
    navigation,
    setNavigation,
    isEditMode,
    setIsEditMode,
  };

  const mapData: MapDataContextType = {
    activeSector,
    setActiveSector,
    allObjects,
    allLocationPoints,
    allCorridorLines,
    pendingCrossSectorRoute,
    setPendingCrossSectorRoute,
    navigateToStoreAcrossSectors,
    continueCrossSectorRoute,

    objects,
    categories,
    addStore,
    updateStore,
    deleteStore,
    resetDefaultStores,
    isDemarcating,
    setIsDemarcating,
    demarcationDraft,
    setDemarcationDraft,
    isConfigModalOpen,
    setIsConfigModalOpen,
    editingStore,
    setEditingStore,

    // CRUD de Pontos de Localização
    locationPoints,
    addLocationPoint,
    updateLocationPoint,
    deleteLocationPoint,
    clearAllLocationPoints,
    resetDefaultLocationPoints,
    isAddingPoint,
    setIsAddingPoint,
    editingLocationPoint,
    setEditingLocationPoint,

    // CRUD de Retas de Corredores
    corridorLines,
    addCorridorLine,
    updateCorridorLine,
    deleteCorridorLine,
    deleteCorridorSubsegment,
    clearAllCorridorLines,
    resetDefaultCorridorLines,
    isDrawingCorridor,
    setIsDrawingCorridor,
    showCorridorLines,
    setShowCorridorLines,
    importMapData,
  };

  return (
    <MapDataContext.Provider value={mapData}>
      <NavigationContext.Provider value={navigationValue}>
        <div className="flex bg-gray-100 text-gray-800 relative overflow-hidden w-full h-screen">
          {isDesktop && <Sidebar />}
          <main
            className={`flex w-full ${
              isDesktop ? "-ml-96 lg:ml-0" : ""
            } justify-center flex-grow flex-col md:p-8 p-2 transition-all duration-150 ease-in`}
          >
            <Toolbar />
            <div className="center w-full h-full">
              <IndoorMapWrapper />
            </div>
          </main>
          {navigation.end && isMobile && <MobileRouteDetails />}
        </div>
        <ConfigModal />
      </NavigationContext.Provider>
    </MapDataContext.Provider>
  );
}

export default Map;
