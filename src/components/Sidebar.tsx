import logo from "../assets/img/pathpal-logo.svg";
import { FiChevronRight, FiPlus, FiSettings } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
  STORE_TYPE_META,
  StoreType,
} from "@/utils/types";
import { MapDataContext, NavigationContext } from "../pages/Map";
import { navigateToObject } from "@/utils/navigationHelper";
import { FaMapMarkerAlt } from "react-icons/fa";

interface ParsedObjects {
  [key: string]: {
    len: number;
    results: ObjectItem[];
  };
}

function Sidebar() {
  const { navigation, setNavigation, setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { objects, setIsConfigModalOpen } = useContext(
    MapDataContext
  ) as MapDataContextType;
  const [parsedObjects, setParsedObjects] = useState<ParsedObjects>({});
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const groupedObjects = () => {
      const data: ParsedObjects = {};
      objects.forEach((object) => {
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
  }, [objects]);

  function handleObjectNavigation(selectedObjectName: string) {
    const object = objects.find((obj) => obj.name === selectedObjectName);
    setIsEditMode(false);
    if (!object) return;
    navigateToObject(object.name, navigation, setNavigation);
  }

  return (
    <aside className="flex flex-col rounded-none w-[35rem] h-screen p-3 bg-white shadow-xl shadow-gray-200 -translate-x-full transform transition-transform duration-150 ease-in lg:translate-x-0 lg:shadow-md z-20">
      <header className="flex flex-col mb-4 pr-1 border-b py-2 w-full">
        <div className="flex items-center p-2 mb-3 text-emerald-800 border border-emerald-300 rounded-lg bg-emerald-50 text-xs font-semibold">
          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-emerald-600 flex-none" />
          <span>Centro Fashion Fortaleza • Setor Verde</span>
        </div>
        <div className="flex items-center flex-none mr-10">
          <div className="rounded-md w-16 h-16 p-4 bg-emerald-50 center flex-none">
            <img
              src={logo}
              alt="Centro Fashion"
              className={`cursor-pointer ${isRotating ? "rotate" : ""}`}
              onClick={() => setIsRotating(true)}
              onAnimationEnd={() => setIsRotating(false)}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-gray-900 pl-3">
              Centro Fashion
            </p>
            <p className="text-sm font-semibold text-emerald-600 pl-3">
              Setor Verde • Wayfinding
            </p>
          </div>
        </div>
      </header>
      <div className="overflow-auto h-full pr-1">
        {objects.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6 mt-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 center text-emerald-700 text-xl mb-3">
              <FiPlus />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">
              Mapa Limpo & Pronto
            </h3>
            <p className="text-xs text-gray-500 mb-4 max-w-[240px]">
              Nenhum local cadastrado ainda. Clique abaixo ou na engrenagem no topo para começar a demarcar lojas e boxes na planta!
            </p>
            <button
              type="button"
              onClick={() => setIsConfigModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
            >
              <FiSettings className="text-sm" />
              <span>Abrir Configurações & Adicionar</span>
            </button>
          </div>
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
                    return (
                      <div
                        key={item.id?.toString()}
                        data-product={item.name}
                        className="flex items-center justify-between bg-[#f8fafc] hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 m-1 px-4 py-2.5 shadow-sm rounded-lg cursor-pointer transition-colors"
                        onClick={() => handleObjectNavigation(item.name)}
                      >
                        <div className="m-1 pr-2">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-bold text-gray-900">
                              {meta.isAccessOrService ? `${meta.icon} ` : ""}
                              {item.name}
                            </p>
                            {meta.isAccessOrService && (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${meta.badgeClass}`}
                              >
                                {meta.label}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">
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
