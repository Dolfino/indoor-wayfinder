import { NavigationContext, MapDataContext } from "@/pages/Map";
import {
  NavigationContextType,
  MapDataContextType,
  SECTORS,
  SectorId,
} from "@/utils/types";
import { useContext } from "react";
import { isDesktop } from "react-device-detect";
import EditPositionButton from "./EditPositionButton";
import DesktopRouteDetails from "./DesktopRouteDetails";
import SearchBar from "./SearchBar";
import { FiSettings, FiGitCommit } from "react-icons/fi";
import Tooltip from "./ui/Tooltip";

function Toolbar() {
  const { navigation, setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const {
    activeSector,
    setActiveSector,
    setIsConfigModalOpen,
    isDrawingCorridor,
    setIsDrawingCorridor,
    setIsDemarcating,
    setIsAddingPoint,
    isAdmin,
  } = useContext(MapDataContext) as MapDataContextType;

  return (
    <div className="flex flex-none flex-wrap gap-2 mb-3 relative z-20 items-center">
      <SearchBar />

      {/* Seletor rápido de Setor (útil em mobile e desktop) */}
      <Tooltip content="Alternar Setor do Mapa" className="bg-slate-800">
        <select
          value={activeSector}
          onChange={(e) => setActiveSector(e.target.value as SectorId)}
          aria-label="Selecionar setor do mapa"
          className="h-12 px-2.5 rounded bg-white border border-gray-200 text-xs font-bold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-none"
        >
          {SECTORS.map((sec) => (
            <option key={sec.id} value={sec.id}>
              📍 {sec.name}
            </option>
          ))}
        </select>
      </Tooltip>

      <EditPositionButton />

      {isAdmin && (
        <>
          <Tooltip
            content="Desenhar Retas dos Corredores (Malha de Rotas)"
            className="bg-orange-600"
          >
            <button
              type="button"
              onClick={() => {
                setIsEditMode(false);
                setIsDemarcating(false);
                setIsAddingPoint(false);
                setIsDrawingCorridor((prev) => !prev);
              }}
              className={`h-12 w-12 center rounded text-white shadow-sm transition-colors ${
                isDrawingCorridor
                  ? "bg-orange-600 ring-2 ring-orange-300"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
              aria-label="desenhar retas dos corredores"
            >
              <FiGitCommit className="text-lg" />
            </button>
          </Tooltip>
          <Tooltip content="Configurações & Demarcação" className="bg-slate-800">
            <button
              type="button"
              onClick={() => setIsConfigModalOpen(true)}
              className="h-12 w-12 bg-slate-800 hover:bg-slate-900 center rounded text-white shadow-sm transition-colors"
              aria-label="configurações e demarcação"
            >
              <FiSettings className="text-lg" />
            </button>
          </Tooltip>
        </>
      )}

      {navigation.end && isDesktop && <DesktopRouteDetails />}
    </div>
  );
}

export default Toolbar;
