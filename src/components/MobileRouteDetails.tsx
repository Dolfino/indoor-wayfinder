import { useRouteDetails } from "@/hooks/useRouteDetails";
import { SECTOR_META_MAP } from "@/utils/types";
import { FaX } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { TbRoute } from "react-icons/tb";

function MobileRouteDetails() {
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
    <div className="absolute navigation-info-pulse bottom-0 left-0 right-0 mx-auto w-full bg-white border-t border-blue-300 shadow-lg rounded-t-lg overflow-hidden z-30">
      <button className="absolute right-2 top-2 p-2" onClick={handleLeave}>
        <FaX className="text-gray-400" />
      </button>

      <div className="p-4 pb-0">
        {pendingCrossSectorRoute && targetSectorMeta ? (
          <>
            <p className="text-xs font-bold uppercase text-indigo-700 mb-0.5">
              Etapa 1: Siga até {object?.name}
            </p>
            <h1 className="text-gray-900 text-lg font-bold mb-1">
              Destino final: {pendingCrossSectorRoute.finalDestinationObject.name} (
              {targetSectorMeta.name})
            </h1>
          </>
        ) : (
          <>
            <h1 className="text-gray-900 text-xl font-semibold mb-1">
              {object?.name}
            </h1>
            <p className="text-gray-500 text-sm">{object?.categoryName}</p>
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 m-3">
        <div className="bg-gray-200 text-gray-900 px-3 py-1.5 center w-fit rounded-md text-xs font-semibold">
          <TbRoute className="inline-block mr-1" />
          {walkingTime} seg • {rightRouteLength} metros
        </div>

        {pendingCrossSectorRoute && targetSectorMeta && (
          <button
            type="button"
            onClick={continueCrossSectorRoute}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${targetSectorMeta.activeBtnClass}`}
          >
            <span>Entrar no {targetSectorMeta.name}</span>
            <FiArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileRouteDetails;
