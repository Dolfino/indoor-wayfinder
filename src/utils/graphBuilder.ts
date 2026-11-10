import { ObjectItem, LocationPoint, CorridorLine, SectorId } from "./types";
import { EdgeData, GraphData, VertexData } from "@/store/graphData";

export const CORRIDOR_STREETS = [
  { id: "antonio_pompeu", name: "Rua Antônio Pompeu", x: 432 },
  { id: "meton", name: "Rua Meton de Alencar", x: 614 },
  { id: "clarindo", name: "Rua Clarindo de Queiroz", x: 757 },
  { id: "duque", name: "Av. Duque de Caxias", x: 907 },
  { id: "dom_pedro", name: "Rua Dom Pedro I", x: 1052 },
  { id: "pedro_pereira", name: "Rua Pedro Pereira", x: 1197 },
  { id: "liberato", name: "Rua Liberato Barroso", x: 1337 },
  { id: "guilherme", name: "Rua Guilherme Rocha", x: 1490 },
  { id: "sao_paulo", name: "Rua São Paulo", x: 1627 },
  { id: "senador_alencar", name: "Rua Senador Alencar", x: 1770 },
  { id: "castro_silva", name: "Rua Castro e Silva", x: 1910 },
  { id: "senador_jaguaribe", name: "Rua Senador Jaguaribe / Av. Castelo Branco", x: 2106 },
];

export const CORRIDOR_TRANSVERSAIS = [
  { id: "norte", name: "Corredor Norte", y: 358 },
  { id: "meio_sup", name: "Transversal Meio Superior", y: 1217 },
  { id: "centro_sup", name: "Transversal Patamar Superior", y: 1884 },
  { id: "centro", name: "Transversal Central", y: 2064 },
  { id: "centro_inf", name: "Transversal Patamar Inferior", y: 2238 },
  { id: "meio_inf", name: "Transversal Meio Inferior", y: 2748 },
  { id: "sul", name: "Corredor Ala Sul", y: 3036 },
];

export const CORRIDOR_STREETS_AZUL = [
  { id: "dom_manuel", name: "Av. Dom Manuel", x: 520 },
  { id: "25_marco", name: "Rua 25 de Março", x: 580 },
  { id: "coronel_ferraz", name: "Rua Coronel Ferraz", x: 732 },
  { id: "sao_jose", name: "Rua São José", x: 848 },
  { id: "gov_sampaio", name: "Rua Governador Sampaio", x: 964 },
  { id: "conde_deu", name: "Rua Conde d'Eu", x: 1080 },
  { id: "gen_bezerril", name: "Rua General Bezerril", x: 1196 },
  { id: "floriano_peixoto", name: "Rua Floriano Peixoto", x: 1312 },
  { id: "major_facundo", name: "Rua Major Facundo", x: 1429 },
  { id: "barao_rio_branco", name: "Rua Barão do Rio Branco", x: 1545 },
  { id: "senador_pompeu", name: "Rua Senador Pompeu", x: 1661 },
  { id: "gen_sampaio", name: "Rua General Sampaio", x: 1777 },
  { id: "24_maio", name: "Rua 24 de Maio", x: 1894 },
  { id: "tristao_goncalves", name: "Rua Tristão Gonçalves", x: 2010 },
  { id: "imperador", name: "Av. do Imperador", x: 2126 },
  { id: "princesa_isabel", name: "Rua Princesa Isabel", x: 2242 },
];

export const CORRIDOR_TRANSVERSAIS_AZUL = [
  { id: "norte", name: "Corredor Norte (Setor Azul)", y: 360 },
  { id: "trans_sup_1", name: "Transversal Superior 1", y: 740 },
  { id: "esteira_sup", name: "Transversal Patamar / Esteira", y: 1190 },
  { id: "meio_1", name: "Transversal Central 1", y: 1748 },
  { id: "meio_2", name: "Transversal Central 2", y: 1980 },
  { id: "inf_1", name: "Transversal Meio Inferior", y: 2260 },
  { id: "inf_2", name: "Transversal Inferior", y: 2724 },
  { id: "sul", name: "Av. Alberto Nepomuceno (Ala Sul)", y: 3410 },
];

export const CORRIDOR_STREETS_AMARELO = [
  { id: "dom_manuel", name: "Av. Dom Manuel", x: 530 },
  { id: "25_marco", name: "Rua 25 de Março", x: 638 },
  { id: "coronel_ferraz", name: "Rua Coronel Ferraz", x: 804 },
  { id: "sao_jose", name: "Rua São José", x: 936 },
  { id: "gov_sampaio", name: "Rua Governador Sampaio", x: 1067 },
  { id: "conde_deu", name: "Rua Conde d'Eu", x: 1199 },
  { id: "gen_bezerril", name: "Rua General Bezerril", x: 1330 },
  { id: "floriano_peixoto", name: "Rua Floriano Peixoto", x: 1461 },
  { id: "major_facundo", name: "Rua Major Facundo", x: 1593 },
  { id: "barao_rio_branco", name: "Rua Barão do Rio Branco", x: 1724 },
  { id: "senador_pompeu", name: "Rua Senador Pompeu", x: 1856 },
  { id: "gen_sampaio", name: "Rua General Sampaio", x: 1986 },
  { id: "24_maio", name: "Rua 24 de Maio", x: 2118 },
  { id: "tristao_goncalves", name: "Rua Tristão Gonçalves", x: 2249 },
  { id: "imperador", name: "Av. do Imperador", x: 2380 },
  { id: "princesa_isabel", name: "Rua Princesa Isabel", x: 2480 },
];

export const CORRIDOR_TRANSVERSAIS_AMARELO = [
  { id: "norte", name: "Corredor Norte (Praça de Alimentação)", y: 360 },
  { id: "alimentacao_mesas", name: "Transversal Mesas / Alimentação", y: 620 },
  { id: "trans_sup", name: "Transversal Superior dos Corredores", y: 1120 },
  { id: "esteira_sup", name: "Transversal Patamar Superior", y: 1650 },
  { id: "esteira_centro", name: "Transversal Central (Esteira / Elevador)", y: 1940 },
  { id: "esteira_inf", name: "Transversal Patamar Inferior", y: 2150 },
  { id: "carapinima", name: "Av. Carapinima", y: 3040 },
  { id: "jose_avelino", name: "Rua José Avelino", y: 3295 },
  { id: "sul", name: "Av. Alberto Nepomuceno (Ala Sul)", y: 3510 },
];

export const SOUTH_AISLE = {
  y: 3036,
  streets: [
    "antonio_pompeu",
    "meton",
    "clarindo",
    "duque",
    "dom_pedro",
    "pedro_pereira",
    "liberato",
    "guilherme",
    "sao_paulo",
    "senador_alencar",
    "castro_silva",
    "senador_jaguaribe",
  ],
};

/**
 * Gera a lista padrão de pontos de localização dos corredores
 */
export function getDefaultLocationPoints(sector: SectorId = "verde"): LocationPoint[] {
  if (sector === "azul") {
    return [
      { id: "v_azul_entrada_sul", name: "Entrada Sul - Av. Alberto Nepomuceno", cx: 1429, cy: 3410, sectorId: "azul" },
      { id: "v_azul_centro", name: "Corredor Central - Floriano Peixoto", cx: 1312, cy: 1980, sectorId: "azul" },
      { id: "v_azul_esteira", name: "Acesso Esteira Rolante / Elevador", cx: 1196, cy: 1190, sectorId: "azul" },
      { id: "v_azul_norte", name: "Corredor Norte - Major Facundo", cx: 1429, cy: 360, sectorId: "azul" },
      { id: "v_azul_leste_estacionamento", name: "Acesso Estacionamento Leste", cx: 2242, cy: 2724, sectorId: "azul" },
    ];
  }

  if (sector === "amarelo") {
    return [
      { id: "v_amarelo_entrada_sul", name: "Entrada Sul - Av. Alberto Nepomuceno", cx: 1461, cy: 3510, sectorId: "amarelo" },
      { id: "v_amarelo_centro", name: "Corredor Central - Floriano Peixoto", cx: 1461, cy: 1940, sectorId: "amarelo" },
      { id: "v_amarelo_esteira", name: "Acesso Esteira Rolante / Elevador", cx: 1199, cy: 1940, sectorId: "amarelo" },
      { id: "v_amarelo_alimentacao", name: "Praça de Alimentação", cx: 1461, cy: 360, sectorId: "amarelo" },
      { id: "v_amarelo_carapinima", name: "Av. Carapinima - Acesso Sul", cx: 1461, cy: 3040, sectorId: "amarelo" },
      { id: "v_amarelo_leste", name: "Acesso Leste - Rua Princesa Isabel", cx: 2480, cy: 3040, sectorId: "amarelo" },
    ];
  }

  const points: LocationPoint[] = [];

  const mainTransversais = ["norte", "meio_sup", "centro", "meio_inf"];
  CORRIDOR_STREETS.forEach((s) => {
    CORRIDOR_TRANSVERSAIS.filter((t) => mainTransversais.includes(t.id)).forEach((t) => {
      points.push({
        id: `v_${s.id}_${t.id}`,
        name: `${s.name} - ${t.name}`,
        cx: s.x,
        cy: t.y,
        sectorId: "verde",
      });
    });
  });

  SOUTH_AISLE.streets.forEach((sId) => {
    const street = CORRIDOR_STREETS.find((s) => s.id === sId);
    if (street) {
      points.push({
        id: `v_${sId}_sul`,
        name: `${street.name} - Ala Sul`,
        cx: street.x,
        cy: SOUTH_AISLE.y,
        sectorId: "verde",
      });
    }
  });

  return points;
}

/**
 * Gera as retas padrão dos corredores do Setor especificado
 */
export function getDefaultCorridorLines(sector: SectorId = "verde"): CorridorLine[] {
  if (sector === "azul") {
    const lines: CorridorLine[] = [];
    CORRIDOR_STREETS_AZUL.forEach((s) => {
      lines.push({
        id: `line_azul_street_${s.id}`,
        name: s.name,
        x1: s.x,
        y1: 360,
        x2: s.x,
        y2: 3410,
        sectorId: "azul",
      });
    });

    CORRIDOR_TRANSVERSAIS_AZUL.forEach((t) => {
      lines.push({
        id: `line_azul_trans_${t.id}`,
        name: t.name,
        x1: 520,
        y1: t.y,
        x2: 2242,
        y2: t.y,
        sectorId: "azul",
      });
    });

    lines.push({
      id: "line_azul_acesso_estacionamento",
      name: "Acesso Estacionamento Leste",
      x1: 2242,
      y1: 2724,
      x2: 2442,
      y2: 2724,
      sectorId: "azul",
    });

    lines.push({
      id: "line_azul_corredor_leste",
      name: "Corredor Leste (Estacionamento)",
      x1: 2442,
      y1: 1000,
      x2: 2442,
      y2: 3290,
      sectorId: "azul",
    });

    return lines;
  }

  if (sector === "amarelo") {
    const lines: CorridorLine[] = [];
    CORRIDOR_STREETS_AMARELO.forEach((s) => {
      lines.push({
        id: `line_amarelo_street_${s.id}`,
        name: s.name,
        x1: s.x,
        y1: 360,
        x2: s.x,
        y2: 3510,
        sectorId: "amarelo",
      });
    });

    CORRIDOR_TRANSVERSAIS_AMARELO.forEach((t) => {
      lines.push({
        id: `line_amarelo_trans_${t.id}`,
        name: t.name,
        x1: 530,
        y1: t.y,
        x2: 2480,
        y2: t.y,
        sectorId: "amarelo",
      });
    });

    // Acesso Leste (Estacionamento / Sanitários)
    lines.push({
      id: "line_amarelo_acesso_leste",
      name: "Acesso Leste (Estacionamento)",
      x1: 2480,
      y1: 3040,
      x2: 2580,
      y2: 3040,
      sectorId: "amarelo",
    });

    return lines;
  }

  const lines: CorridorLine[] = [];

  // 12 Ruas Verticais (do Norte y=358 ao Sul y=3036)
  CORRIDOR_STREETS.forEach((s) => {
    lines.push({
      id: `line_street_${s.id}`,
      name: s.name,
      x1: s.x,
      y1: 358,
      x2: s.x,
      y2: 3036,
      sectorId: "verde",
    });
  });

  // 7 Transversais Horizontais (da Rua Antônio Pompeu x=432 até Av. Castelo Branco x=2106)
  CORRIDOR_TRANSVERSAIS.forEach((t) => {
    lines.push({
      id: `line_trans_${t.id}`,
      name: t.name,
      x1: 432,
      y1: t.y,
      x2: 2106,
      y2: t.y,
      sectorId: "verde",
    });
  });

  // Acesso Leste (Corredor dos Banheiros / Elevador Leste / Entrada Leste)
  lines.push({
    id: "line_acesso_leste_entrada",
    name: "Acesso Leste (Elevador / Sanitários)",
    x1: 2106,
    y1: 2042,
    x2: 2385,
    y2: 2042,
    sectorId: "verde",
  });
  lines.push({
    id: "line_corredor_sanitarios_leste",
    name: "Corredor Interno Sanitários Leste",
    x1: 2385,
    y1: 1850,
    x2: 2385,
    y2: 2550,
    sectorId: "verde",
  });

  return lines;
}

/**
 * Projeta um ponto (px, py) ortogonalmente sobre um segmento de reta (x1, y1)-(x2, y2)
 */
function projectPointOnSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { x: number; y: number; dist: number; t: number } {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    const dist = Math.hypot(px - x1, py - y1);
    return { x: x1, y: y1, dist, t: 0 };
  }
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const projX = Math.round(x1 + t * dx);
  const projY = Math.round(y1 + t * dy);
  const dist = Math.hypot(px - projX, py - projY);
  return { x: projX, y: projY, dist, t };
}

/**
 * Calcula a interseção entre dois segmentos de reta (se se cruzarem ou tocarem com tolerância)
 */
function getSegmentIntersection(
  a: CorridorLine,
  b: CorridorLine,
  tolerance = 14
): { x: number; y: number } | null {
  const x1 = a.x1,
    y1 = a.y1,
    x2 = a.x2,
    y2 = a.y2;
  const x3 = b.x1,
    y3 = b.y1,
    x4 = b.x2,
    y4 = b.y2;

  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denom) > 1e-5) {
    const ix =
      ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
      denom;
    const iy =
      ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
      denom;

    const minAx = Math.min(x1, x2) - tolerance;
    const maxAx = Math.max(x1, x2) + tolerance;
    const minAy = Math.min(y1, y2) - tolerance;
    const maxAy = Math.max(y1, y2) + tolerance;

    const minBx = Math.min(x3, x4) - tolerance;
    const maxBx = Math.max(x3, x4) + tolerance;
    const minBy = Math.min(y3, y4) - tolerance;
    const maxBy = Math.max(y3, y4) + tolerance;

    if (
      ix >= minAx &&
      ix <= maxAx &&
      iy >= minAy &&
      iy <= maxAy &&
      ix >= minBx &&
      ix <= maxBx &&
      iy >= minBy &&
      iy <= maxBy
    ) {
      return { x: Math.round(ix), y: Math.round(iy) };
    }
  }

  // Verifica se uma ponta de A está quase encostando no segmento B (junção em T ou continuação)
  const endpointsA = [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];
  for (const pt of endpointsA) {
    const proj = projectPointOnSegment(pt.x, pt.y, x3, y3, x4, y4);
    if (proj.dist <= tolerance) {
      return { x: proj.x, y: proj.y };
    }
  }

  const endpointsB = [
    { x: x3, y: y3 },
    { x: x4, y: y4 },
  ];
  for (const pt of endpointsB) {
    const proj = projectPointOnSegment(pt.x, pt.y, x1, y1, x2, y2);
    if (proj.dist <= tolerance) {
      return { x: proj.x, y: proj.y };
    }
  }

  return null;
}

export function findNearestEntrance(
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  corridorLines?: CorridorLine[]
) {
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;
  const lines =
    corridorLines && corridorLines.length > 0
      ? corridorLines
      : getDefaultCorridorLines();

  let bestX = Math.round(centerX);
  let bestY = Math.round(centerY);
  let minDist = Infinity;

  for (const line of lines) {
    const proj = projectPointOnSegment(
      centerX,
      centerY,
      line.x1,
      line.y1,
      line.x2,
      line.y2
    );
    if (proj.dist < minDist) {
      minDist = proj.dist;
      bestX = proj.x;
      bestY = proj.y;
    }
  }

  return {
    entranceX: bestX,
    entranceY: bestY,
  };
}

export function generateGraphData(
  stores: ObjectItem[],
  customPoints?: LocationPoint[],
  customCorridorLines?: CorridorLine[]
): GraphData {
  const locationPoints =
    customPoints !== undefined ? customPoints : getDefaultLocationPoints();
  const corridorLines =
    customCorridorLines !== undefined
      ? customCorridorLines
      : getDefaultCorridorLines();

  const vertices: VertexData[] = [];
  const edges: EdgeData[] = [];
  let edgeIdCounter = 1;
  let nodeCounter = 1;

  function addEdge(from: string, to: string) {
    if (from === to) return;
    const exists = edges.some(
      (e) =>
        (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );
    if (!exists) {
      edges.push({ id: `e${edgeIdCounter++}`, from, to });
    }
  }

  // Mapa de vértices existentes na malha de corredores para fundir apenas vértices de corredor muito próximos (<= 8px)
  // IMPORTANTE: nunca fundir com vértices de Pontos de Localização (que não começam com "v_cor_")!
  function getOrCreateCorridorVertex(
    cx: number,
    cy: number,
    preferredId?: string
  ): VertexData {
    const rx = Math.round(cx);
    const ry = Math.round(cy);
    if (!preferredId) {
      const existing = vertices.find(
        (v) =>
          v.objectName === null &&
          v.id.startsWith("v_cor_") &&
          Math.hypot(v.cx - rx, v.cy - ry) <= 8
      );
      if (existing) return existing;
    }
    const id = preferredId || `v_cor_${nodeCounter++}`;
    const v: VertexData = { id, objectName: null, cx: rx, cy: ry };
    vertices.push(v);
    return v;
  }

  // Lista de vértices pertencentes a cada reta de corredor (para ordenar e conectar em série)
  const lineNodesMap = new globalThis.Map<string, Set<string>>();
  corridorLines.forEach((line) => {
    lineNodesMap.set(line.id, new Set<string>());
    const vStart = getOrCreateCorridorVertex(line.x1, line.y1);
    const vEnd = getOrCreateCorridorVertex(line.x2, line.y2);
    lineNodesMap.get(line.id)!.add(vStart.id);
    lineNodesMap.get(line.id)!.add(vEnd.id);
  });

  // 1. Calcula todas as interseções entre quaisquer duas retas de corredor e adiciona o nó em ambas as retas
  for (let i = 0; i < corridorLines.length; i++) {
    for (let j = i + 1; j < corridorLines.length; j++) {
      const inter = getSegmentIntersection(corridorLines[i], corridorLines[j], 14);
      if (inter) {
        const vInter = getOrCreateCorridorVertex(inter.x, inter.y);
        lineNodesMap.get(corridorLines[i].id)!.add(vInter.id);
        lineNodesMap.get(corridorLines[j].id)!.add(vInter.id);
      }
    }
  }

  // Função auxiliar que conecta qualquer ponto (px, py) à reta de corredor mais próxima
  function attachPointToNearestCorridor(ptId: string, px: number, py: number) {
    if (corridorLines.length === 0) return;

    let bestLine = corridorLines[0];
    let bestProj = projectPointOnSegment(
      px,
      py,
      bestLine.x1,
      bestLine.y1,
      bestLine.x2,
      bestLine.y2
    );

    for (let i = 1; i < corridorLines.length; i++) {
      const line = corridorLines[i];
      const proj = projectPointOnSegment(
        px,
        py,
        line.x1,
        line.y1,
        line.x2,
        line.y2
      );
      if (proj.dist < bestProj.dist) {
        bestProj = proj;
        bestLine = line;
      }
    }

    const vProj = getOrCreateCorridorVertex(bestProj.x, bestProj.y);
    lineNodesMap.get(bestLine.id)!.add(vProj.id);
    addEdge(ptId, vProj.id);
  }

  // 2. Adiciona todos os Pontos de Localização ("Você está aqui") e conecta-os APENAS ao ponto mais próximo da malha de retas
  // (Não insere o ponto na lista de lineNodesMap para que um ponto fora de trecho NUNCA crie uma ponte fantasma sobre um trecho removido!)
  locationPoints.forEach((pt) => {
    const vPt: VertexData = {
      id: pt.id,
      objectName: null,
      cx: Math.round(pt.cx),
      cy: Math.round(pt.cy),
    };
    vertices.push(vPt);
  });

  // 3. Adiciona todas as Lojas/Locais demarcados e projeta a melhor borda do retângulo na malha de retas
  // (Isso evita uma linha comprida atravessando desde o meio de objetos largos como a Esteira Rolante ou grandes lojas!)
  stores.forEach((store) => {
    if (store.x === undefined || store.y === undefined) return;
    const vStoreId = `v_store_${store.id}`;
    const w = store.width ?? 75;
    const h = store.height ?? 70;
    const storeCenterX = Math.round(store.x + w / 2);
    const storeCenterY = Math.round(store.y + h / 2);

    // Pontos candidatos na borda e centro da demarcação da loja/esteira
    const candidatePoints = [
      { x: storeCenterX, y: storeCenterY }, // centro
      { x: Math.round(store.x), y: storeCenterY }, // borda esquerda
      { x: Math.round(store.x + w), y: storeCenterY }, // borda direita
      { x: storeCenterX, y: Math.round(store.y) }, // borda superior
      { x: storeCenterX, y: Math.round(store.y + h) }, // borda inferior
    ];

    let bestAnchor = candidatePoints[0];
    let bestLine = corridorLines[0];
    let bestProj = corridorLines.length > 0
      ? projectPointOnSegment(
          bestAnchor.x,
          bestAnchor.y,
          corridorLines[0].x1,
          corridorLines[0].y1,
          corridorLines[0].x2,
          corridorLines[0].y2
        )
      : { x: bestAnchor.x, y: bestAnchor.y, dist: 0, t: 0 };

    if (corridorLines.length > 0) {
      for (const cand of candidatePoints) {
        for (const line of corridorLines) {
          const proj = projectPointOnSegment(
            cand.x,
            cand.y,
            line.x1,
            line.y1,
            line.x2,
            line.y2
          );
          if (proj.dist < bestProj.dist) {
            bestProj = proj;
            bestLine = line;
            bestAnchor = cand;
          }
        }
      }
    }

    // Coloca o vértice de chegada do local no ponto da borda mais próximo do corredor (ou se a reta já toca o local, na própria reta!)
    const targetX = bestProj.dist <= 35 ? bestProj.x : bestAnchor.x;
    const targetY = bestProj.dist <= 35 ? bestProj.y : bestAnchor.y;

    vertices.push({
      id: vStoreId,
      objectName: store.name,
      cx: targetX,
      cy: targetY,
    });

    if (corridorLines.length > 0) {
      const vProj = getOrCreateCorridorVertex(bestProj.x, bestProj.y);
      lineNodesMap.get(bestLine.id)!.add(vProj.id);
      addEdge(vStoreId, vProj.id);
    }
  });

  // Conecta cada Ponto de Localização à reta de corredor mais próxima
  locationPoints.forEach((pt) => {
    attachPointToNearestCorridor(pt.id, Math.round(pt.cx), Math.round(pt.cy));
  });

  // 4. Para cada reta de corredor, ordena todos os vértices que caem sobre ela de (x1, y1) até (x2, y2) e liga em série!
  corridorLines.forEach((line) => {
    const nodeIds = Array.from(lineNodesMap.get(line.id) || []);
    const nodeVertices = nodeIds
      .map((id) => vertices.find((v) => v.id === id))
      .filter((v): v is VertexData => Boolean(v));

    nodeVertices.sort((a, b) => {
      const da = Math.hypot(a.cx - line.x1, a.cy - line.y1);
      const db = Math.hypot(b.cx - line.x1, b.cy - line.y1);
      return da - db;
    });

    for (let i = 0; i < nodeVertices.length - 1; i++) {
      addEdge(nodeVertices[i].id, nodeVertices[i + 1].id);
    }
  });

  return { vertices, edges };
}
