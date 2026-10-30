import { useContext } from "react";
import { MapDataContext } from "@/pages/Map";
import { MapDataContextType, ObjectItem, STORE_TYPE_META, StoreType } from "@/utils/types";

interface ObjectsProps {
  handleObjectClick: (store: ObjectItem) => void;
  className?: string;
}

/**
 * Quebra o nome da loja em múltiplas linhas inteligentes
 * para caixas estreitas ou nomes longos não transbordarem.
 */
function wrapText(text: string, maxChars: number): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return [text];
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if (!current) {
      current = w;
    } else if ((current + " " + w).length <= maxChars) {
      current += " " + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function Objects({ handleObjectClick, className }: ObjectsProps) {
  const { objects } = useContext(MapDataContext) as MapDataContextType;

  return (
    <g id="Objects">
      <defs>
        {/* ClipPath para cada local para garantir que o texto NUNCA ultrapasse a borda do retângulo */}
        {objects.map((store) => {
          if (store.x === undefined || store.y === undefined) return null;
          const w = store.width ?? 75;
          const h = store.height ?? 70;
          const isQuiosque = store.type === "quiosque";
          const rx = isQuiosque ? 14 : 6;
          return (
            <clipPath key={`clip-${store.id}`} id={`clip-${store.id}`}>
              <rect
                x={store.x + 1}
                y={store.y + 1}
                width={Math.max(w - 2, 2)}
                height={Math.max(h - 2, 2)}
                rx={rx}
              />
            </clipPath>
          );
        })}
      </defs>

      {objects.map((store) => {
        if (store.x === undefined || store.y === undefined) return null;
        const storeType = (store.type || "loja") as StoreType;
        const typeMeta = STORE_TYPE_META[storeType] || STORE_TYPE_META.loja;
        const isQuiosque = storeType === "quiosque";
        const w = store.width ?? 75;
        const h = store.height ?? 70;

        // Para tipos de acesso/serviço (Elevador, Escada Rolante, Esteira Rolante, Banheiro, etc.),
        // prefixa o ícone visual para destacar claramente no mapa
        const displayName = typeMeta.isAccessOrService
          ? `${typeMeta.icon} ${store.name}`
          : store.name;

        // Limite de caracteres por linha com base na largura da caixa
        // Boxes estreitos (ex: w=45px) usam linhas curtas (6 a 8 letras)
        const maxCharsPerLine = Math.max(6, Math.floor(w / 6.2));
        const lines = wrapText(displayName, maxCharsPerLine);

        // Encontra o comprimento da maior linha
        const longestLineLen = Math.max(...lines.map((l) => l.length), 1);
        const availW = Math.max(w - 6, 8);
        const availH = Math.max(h - 6, 8);

        // Fonte calculada para que a maior linha caiba na largura E todas as linhas caibam na altura
        const fontByWidth = availW / (longestLineLen * 0.58);
        const fontByHeight = availH / (lines.length * 1.25);
        const fontSize = Math.max(
          7,
          Math.min(Math.floor(fontByWidth), Math.floor(fontByHeight), 36)
        );
        const lineHeight = Math.round(fontSize * 1.18);
        const strokeW = Math.max(1.5, Math.min(Math.round(fontSize * 0.08), 3));

        // Centro da caixa
        const cx = store.x + w / 2;
        const cy = store.y + h / 2;

        // Posição inicial vertical para centralizar o bloco inteiro de linhas
        const totalBlockHeight = (lines.length - 1) * lineHeight;
        const startY = cy - totalBlockHeight / 2;

        return (
          <g
            key={store.id}
            id={store.name}
            data-store-name={store.name}
            onClick={() => handleObjectClick(store)}
            className={`${className || ""} object-group transition-all object-${storeType}`}
          >
            {/* Tooltip nativo instantâneo ao passar o mouse */}
            <title>{`${typeMeta.icon} ${store.name} (${typeMeta.label})${
              store.desc ? ` - ${store.desc}` : ""
            }`}</title>

            <rect
              id={store.name}
              x={store.x}
              y={store.y}
              width={w}
              height={h}
              rx={isQuiosque ? 14 : 6}
              className="object-rect"
            />

            {/* Texto confinado dentro do clipPath do próprio box */}
            <text
              clipPath={`url(#clip-${store.id})`}
              x={cx}
              y={startY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
              fontWeight="700"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinejoin="round"
              paintOrder="stroke fill"
              className="object-label"
              pointerEvents="none"
              style={{
                userSelect: "none",
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {lines.map((line, i) => (
                <tspan
                  key={i}
                  x={cx}
                  dy={i === 0 ? 0 : lineHeight}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default Objects;
