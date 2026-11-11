import { FiMapPin } from "react-icons/fi";
import Tooltip from "./ui/Tooltip";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import { useContext } from "react";
import { resetEdges } from "@/utils/navigationHelper";

function EditPositionButton() {
  const { isEditMode, setIsEditMode, setNavigation } = useContext(
    NavigationContext
  ) as NavigationContextType;
  function handleEdit() {
    setIsEditMode(!isEditMode);
    resetEdges();
    setNavigation((prevNavigation) => ({
      ...prevNavigation,
      end: "",
    }));
  }
  return (
    <Tooltip content="Mudar Posição (Você está aqui)" className="bg-green-500">
      <button
        data-tooltip-target="tooltip-default"
        className="h-12 w-12 bg-green-500 hover:bg-green-600 center rounded text-white shadow-sm transition-colors flex-none"
        onClick={() => handleEdit()}
        aria-label="change position"
      >
        <FiMapPin />
      </button>
    </Tooltip>
  );
}

export default EditPositionButton;
