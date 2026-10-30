import { useContext } from "react";
import { MapDataContext } from "@/pages/Map";
import { MapDataContextType } from "@/utils/types";
import { graphData } from "@/store/graphData";
import { toast } from "react-toastify";

function Paths() {
  const {
    deleteCorridorSubsegment,
    isDrawingCorridor,
    showCorridorLines,
  } = useContext(MapDataContext) as MapDataContextType;

  const visibleCorridors = isDrawingCorridor || showCorridorLines;

  return (
    <g id="Edges">
      {/* Trechos individuais (entre cruzamentos) clicáveis para remover apenas aquele trecho! */}
      {graphData.edges.map((edge) => {
        const { id, from, to } = edge;
        const fromVertex = graphData.vertices.find(
          (vertex) => vertex.id === from
        );
        const toVertex = graphData.vertices.find((vertex) => vertex.id === to);
        if (fromVertex && toVertex) {
          const isStoreLink =
            from.startsWith("v_store_") ||
            to.startsWith("v_store_") ||
            !from.startsWith("v_cor_") ||
            !to.startsWith("v_cor_");

          const pathD = `M${fromVertex.cx} ${fromVertex.cy}L${toVertex.cx} ${toVertex.cy}`;
          return (
            <g key={id}>
              <path id={id} className="path" d={pathD} />
              {visibleCorridors && !isStoreLink && (
                <g>
                  <line
                    x1={fromVertex.cx}
                    y1={fromVertex.cy}
                    x2={toVertex.cx}
                    y2={toVertex.cy}
                    stroke="#f97316"
                    strokeWidth={8}
                    strokeLinecap="round"
                    strokeDasharray="14 10"
                    opacity={0.95}
                    className="cursor-pointer hover:stroke-red-600 hover:opacity-100 transition-all"
                    onPointerDown={(e) => {
                      // Evita iniciar um novo desenho quando o usuário clica para remover um trecho
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCorridorSubsegment(
                        fromVertex.cx,
                        fromVertex.cy,
                        toVertex.cx,
                        toVertex.cy
                      );
                      toast.info("Trecho do corredor removido!");
                    }}
                  >
                    <title>{`Trecho (${fromVertex.cx},${fromVertex.cy}) ↔ (${toVertex.cx},${toVertex.cy}) — Clique para remover apenas este trecho!`}</title>
                  </line>
                  <circle
                    cx={fromVertex.cx}
                    cy={fromVertex.cy}
                    r={5}
                    fill="#ea580c"
                    pointerEvents="none"
                  />
                  <circle
                    cx={toVertex.cx}
                    cy={toVertex.cy}
                    r={5}
                    fill="#ea580c"
                    pointerEvents="none"
                  />
                </g>
              )}
            </g>
          );
        }
        return null;
      })}
      <path id="navigation-route" className="path" d="" fill="none" />
    </g>
  );
}

export default Paths;
