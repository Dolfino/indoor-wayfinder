import { useRouteDetails } from "@/hooks/useRouteDetails";
import { SECTOR_META_MAP } from "@/utils/types";
import { FaX } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { TbRoute } from "react-icons/tb";

function DesktopRouteDetails() {
  const {
    object,
    rightRouteLength,
    walkingTime,
    pendingCrossSectorRoute,
    continueCrossSectorRoute,
    handleLeave,
  } = useRouteDetails();

  const targetSectorMeta = pendingCrossSectorRoute
    ? SECTOR_META_MAP[pendingCrossSectorRoute.targetSectorId]
    : null;

  return (
    <div className="md:w-fit md:visible invisible hidden md:flex flex-row pl-2">
      <div className="flex flex-inline items-center rounded w-full bg-white navigation-info-pulse shadow-sm">
        <div className="w-12 h-12 center flex-none rounded-l text-blue-500 text-xl">
          <TbRoute />
        </div>
        <div className="flex flex-col max-w-48 h-full justify-center break-word pr-2">
          {pendingCrossSectorRoute && targetSectorMeta ? (
            <>
              <p className="text-indigo-700 text-[10px] font-bold uppercase tracking-wide">
                Etapa 1 • Até {object?.name}
              </p>
              <p className="text-gray-900 text-xs font-bold truncate">
                Destino: {pendingCrossSectorRoute.finalDestinationObject.name}
              </p>
            </>
          ) : (
            <p className="text-gray-900 text-sm font-semibold">{object?.name}</p>
          )}
        </div>
        <div className="flex flex-col h-full justify-center px-3">
          <p className="text-gray-500 text-xs whitespace-nowrap">
            {rightRouteLength} m • {walkingTime} seg
          </p>
        </div>

        {pendingCrossSectorRoute && targetSectorMeta && (
          <button
            type="button"
            onClick={continueCrossSectorRoute}
            className={`mr-2 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${targetSectorMeta.activeBtnClass}`}
            title={`Trocar mapa para ${targetSectorMeta.name} e continuar o tracejado`}
          >
            <span>Entrar no {targetSectorMeta.name}</span>
            <FiArrowRight />
          </button>
        )}

        <div className="h-12 w-12 center flex-none rounded-r bg-white text-blue-500 text-xs">
          <button
            className="w-full h-8 center border-gray-300 border-l"
            onClick={handleLeave}
          >
            <FaX className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesktopRouteDetails;
