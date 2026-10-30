import { useContext } from "react";
import { MapDataContext } from "@/pages/Map";
import { MapDataContextType, NavigationContextType } from "@/utils/types";

interface PositionsProps {
  positionRadius: number;
  handlePositionClick: (e: React.MouseEvent<SVGElement>) => void;
  className: string;
  navigation?: NavigationContextType["navigation"];
}

function Positions({
  positionRadius,
  handlePositionClick,
  className,
  navigation,
}: PositionsProps) {
  const { locationPoints } = useContext(MapDataContext) as MapDataContextType;

  const positionBackgroundColor = "#4285f4";
  const positionBackgroundRadius = positionRadius + 14;
  const positonBackgroundOpacity = 0.25;
  const startVertex =
    locationPoints.find((v) => v.id === navigation?.start) || locationPoints[0];

  function isActivePosition(vertexId: string) {
    return navigation?.start === vertexId;
  }

  return (
    <g id="Vertexes">
      {/* Círculo com efeito de aura para a posição atual (estilo Google Maps) */}
      {startVertex && (
        <circle
          id="background-circle"
          cx={startVertex.cx}
          cy={startVertex.cy}
          fill={positionBackgroundColor}
          opacity={positonBackgroundOpacity}
          r={positionBackgroundRadius}
        />
      )}

      {locationPoints.map((point) => (
        <circle
          onClick={handlePositionClick}
          key={point.id}
          id={point.id}
          className={`position ${className} ${
            isActivePosition(point.id) ? "position-active opacity-100" : ""
          }`}
          cx={point.cx}
          cy={point.cy}
          r={positionRadius}
        >
          <title>{`${point.name} (${point.cx}, ${point.cy})`}</title>
        </circle>
      ))}

      {/* Círculo animado pulsante na posição atual */}
      {startVertex && (
        <circle
          id="circle-animation"
          cx={startVertex.cx}
          cy={startVertex.cy}
          fill="none"
          stroke="white"
          strokeWidth={3}
          r={positionRadius}
          pointerEvents="none"
        >
          <animate
            attributeName="stroke-width"
            values="2;5;2"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </g>
  );
}

export default Positions;
