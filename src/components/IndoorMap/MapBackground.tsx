import floorplanVerde from "@/assets/img/centro-fashion-setor-verde.webp";
import floorplanAzul from "@/assets/img/centro-fashion-setor-azul.webp";
import floorplanAmarelo from "@/assets/img/centro-fashion-setor-amarelo.webp";
import floorplanRoxo from "@/assets/img/centro-fashion-setor-roxo.webp";
import floorplanBranco from "@/assets/img/centro-fashion-setor-branco.webp";
import { ReactNode, useContext, useRef, useState, PointerEvent } from "react";
import { MapDataContext } from "@/pages/Map";
import { MapDataContextType, SectorId, SECTOR_META_MAP } from "@/utils/types";
import { toast } from "react-toastify";

const SECTOR_FLOORPLANS: Record<SectorId, string> = {
  verde: floorplanVerde,
  azul: floorplanAzul,
  amarelo: floorplanAmarelo,
  roxo: floorplanRoxo,
  branco: floorplanBranco,
};

interface MapBackgroundProps {
  children: ReactNode;
}

function MapBackground({ children }: MapBackgroundProps) {
  const {
    activeSector,
    isDemarcating,
    setIsDemarcating,
    demarcationDraft,
    setDemarcationDraft,
    setIsConfigModalOpen,
    isAddingPoint,
    setIsAddingPoint,
    editingLocationPoint,
    setEditingLocationPoint,
    corridorLines,
    addCorridorLine,
    isDrawingCorridor,
    isAdmin,
  } = useContext(MapDataContext) as MapDataContextType;

  const floorplan = SECTOR_FLOORPLANS[activeSector] || floorplanVerde;
  const sectorMeta = SECTOR_META_MAP[activeSector];

  const svgRef = useRef<SVGSVGElement>(null);
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const [localDraft, setLocalDraft] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [lineDraft, setLineDraft] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);

  function toSvgPoint(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return pt.matrixTransform(ctm.inverse());
  }

  /**
   * Faz snap em extremidades existentes de retas de corredor (<= 22px)
   */
  function snapEndpoint(x: number, y: number) {
    for (const l of corridorLines) {
      if (Math.hypot(l.x1 - x, l.y1 - y) <= 22) {
        return { x: l.x1, y: l.y1 };
      }
      if (Math.hypot(l.x2 - x, l.y2 - y) <= 22) {
        return { x: l.x2, y: l.y2 };
      }
    }
    return { x: Math.round(x), y: Math.round(y) };
  }

  function handlePointerDown(e: PointerEvent<SVGSVGElement>) {
    if (e.button !== 0) return;

    // Se não for admin, não permite ações de demarcação ou desenho
    if (!isAdmin) return;

    // 1. Modo: Clicar no mapa para posicionar Ponto de Localização
    if (isAddingPoint) {
      const pt = toSvgPoint(e.clientX, e.clientY);
      if (!pt) return;
      const cx = Math.round(pt.x);
      const cy = Math.round(pt.y);
      if (editingLocationPoint) {
        setEditingLocationPoint({ ...editingLocationPoint, cx, cy });
      } else {
        setEditingLocationPoint({ id: "", name: "", cx, cy });
      }
      setIsAddingPoint(false);
      setIsConfigModalOpen(true);
      return;
    }

    // 2. Modo: Desenhar Reta de Corredor (clicar e arrastar)
    if (isDrawingCorridor) {
      const pt = toSvgPoint(e.clientX, e.clientY);
      if (!pt) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      const snapped = snapEndpoint(pt.x, pt.y);
      startPoint.current = { x: snapped.x, y: snapped.y };
      setLineDraft({
        x1: snapped.x,
        y1: snapped.y,
        x2: snapped.x,
        y2: snapped.y,
      });
      return;
    }

    // 3. Modo: Arrastar no mapa para demarcar Loja / Box
    if (!isDemarcating) return;
    const pt = toSvgPoint(e.clientX, e.clientY);
    if (!pt) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startPoint.current = { x: pt.x, y: pt.y };
    setLocalDraft({ x: pt.x, y: pt.y, width: 0, height: 0 });
  }

  function handlePointerMove(e: PointerEvent<SVGSVGElement>) {
    if (isDrawingCorridor && startPoint.current) {
      const pt = toSvgPoint(e.clientX, e.clientY);
      if (!pt) return;
      let x2 = Math.round(pt.x);
      let y2 = Math.round(pt.y);
      const dx = Math.abs(x2 - startPoint.current.x);
      const dy = Math.abs(y2 - startPoint.current.y);

      // Auto-snap para reta perfeitamente horizontal ou vertical (a menos que segure Shift)
      if (!e.shiftKey) {
        if (dx < 24 && dy > 24) {
          x2 = startPoint.current.x;
        } else if (dy < 24 && dx > 24) {
          y2 = startPoint.current.y;
        }
      }

      const snappedEnd = snapEndpoint(x2, y2);
      setLineDraft({
        x1: startPoint.current.x,
        y1: startPoint.current.y,
        x2: snappedEnd.x,
        y2: snappedEnd.y,
      });
      return;
    }

    if (!isDemarcating || !startPoint.current) return;
    const pt = toSvgPoint(e.clientX, e.clientY);
    if (!pt) return;
    const x = Math.min(startPoint.current.x, pt.x);
    const y = Math.min(startPoint.current.y, pt.y);
    const width = Math.abs(pt.x - startPoint.current.x);
    const height = Math.abs(pt.y - startPoint.current.y);
    setLocalDraft({ x, y, width, height });
  }

  function handlePointerUp(e: PointerEvent<SVGSVGElement>) {
    if (isDrawingCorridor && startPoint.current && lineDraft) {
      const length = Math.hypot(
        lineDraft.x2 - lineDraft.x1,
        lineDraft.y2 - lineDraft.y1
      );
      if (length >= 25) {
        const isHorizontal =
          Math.abs(lineDraft.x2 - lineDraft.x1) >=
          Math.abs(lineDraft.y2 - lineDraft.y1);
        const defaultName = isHorizontal
          ? `Corredor Horizontal (Y=${lineDraft.y1})`
          : `Corredor Vertical (X=${lineDraft.x1})`;

        addCorridorLine({
          name: defaultName,
          x1: lineDraft.x1,
          y1: lineDraft.y1,
          x2: lineDraft.x2,
          y2: lineDraft.y2,
        });
        toast.success(`Reta "${defaultName}" adicionada à malha de rotas!`);
      }
      setLineDraft(null);
      startPoint.current = null;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      return;
    }

    if (!isDemarcating || !startPoint.current) return;
    const pt = toSvgPoint(e.clientX, e.clientY);
    if (pt) {
      const x = Math.round(Math.min(startPoint.current.x, pt.x));
      const y = Math.round(Math.min(startPoint.current.y, pt.y));
      const width = Math.round(Math.abs(pt.x - startPoint.current.x));
      const height = Math.round(Math.abs(pt.y - startPoint.current.y));

      if (width >= 12 && height >= 12) {
        const draft = { x, y, width, height };
        setDemarcationDraft(draft);
        setLocalDraft(null);
        setIsDemarcating(false);
        setIsConfigModalOpen(true);
      } else {
        setLocalDraft(null);
      }
    }
    startPoint.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  const currentDraft = localDraft || demarcationDraft;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 3329 3600"
      className={`lg:h-[85vh] lg:w-[75vw] h-[85dvh] ${
        isDemarcating || isAddingPoint || isDrawingCorridor
          ? "cursor-crosshair select-none"
          : ""
      }`}
      aria-label={`Planta Centro Fashion - ${sectorMeta.name}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        startPoint.current = null;
        setLocalDraft(null);
        setLineDraft(null);
      }}
    >
      <image
        id="background"
        x="0"
        y="0"
        width="3329"
        height="3600"
        href={floorplan}
      />
      {children}
      {currentDraft && (
        <rect
          x={currentDraft.x}
          y={currentDraft.y}
          width={currentDraft.width}
          height={currentDraft.height}
          rx={6}
          className="object-draft"
        />
      )}
      {lineDraft && (
        <g pointerEvents="none">
          <line
            x1={lineDraft.x1}
            y1={lineDraft.y1}
            x2={lineDraft.x2}
            y2={lineDraft.y2}
            stroke="#f97316"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray="14 8"
          />
          <circle cx={lineDraft.x1} cy={lineDraft.y1} r={9} fill="#ea580c" />
          <circle cx={lineDraft.x2} cy={lineDraft.y2} r={9} fill="#ea580c" />
        </g>
      )}
    </svg>
  );
}

export default MapBackground;
