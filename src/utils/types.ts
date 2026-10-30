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
    label: "Entrada / Saída / Acesso",
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
}

export interface CorridorLine {
  id: string;
  name: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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
  importMapData: (data: {
    objects?: ObjectItem[];
    locationPoints?: LocationPoint[];
    corridorLines?: CorridorLine[];
  }) => void;
}
