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
import { navigateToObject } from "@/utils/navigationHelper";

export const NavigationContext = createContext<NavigationContextType | null>(null);
export const MapDataContext = createContext<MapDataContextType | null>(null);

const STORAGE_KEY_STORES = "centro-fashion:stores-v3";
const STORAGE_KEY_LOCATIONS = "centro-fashion:locations-v1";
const STORAGE_KEY_CORRIDORS = "centro-fashion:corridors-v1";
const DEFAULT_POSITION = "v_pedro_pereira_centro";

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
        return parsed;
      }
    }
  } catch {
    /* ignore corrupt data */
  }

  return ((db as any).objects as ObjectItem[]).map((o) => ({
    ...o,
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
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCATIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  const dbPoints = (db as any).locationPoints as LocationPoint[] | undefined;
  if (Array.isArray(dbPoints) && dbPoints.length > 0) {
    return dbPoints;
  }
  return getDefaultLocationPoints();
}

function persistLocations(points: LocationPoint[]) {
  try {
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(points));
  } catch {
    /* ignore */
  }
}

function loadCorridorLines(): CorridorLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CORRIDORS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  const dbCorridors = (db as any).corridorLines as CorridorLine[] | undefined;
  if (Array.isArray(dbCorridors) && dbCorridors.length > 0) {
    return dbCorridors;
  }
  return getDefaultCorridorLines();
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
  const startPosition = searchParams.get("position") || DEFAULT_POSITION;
  const [navigation, setNavigation] = useState<Navigation>({
    start: startPosition,
    end: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // CRUD Lojas / Estabelecimentos
  const [storeList, setStoreList] = useState<ObjectItem[]>(loadStores);
  const [isDemarcating, setIsDemarcating] = useState(false);
  const [demarcationDraft, setDemarcationDraft] = useState<DemarcationDraft | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<ObjectItem | null>(null);

  // CRUD Pontos de Localização ("Você está aqui")
  const [locationPoints, setLocationPoints] = useState<LocationPoint[]>(loadLocations);
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [editingLocationPoint, setEditingLocationPoint] = useState<LocationPoint | null>(null);

  // CRUD Retas de Corredores (Malha desenhável pelo usuário)
  const [corridorLines, setCorridorLines] = useState<CorridorLine[]>(loadCorridorLines);
  const [isDrawingCorridor, setIsDrawingCorridor] = useState(false);
  const [showCorridorLines, setShowCorridorLines] = useState(false);

  const categories: Category[] = db.categories;

  // Enrich objects with categoryName
  const objects = useMemo(() => {
    const catMap = new globalThis.Map(categories.map((c) => [c.id, c.name]));
    return storeList.map((o) => ({
      ...o,
      categoryName: catMap.get(o.categoryId) || "",
    }));
  }, [storeList, categories]);

  // Rebuild graph whenever store list, locations or corridor lines change
  function rebuildGraph(
    stores: ObjectItem[],
    points: LocationPoint[],
    lines: CorridorLine[] = corridorLines
  ) {
    const newGraph = generateGraphData(stores, points, lines);
    setGraphData(newGraph);
    graph.loadGraph(newGraph);
    if (navigation.end) {
      setTimeout(() => {
        navigateToObject(navigation.end!, navigation, setNavigation);
      }, 0);
    }
  }

  // Initial graph load & garante que navigation.start aponte para um ponto de localização existente
  useEffect(() => {
    rebuildGraph(storeList, locationPoints, corridorLines);
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
        locationPoints,
        corridorLines,
      }),
    }).catch(() => {
      /* ignore in production */
    });
  }, [storeList, locationPoints, corridorLines]);

  useEffect(() => {
    setSearchParams({ position: navigation.start });
  }, [navigation.start, setSearchParams]);

  // CRUD Lojas
  function addStore(store: Omit<ObjectItem, "id"> & { id?: string }) {
    const newStore: ObjectItem = {
      ...store,
      id: store.id || `cf-custom-${Date.now()}`,
    } as ObjectItem;
    const updated = [...storeList, newStore];
    setStoreList(updated);
    persistStores(updated);
    rebuildGraph(updated, locationPoints);
  }

  function updateStore(store: ObjectItem) {
    const updated = storeList.map((s) => (s.id === store.id ? store : s));
    setStoreList(updated);
    persistStores(updated);
    rebuildGraph(updated, locationPoints);
  }

  function deleteStore(storeId: string) {
    const updated = storeList.filter((s) => s.id !== storeId);
    setStoreList(updated);
    persistStores(updated);
    rebuildGraph(updated, locationPoints);
  }

  function resetDefaultStores() {
    setStoreList([]);
    try {
      localStorage.removeItem(STORAGE_KEY_STORES);
    } catch {
      /* ignore */
    }
    rebuildGraph([], locationPoints);
  }

  // CRUD Pontos de Localização
  function addLocationPoint(point: Omit<LocationPoint, "id"> & { id?: string }) {
    const newPoint: LocationPoint = {
      ...point,
      id: point.id || `loc-${Date.now()}`,
    };
    const updated = [...locationPoints, newPoint];
    setLocationPoints(updated);
    persistLocations(updated);
    // Se for o primeiro ponto adicionado (ou se o start atual não existir), torna-o ativo automaticamente
    if (
      updated.length === 1 ||
      !updated.some((p) => p.id === navigation.start)
    ) {
      setNavigation((prev) => ({ ...prev, start: newPoint.id }));
    }
    rebuildGraph(storeList, updated);
  }

  function updateLocationPoint(point: LocationPoint) {
    const updated = locationPoints.map((p) => (p.id === point.id ? point : p));
    setLocationPoints(updated);
    persistLocations(updated);
    rebuildGraph(storeList, updated);
  }

  function deleteLocationPoint(pointId: string) {
    const updated = locationPoints.filter((p) => p.id !== pointId);
    setLocationPoints(updated);
    persistLocations(updated);
    // Se o ponto atual de início foi excluído, redefine para o primeiro disponível
    if (navigation.start === pointId && updated.length > 0) {
      setNavigation((prev) => ({ ...prev, start: updated[0].id }));
    }
    rebuildGraph(storeList, updated);
  }

  function clearAllLocationPoints() {
    setLocationPoints([]);
    persistLocations([]);
    rebuildGraph(storeList, []);
  }

  function resetDefaultLocationPoints() {
    const defaults = getDefaultLocationPoints();
    setLocationPoints(defaults);
    persistLocations(defaults);
    rebuildGraph(storeList, defaults, corridorLines);
  }

  // CRUD Retas de Corredores
  function addCorridorLine(line: Omit<CorridorLine, "id"> & { id?: string }) {
    const newLine: CorridorLine = {
      ...line,
      id: line.id || `cor-${Date.now()}`,
    };
    const updated = [...corridorLines, newLine];
    setCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraph(storeList, locationPoints, updated);
  }

  function updateCorridorLine(line: CorridorLine) {
    const updated = corridorLines.map((l) => (l.id === line.id ? line : l));
    setCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraph(storeList, locationPoints, updated);
  }

  function deleteCorridorLine(lineId: string) {
    const updated = corridorLines.filter((l) => l.id !== lineId);
    setCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraph(storeList, locationPoints, updated);
  }

  /**
   * Remove apenas um trecho específico (x1, y1)-(x2, y2) de uma reta de corredor.
   * Se o trecho estiver no meio de uma reta longa, divide a reta nas duas partes restantes!
   */
  function deleteCorridorSubsegment(
    sx1: number,
    sy1: number,
    sx2: number,
    sy2: number
  ) {
    const updated: CorridorLine[] = [];

    for (const line of corridorLines) {
      const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
      if (len < 1) continue;

      // Distância perpendicular de (sx1, sy1) e (sx2, sy2) até a reta `line`
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

      // Verifica se os dois extremos do trecho clicado pertencem a esta reta
      if (dist1 <= 12 && dist2 <= 12 && tMax - tMin > 0.01) {
        // Parte anterior ao trecho removido
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
          });
        }

        // Parte posterior ao trecho removido
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
          });
        }
      } else {
        updated.push(line);
      }
    }

    setCorridorLines(updated);
    persistCorridorLines(updated);
    rebuildGraph(storeList, locationPoints, updated);
  }

  function clearAllCorridorLines() {
    setCorridorLines([]);
    persistCorridorLines([]);
    rebuildGraph(storeList, locationPoints, []);
  }

  function resetDefaultCorridorLines() {
    const defaults = getDefaultCorridorLines();
    setCorridorLines(defaults);
    persistCorridorLines(defaults);
    rebuildGraph(storeList, locationPoints, defaults);
  }

  function importMapData(data: {
    objects?: ObjectItem[];
    locationPoints?: LocationPoint[];
    corridorLines?: CorridorLine[];
  }) {
    const nextStores = Array.isArray(data.objects) ? data.objects : storeList;
    const nextPoints = Array.isArray(data.locationPoints)
      ? data.locationPoints
      : locationPoints;
    const nextCorridors = Array.isArray(data.corridorLines)
      ? data.corridorLines
      : corridorLines;

    setStoreList(nextStores);
    persistStores(nextStores);

    setLocationPoints(nextPoints);
    persistLocations(nextPoints);

    setCorridorLines(nextCorridors);
    persistCorridorLines(nextCorridors);

    if (
      nextPoints.length > 0 &&
      !nextPoints.some((p) => p.id === navigation.start)
    ) {
      setNavigation((prev) => ({ ...prev, start: nextPoints[0].id }));
    }

    rebuildGraph(nextStores, nextPoints, nextCorridors);
  }

  const navigationValue: NavigationContextType = {
    navigation,
    setNavigation,
    isEditMode,
    setIsEditMode,
  };

  const mapData: MapDataContextType = {
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
