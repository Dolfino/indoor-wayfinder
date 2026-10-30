import { NavigationContext, MapDataContext } from "@/pages/Map";
import { NavigationContextType, MapDataContextType } from "@/utils/types";
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
    setIsConfigModalOpen,
    isDrawingCorridor,
    setIsDrawingCorridor,
    setIsDemarcating,
    setIsAddingPoint,
  } = useContext(MapDataContext) as MapDataContextType;

  return (
    <div className="flex space-x-2 mb-4 h-12 relative items-center">
      <SearchBar />
      <EditPositionButton />
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
          className={`ml-1 h-12 w-12 center rounded text-white shadow-sm transition-colors ${
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
          className="ml-1 h-12 w-12 bg-slate-800 hover:bg-slate-900 center rounded text-white shadow-sm transition-colors"
          aria-label="configurações e demarcação"
        >
          <FiSettings className="text-lg" />
        </button>
      </Tooltip>
      {navigation.end && isDesktop && <DesktopRouteDetails />}
    </div>
  );
}

export default Toolbar;
