import React, { useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { MapDataContext, NavigationContext } from "../pages/Map";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
  SECTOR_META_MAP,
} from "../utils/types";
import { MapBackground, Paths, Positions, Objects } from "./IndoorMap";
import Controls from "./MapControls";
import ObjectDetailsModal from "./ObjectDetailsDialog";
import { navigateToObject, resetEdges } from "@/utils/navigationHelper";
import { toast } from "react-toastify";
import { FiX, FiCheckCircle, FiMapPin, FiArrowRight } from "react-icons/fi";

function IndoorMapWrapper() {
  const [modalOpen, setModalOpen] = useState(false);
  const [object, setObject] = useState<ObjectItem>({} as ObjectItem);
  const positionRadius = isMobile ? 18 : 14;
  const { navigation, setNavigation, isEditMode, setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const {
    activeSector,
    setActiveSector,
    pendingCrossSectorRoute,
    setPendingCrossSectorRoute,
    continueCrossSectorRoute,
    isDemarcating,
    setIsDemarcating,
    setDemarcationDraft,
    setEditingStore,
    setIsConfigModalOpen,
    isAddingPoint,
    setIsAddingPoint,
    setEditingLocationPoint,
    isDrawingCorridor,
    setIsDrawingCorridor,
  } = useContext(MapDataContext) as MapDataContextType;

  function handleObjectClick(store: ObjectItem) {
    if (isDemarcating || isAddingPoint || isDrawingCorridor) return;
    if (!isEditMode) {
      if (store?.id) {
        setObject(store);
        setModalOpen(true);
      } else {
        toast.error("Local não encontrado");
      }
    }
  }

  const handlePositionClick = (e: React.MouseEvent<SVGElement>) => {
    if (isDemarcating || isAddingPoint || isDrawingCorridor) return;
    if (isEditMode) {
      const vertexId = (e.target as HTMLElement).id;
      const newNav = { start: vertexId, end: navigation.end };
      setNavigation(newNav);
      setIsEditMode(false);
      if (navigation.end) {
        navigateToObject(navigation.end, newNav, setNavigation);
      } else {
        resetEdges();
      }
    }
  };

  function handleNavigationClick() {
    setModalOpen(false);
    setPendingCrossSectorRoute(null);
    navigateToObject(object.name, navigation, setNavigation);
  }

  function handlePortalSwitchSector(storeWithPortal: ObjectItem) {
    if (!storeWithPortal.portalToSectorId) return;
    setModalOpen(false);
    setActiveSector(storeWithPortal.portalToSectorId);
    toast.info(
      `Você entrou no ${SECTOR_META_MAP[storeWithPortal.portalToSectorId].name}!`
    );
  }

  function handleEditStoreClick(storeToEdit: ObjectItem) {
    setModalOpen(false);
    setEditingStore(storeToEdit);
    setIsConfigModalOpen(true);
  }

  return (
    <div className="relative w-full h-full bg-white center overflow-hidden">
      <ObjectDetailsModal
        open={modalOpen}
        object={object}
        onClose={() => setModalOpen((cur) => !cur)}
        objectNavigation={handleNavigationClick}
        onEditStore={handleEditStoreClick}
        onEnterPortalSector={
          object?.portalToSectorId
            ? () => handlePortalSwitchSector(object)
            : undefined
        }
      />

      {pendingCrossSectorRoute &&
        !isDemarcating &&
        !isAddingPoint &&
        !isDrawingCorridor && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex flex-wrap items-center gap-3 bg-indigo-900/95 text-white px-5 py-2.5 rounded-2xl shadow-2xl text-xs md:text-sm font-semibold border border-indigo-400">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-bold">
                Rota entre Setores ({SECTOR_META_MAP[activeSector].shortName} →{" "}
                {
                  SECTOR_META_MAP[pendingCrossSectorRoute.targetSectorId]
                    .shortName
                }
                )
              </span>
              <span>
                1º Siga a linha tracejada até{" "}
                <strong>{pendingCrossSectorRoute.portalObject.name}</strong> •
                Depois continue no{" "}
                <strong>
                  {SECTOR_META_MAP[pendingCrossSectorRoute.targetSectorId].name}
                </strong>{" "}
                até{" "}
                <strong>
                  {pendingCrossSectorRoute.finalDestinationObject.name}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={continueCrossSectorRoute}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
            >
              <span>
                Ver Continuação no{" "}
                {SECTOR_META_MAP[pendingCrossSectorRoute.targetSectorId].name}
              </span>
              <FiArrowRight />
            </button>
            <button
              type="button"
              onClick={() => setPendingCrossSectorRoute(null)}
              className="text-indigo-200 hover:text-white p-1"
              title="Fechar aviso"
            >
              <FiX />
            </button>
          </div>
        )}

      {isDemarcating && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-semibold animate-pulse">
          <FiCheckCircle className="text-lg flex-none" />
          <span>Modo Demarcação: Clique e arraste no mapa para desenhar o retângulo do local</span>
          <button
            type="button"
            onClick={() => {
              setIsDemarcating(false);
              setDemarcationDraft(null);
            }}
            className="ml-2 bg-blue-800 hover:bg-blue-900 text-white p-1 rounded-full transition-colors"
            title="Cancelar demarcação"
          >
            <FiX className="text-base" />
          </button>
        </div>
      )}

      {isAddingPoint && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-emerald-600 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-semibold animate-pulse">
          <FiMapPin className="text-lg flex-none" />
          <span>Modo Ponto de Localização: Clique no corredor da planta para marcar a posição!</span>
          <button
            type="button"
            onClick={() => {
              setIsAddingPoint(false);
              setEditingLocationPoint(null);
            }}
            className="ml-2 bg-emerald-800 hover:bg-emerald-900 text-white p-1 rounded-full transition-colors"
            title="Cancelar"
          >
            <FiX className="text-base" />
          </button>
        </div>
      )}

      {isDrawingCorridor && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-orange-600 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-semibold">
          <FiCheckCircle className="text-lg flex-none" />
          <span>
            Modo Corredores: Arraste para desenhar uma reta • Clique em um trecho laranja para remover apenas aquele trecho!
          </span>
          <button
            type="button"
            onClick={() => {
              setIsDrawingCorridor(false);
              setIsConfigModalOpen(true);
            }}
            className="ml-2 bg-white text-orange-700 hover:bg-orange-50 px-3 py-1 rounded-full text-xs font-bold transition-colors"
          >
            Concluir
          </button>
        </div>
      )}

      <TransformWrapper
        centerOnInit
        minScale={isMobile ? 0.3 : 0.6}
        maxScale={4}
        panning={{ disabled: isDemarcating || isAddingPoint || isDrawingCorridor }}
        doubleClick={{ mode: "reset", disabled: isDemarcating || isAddingPoint || isDrawingCorridor }}
        initialScale={isMobile ? 0.35 : 0.75}
        smooth={true}
        wheel={{ smoothStep: 0.01 }}
      >
        <TransformComponent
          wrapperClass="bg-white map-transform-wrapper"
          contentClass="map-transform-content"
        >
          <MapBackground>
            {/* Lojas e pontos de interesse demarcados */}
            <Objects
              handleObjectClick={handleObjectClick}
              className={
                isEditMode
                  ? ""
                  : isDemarcating || isAddingPoint || isDrawingCorridor
                  ? "pointer-events-none opacity-40"
                  : "hover:cursor-pointer hover:opacity-50"
              }
            />
            {/* Linhas e conexões dos corredores + rota ativa calculada */}
            <Paths />
            {/* Vértices das posições de corredor para mudar 'Você está aqui' */}
            <Positions
              positionRadius={positionRadius}
              handlePositionClick={handlePositionClick}
              className={
                isEditMode
                  ? "opacity-100 cursor-pointer hover:fill-[#488af4]"
                  : isAddingPoint || isDrawingCorridor
                  ? "opacity-80 pointer-events-none"
                  : "opacity-0"
              }
              navigation={navigation}
            />
          </MapBackground>
        </TransformComponent>
        <Controls />
      </TransformWrapper>
    </div>
  );
}

export default IndoorMapWrapper;
