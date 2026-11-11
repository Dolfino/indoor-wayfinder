import logo from "../assets/img/pathpal-logo.svg";
import { FiChevronRight, FiPlus, FiSettings, FiArrowRight } from "react-icons/fi";
import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
  STORE_TYPE_META,
  StoreType,
  SECTORS,
  SECTOR_META_MAP,
  SectorId,
} from "@/utils/types";
import { MapDataContext, NavigationContext } from "../pages/Map";
import { FaMapMarkerAlt } from "react-icons/fa";

interface ParsedObjects {
  [key: string]: {
    len: number;
    results: ObjectItem[];
  };
}

function Sidebar() {
  const { setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const {
    activeSector,
    setActiveSector,
    allObjects,
    objects,
    setIsConfigModalOpen,
    navigateToStoreAcrossSectors,
    isAdmin,
    setIsAdmin,
  } = useContext(MapDataContext) as MapDataContextType;
  const [parsedObjects, setParsedObjects] = useState<ParsedObjects>({});
  const [isRotating, setIsRotating] = useState(false);
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const clickTimeoutRef = useRef<number | null>(null);

  function handleLogoClick() {
    setIsRotating(true);
    const next = logoClicks + 1;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    if (next >= 5) {
      setLogoClicks(0);
      setIsAdmin((prev) => {
        const updated = !prev;
        try {
          if (updated) {
            localStorage.setItem("centro-fashion:admin", "true");
            toast.success("Modo Administrador ATIVADO!");
          } else {
            localStorage.removeItem("centro-fashion:admin");
            toast.info("Modo Administrador DESATIVADO (Visão Visitante)");
          }
        } catch {
          /* ignore */
        }
        return updated;
      });
    } else {
      setLogoClicks(next);
      clickTimeoutRef.current = window.setTimeout(() => setLogoClicks(0), 2000);
    }
  }

  const displayedList = showAllSectors ? allObjects : objects;
  const currentSectorMeta = SECTOR_META_MAP[activeSector];

  useEffect(() => {
    const groupedObjects = () => {
      const data: ParsedObjects = {};
      displayedList.forEach((object) => {
        const firstLetter = object.name.charAt(0).toUpperCase();
        if (!data[firstLetter]) {
          data[firstLetter] = {
            len: 0,
            results: [],
          };
        }
        data[firstLetter].results.push(object);
        data[firstLetter].len += 1;
      });
      setParsedObjects(data);
    };
    groupedObjects();
  }, [displayedList]);

  function handleObjectNavigation(selectedObject: ObjectItem) {
    setIsEditMode(false);
    navigateToStoreAcrossSectors(selectedObject);
  }

  return (
    <aside className="flex flex-col rounded-none w-[35rem] h-screen p-3 bg-white shadow-xl shadow-gray-200 -translate-x-full transform transition-transform duration-150 ease-in lg:translate-x-0 lg:shadow-md z-20">
      <header className="flex flex-col mb-3 pr-1 border-b pb-3 w-full">
        <div
          className={`flex items-center justify-between p-2 mb-2.5 border rounded-lg text-xs font-semibold ${currentSectorMeta.headerBgClass}`}
        >
          <div className="flex items-center">
            <FaMapMarkerAlt className="w-4 h-4 mr-2 flex-none" />
            <span>Centro Fashion Fortaleza • {currentSectorMeta.name}</span>
          </div>
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/80">
            5 Setores
          </span>
        </div>

        <div className="flex items-center flex-none mb-3">
          <div className="rounded-md w-14 h-14 p-3 bg-emerald-50 center flex-none">
            <img
              src={logo}
              alt="Centro Fashion"
              className={`cursor-pointer ${isRotating ? "rotate" : ""}`}
              onClick={handleLogoClick}
              onAnimationEnd={() => setIsRotating(false)}
              title={isAdmin ? "Modo Administrador Ativo (5 cliques para alternar)" : "Centro Fashion Fortaleza"}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-bold text-gray-900 pl-3">
              Centro Fashion
            </p>
            <p className="text-xs font-semibold text-gray-600 pl-3">
              {currentSectorMeta.name} • Wayfinding Multi-Setor
            </p>
          </div>
        </div>

        {/* Seletor Rápido dos 5 Setores */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 px-0.5">
            <span>SELECIONE O SETOR DO MAPA:</span>
            <button
              type="button"
              onClick={() => setShowAllSectors((prev) => !prev)}
              className={`text-[11px] font-semibold px-2 py-0.5 rounded transition-colors ${
                showAllSectors
                  ? "bg-blue-100 text-blue-800"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
            >
              {showAllSectors
                ? `Mostrando Todos (${allObjects.length})`
                : `Ver Locais de Todos os Setores`}
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {SECTORS.map((sec) => {
              const isActive = sec.id === activeSector;
              const count = allObjects.filter(
                (o) => (o.sectorId || "verde") === sec.id
              ).length;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSector(sec.id)}
                  className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg border text-[11px] font-bold transition-all ${
                    isActive
                      ? sec.activeBtnClass
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                  title={`Mudar mapa para ${sec.name}`}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full flex-none"
                      style={{
                        backgroundColor: isActive ? "#ffffff" : sec.dotColor,
                      }}
                    />
                    <span className="truncate">{sec.shortName}</span>
                  </div>
                  <span
                    className={`text-[9px] font-medium ${
                      isActive ? "text-white/90" : "text-gray-400"
                    }`}
                  >
                    {count} {count === 1 ? "local" : "locais"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="overflow-auto h-full pr-1">
        {displayedList.length === 0 ? (
          isAdmin ? (
            <div className="flex flex-col items-center justify-center text-center p-6 mt-8 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-emerald-100 center text-emerald-700 text-xl mb-3">
                <FiPlus />
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">
                {currentSectorMeta.name} Limpo & Pronto
              </h3>
              <p className="text-xs text-gray-500 mb-4 max-w-[240px]">
                Nenhum local cadastrado no {currentSectorMeta.name} ainda. Clique abaixo ou na engrenagem no topo para demarcar lojas, acessos e corredores!
              </p>
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                <FiSettings className="text-sm" />
                <span>Configurar {currentSectorMeta.name}</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 mt-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-50 center text-blue-600 text-xl mb-3">
                📍
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">
                Mapa do {currentSectorMeta.name}
              </h3>
              <p className="text-xs text-gray-500 max-w-[240px]">
                Utilize a barra de busca acima para localizar boxes, praça de alimentação e serviços em todo o shopping!
              </p>
            </div>
          )
        ) : (
          Object.keys(parsedObjects)
            .sort()
            .map((letter, index) => (
              <div key={index} className="mb-4">
                <header className="p-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {letter}
                    <span className="ml-2 text-xs font-semibold text-gray-500">
                      - {parsedObjects[letter].len}{" "}
                      {parsedObjects[letter].len === 1 ? "Local" : "Locais"}
                    </span>
                  </h2>
                </header>
                <div className="flex flex-col gap-1">
                  {parsedObjects[letter].results.map((item) => {
                    const stType = (item.type || "loja") as StoreType;
                    const meta = STORE_TYPE_META[stType] || STORE_TYPE_META.loja;
                    const itemSectorId = (item.sectorId || "verde") as SectorId;
                    const itemSectorMeta = SECTOR_META_MAP[itemSectorId];
                    const isOtherSector = itemSectorId !== activeSector;
                    const portalTargetMeta = item.portalToSectorId
                      ? SECTOR_META_MAP[item.portalToSectorId]
                      : null;

                    return (
                      <div
                        key={item.id?.toString()}
                        data-product={item.name}
                        className="flex items-center justify-between bg-[#f8fafc] hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 m-1 px-4 py-2.5 shadow-sm rounded-lg cursor-pointer transition-colors"
                        onClick={() => handleObjectNavigation(item)}
                      >
                        <div className="m-1 pr-2">
                          <div className="flex items-center flex-wrap gap-1.5">
                            <p className="text-sm font-bold text-gray-900">
                              {meta.isAccessOrService ? `${meta.icon} ` : ""}
                              {item.name}
                            </p>
                            {(showAllSectors || isOtherSector) && (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${itemSectorMeta.badgeClass}`}
                              >
                                {itemSectorMeta.name}
                              </span>
                            )}
                            {meta.isAccessOrService && (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${meta.badgeClass}`}
                              >
                                {meta.label}
                              </span>
                            )}
                            {portalTargetMeta && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300">
                                <FiArrowRight className="w-2.5 h-2.5" />
                                Acesso p/ {portalTargetMeta.shortName}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        <div className="center flex-none ml-auto text-xl text-emerald-400">
                          <FiChevronRight />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
