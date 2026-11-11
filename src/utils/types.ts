export type SectorId = "verde" | "azul" | "amarelo" | "roxo" | "branco";

export interface SectorMeta {
  id: SectorId;
  name: string;
  shortName: string;
  dotColor: string;
  badgeClass: string;
  activeBtnClass: string;
  headerBgClass: string;
}

export const SECTORS: SectorMeta[] = [
  {
    id: "verde",
    name: "Setor Verde",
    shortName: "Verde",
    dotColor: "#16a34a",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    activeBtnClass: "bg-emerald-600 text-white border-emerald-700 shadow-sm",
    headerBgClass: "bg-emerald-50 text-emerald-800 border-emerald-300",
  },
  {
    id: "azul",
    name: "Setor Azul",
    shortName: "Azul",
    dotColor: "#2563eb",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    activeBtnClass: "bg-blue-600 text-white border-blue-700 shadow-sm",
    headerBgClass: "bg-blue-50 text-blue-800 border-blue-300",
  },
  {
    id: "amarelo",
    name: "Setor Amarelo",
    shortName: "Amarelo",
    dotColor: "#eab308",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    activeBtnClass: "bg-amber-500 text-white border-amber-600 shadow-sm",
    headerBgClass: "bg-amber-50 text-amber-800 border-amber-300",
  },
  {
    id: "roxo",
    name: "Setor Roxo/Lilás",
    shortName: "Roxo/Lilás",
    dotColor: "#9333ea",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-300",
    activeBtnClass: "bg-purple-600 text-white border-purple-700 shadow-sm",
    headerBgClass: "bg-purple-50 text-purple-800 border-purple-300",
  },
  {
    id: "branco",
    name: "Setor Branco/Cinza",
    shortName: "Branco/Cinza",
    dotColor: "#64748b",
    badgeClass: "bg-slate-100 text-slate-800 border-slate-300",
    activeBtnClass: "bg-slate-700 text-white border-slate-800 shadow-sm",
    headerBgClass: "bg-slate-100 text-slate-800 border-slate-300",
  },
];

export const SECTOR_META_MAP: Record<SectorId, SectorMeta> = SECTORS.reduce(
  (acc, s) => {
    acc[s.id] = s;
    return acc;
  },
  {} as Record<SectorId, SectorMeta>
);

export type StoreType =
  | "loja"
  | "box"
  | "quiosque"
  | "elevador"
  | "escada_rolante"
  | "esteira_rolante"
  | "escada"
  | "banheiro"
  | "entrada_saida"
  | "servico";

export const STORE_TYPE_META: Record<
  StoreType,
  { label: string; icon: string; badgeClass: string; isAccessOrService?: boolean }
> = {
  loja: {
    label: "Loja",
    icon: "🏬",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  box: {
    label: "Box Comercial",
    icon: "🛍️",
    badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
  },
  quiosque: {
    label: "Quiosque / Alimentação",
    icon: "🍔",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
  },
  elevador: {
    label: "Elevador",
    icon: "🛗",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-300",
    isAccessOrService: true,
  },
  escada_rolante: {
    label: "Escada Rolante",
    icon: "🎢",
    badgeClass: "bg-indigo-100 text-indigo-800 border-indigo-300",
    isAccessOrService: true,
  },
  esteira_rolante: {
    label: "Esteira Rolante",
    icon: "🛤️",
    badgeClass: "bg-cyan-100 text-cyan-800 border-cyan-300",
    isAccessOrService: true,
  },
  escada: {
    label: "Escada Fixa",
    icon: "🪜",
    badgeClass: "bg-slate-100 text-slate-800 border-slate-300",
    isAccessOrService: true,
  },
  banheiro: {
    label: "Banheiro / Sanitário",
    icon: "🚻",
    badgeClass: "bg-sky-100 text-sky-800 border-sky-300",
    isAccessOrService: true,
  },
  entrada_saida: {
    label: "Entrada / Saída / Passagem",
    icon: "🚪",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
    isAccessOrService: true,
  },
  servico: {
    label: "Outros Serviços (Caixa, SAC, etc.)",
    icon: "ℹ️",
    badgeClass: "bg-violet-100 text-violet-800 border-violet-300",
    isAccessOrService: true,
  },
};

export interface ObjectItem {
  id: string;
  name: string;
  desc: string;
  categoryId: string;
  categoryName?: string;
  type?: StoreType;
  sectorId?: SectorId;
  /** Se este local/acesso é um portal de passagem para outro setor */
  portalToSectorId?: SectorId;
  /** ID opcional do portal/ponto correspondente no setor de destino */
  portalTargetObjectId?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  entranceX?: number;
  entranceY?: number;
}

export interface LocationPoint {
  id: string;
  name: string;
  cx: number;
  cy: number;
  sectorId?: SectorId;
}

export interface CorridorLine {
  id: string;
  name: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sectorId?: SectorId;
}

export interface CrossSectorTransition {
  portalObject: ObjectItem;
  targetSectorId: SectorId;
  finalDestinationObject: ObjectItem;
}

export interface Category {
  id: string;
  name: string;
}

export interface Beacon {
  _id: string;
  beacon_id: string;
  rssi: number;
}

export interface Navigation {
  start: string;
  end?: string;
}

export interface NavigationContextType {
  navigation: Navigation;
  setNavigation: React.Dispatch<React.SetStateAction<Navigation>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DemarcationDraft {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MapDataContextType {
  // Setor Ativo & Lista Completa (Multi-setor)
  activeSector: SectorId;
  setActiveSector: (sector: SectorId) => void;
  allObjects: ObjectItem[];
  allLocationPoints: LocationPoint[];
  allCorridorLines: CorridorLine[];

  // Transição entre setores (Rota Multi-Setor)
  pendingCrossSectorRoute: CrossSectorTransition | null;
  setPendingCrossSectorRoute: React.Dispatch<
    React.SetStateAction<CrossSectorTransition | null>
  >;
  navigateToStoreAcrossSectors: (targetStore: ObjectItem) => void;
  continueCrossSectorRoute: () => void;

  // Dados filtrados do setor ativo
  objects: ObjectItem[];
  categories: Category[];
  addStore: (store: Omit<ObjectItem, "id"> & { id?: string }) => void;
  updateStore: (store: ObjectItem) => void;
  deleteStore: (storeId: string) => void;
  resetDefaultStores: () => void;
  isDemarcating: boolean;
  setIsDemarcating: React.Dispatch<React.SetStateAction<boolean>>;
  demarcationDraft: DemarcationDraft | null;
  setDemarcationDraft: React.Dispatch<React.SetStateAction<DemarcationDraft | null>>;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingStore: ObjectItem | null;
  setEditingStore: React.Dispatch<React.SetStateAction<ObjectItem | null>>;

  // CRUD de Pontos de Localização ("Você está aqui" / Posições do Corredor)
  locationPoints: LocationPoint[];
  addLocationPoint: (point: Omit<LocationPoint, "id"> & { id?: string }) => void;
  updateLocationPoint: (point: LocationPoint) => void;
  deleteLocationPoint: (pointId: string) => void;
  clearAllLocationPoints: () => void;
  resetDefaultLocationPoints: () => void;
  isAddingPoint: boolean;
  setIsAddingPoint: React.Dispatch<React.SetStateAction<boolean>>;
  editingLocationPoint: LocationPoint | null;
  setEditingLocationPoint: React.Dispatch<React.SetStateAction<LocationPoint | null>>;

  // CRUD de Retas de Corredores (Malha de Roteamento desenhável)
  corridorLines: CorridorLine[];
  addCorridorLine: (line: Omit<CorridorLine, "id"> & { id?: string }) => void;
  updateCorridorLine: (line: CorridorLine) => void;
  deleteCorridorLine: (lineId: string) => void;
  deleteCorridorSubsegment: (x1: number, y1: number, x2: number, y2: number) => void;
  clearAllCorridorLines: () => void;
  resetDefaultCorridorLines: () => void;
  isDrawingCorridor: boolean;
  setIsDrawingCorridor: React.Dispatch<React.SetStateAction<boolean>>;
  showCorridorLines: boolean;
  setShowCorridorLines: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  importMapData: (data: {
    objects?: ObjectItem[];
    locationPoints?: LocationPoint[];
    corridorLines?: CorridorLine[];
  }) => void;
}
