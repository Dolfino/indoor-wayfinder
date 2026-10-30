import React, { useContext, useState, useEffect } from "react";
import {
  FiX,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiCrosshair,
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiCheck,
  FiMapPin,
  FiNavigation,
  FiGitCommit,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { MapDataContext, NavigationContext } from "@/pages/Map";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
  StoreType,
  STORE_TYPE_META,
  LocationPoint,
  SECTORS,
  SECTOR_META_MAP,
  SectorId,
} from "@/utils/types";
import { findNearestEntrance } from "@/utils/graphBuilder";
import { navigateToObject } from "@/utils/navigationHelper";
import { toast } from "react-toastify";

type ActiveTab = "list" | "form" | "points" | "point-form" | "corridors";

function ConfigModal() {
  const {
    activeSector,
    setActiveSector,
    allObjects,
    allLocationPoints,
    allCorridorLines,
    objects,
    categories,
    addStore,
    updateStore,
    deleteStore,
    resetDefaultStores,
    isConfigModalOpen,
    setIsConfigModalOpen,
    setIsDemarcating,
    demarcationDraft,
    setDemarcationDraft,
    editingStore,
    setEditingStore,
    locationPoints,
    addLocationPoint,
    updateLocationPoint,
    deleteLocationPoint,
    clearAllLocationPoints,
    resetDefaultLocationPoints,
    setIsAddingPoint,
    editingLocationPoint,
    setEditingLocationPoint,
    corridorLines,
    deleteCorridorLine,
    clearAllCorridorLines,
    resetDefaultCorridorLines,
    setIsDrawingCorridor,
    showCorridorLines,
    setShowCorridorLines,
    importMapData,
  } = useContext(MapDataContext) as MapDataContextType;

  const { navigation, setNavigation } = useContext(
    NavigationContext
  ) as NavigationContextType;

  const [activeTab, setActiveTab] = useState<ActiveTab>("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("todos");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("todas");

  // Search for location points
  const [pointSearchTerm, setPointSearchTerm] = useState("");

  // Store Form state
  const [formId, setFormId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formCategory, setFormCategory] = useState(categories[0]?.id || "cat-fem");
  const [formType, setFormType] = useState<StoreType>("loja");
  const [formPortalToSector, setFormPortalToSector] = useState<string>("");
  const [formPortalTargetId, setFormPortalTargetId] = useState<string>("");
  const [formX, setFormX] = useState<number>(500);
  const [formY, setFormY] = useState<number>(500);
  const [formWidth, setFormWidth] = useState<number>(80);
  const [formHeight, setFormHeight] = useState<number>(70);
  const [formEntranceX, setFormEntranceX] = useState<number>(613);
  const [formEntranceY, setFormEntranceY] = useState<number>(500);

  // Location Point Form state
  const [pointFormId, setPointFormId] = useState<string | null>(null);
  const [pointFormName, setPointFormName] = useState("");
  const [pointFormCx, setPointFormCx] = useState<number>(1047);
  const [pointFormCy, setPointFormCy] = useState<number>(2060);

  // If a draft rectangle was just drawn on the map, update store coordinates
  useEffect(() => {
    if (demarcationDraft) {
      if (!editingStore && !formId) {
        setFormId(null);
        setFormName("");
        setFormDesc("");
      }
      setFormX(demarcationDraft.x);
      setFormY(demarcationDraft.y);
      setFormWidth(demarcationDraft.width);
      setFormHeight(demarcationDraft.height);

      const entrance = findNearestEntrance(demarcationDraft);
      setFormEntranceX(entrance.entranceX);
      setFormEntranceY(entrance.entranceY);

      setActiveTab("form");
    }
  }, [demarcationDraft]);

  // When editingStore changes, fill store form
  useEffect(() => {
    if (editingStore) {
      setFormId(editingStore.id);
      setFormName(editingStore.name);
      setFormDesc(editingStore.desc || "");
      setFormCategory(editingStore.categoryId);
      setFormType(editingStore.type || "loja");
      setFormPortalToSector(editingStore.portalToSectorId || "");
      setFormPortalTargetId(editingStore.portalTargetObjectId || "");
      setFormX(editingStore.x ?? 500);
      setFormY(editingStore.y ?? 500);
      setFormWidth(editingStore.width ?? 80);
      setFormHeight(editingStore.height ?? 70);
      setFormEntranceX(editingStore.entranceX ?? 613);
      setFormEntranceY(editingStore.entranceY ?? 500);
      setActiveTab("form");
    }
  }, [editingStore]);

  // When editingLocationPoint changes (or point clicked on map), fill point form
  useEffect(() => {
    if (editingLocationPoint) {
      setPointFormId(editingLocationPoint.id || null);
      if (editingLocationPoint.name) {
        setPointFormName(editingLocationPoint.name);
      } else if (!editingLocationPoint.id && !pointFormName) {
        setPointFormName(`Ponto (${editingLocationPoint.cx}, ${editingLocationPoint.cy})`);
      }
      setPointFormCx(editingLocationPoint.cx);
      setPointFormCy(editingLocationPoint.cy);
      setActiveTab("point-form");
    }
  }, [editingLocationPoint]);

  if (!isConfigModalOpen) return null;

  function resetForm() {
    setFormId(null);
    setFormName("");
    setFormDesc("");
    setFormCategory(categories[0]?.id || "cat-fem");
    setFormType("loja");
    setFormPortalToSector("");
    setFormPortalTargetId("");
    setFormX(673);
    setFormY(500);
    setFormWidth(75);
    setFormHeight(70);
    setFormEntranceX(758);
    setFormEntranceY(535);
    setEditingStore(null);
    setDemarcationDraft(null);
  }

  function resetPointForm() {
    setPointFormId(null);
    setPointFormName("");
    setPointFormCx(1047);
    setPointFormCy(2060);
    setEditingLocationPoint(null);
  }

  function handleStartDemarcation() {
    setIsConfigModalOpen(false);
    setIsDemarcating(true);
    toast.info("Clique e arraste no mapa para desenhar o retângulo do local!");
  }

  function handleStartPointOnMap(keepCurrentForm = false) {
    if (keepCurrentForm) {
      setEditingLocationPoint({
        id: pointFormId || "",
        name: pointFormName,
        cx: pointFormCx,
        cy: pointFormCy,
      });
    } else {
      resetPointForm();
    }
    setIsConfigModalOpen(false);
    setIsAddingPoint(true);
    toast.info("Clique no corredor da planta para marcar o Ponto de Localização!");
  }

  function handleSaveStore(e: React.FormEvent) {
    e.preventDefault();
    if (!formName.trim()) {
      toast.warning("Informe o nome do local!");
      return;
    }

    const typeInfo = STORE_TYPE_META[formType] || STORE_TYPE_META.loja;
    const currentSectorMeta = SECTOR_META_MAP[activeSector];
    const payload: ObjectItem = {
      id: formId || `cf-custom-${Date.now()}`,
      name: formName.trim(),
      desc:
        formDesc.trim() ||
        `${typeInfo.label} no ${currentSectorMeta.name} do Centro Fashion.`,
      categoryId: formCategory,
      type: formType,
      sectorId: editingStore?.sectorId || activeSector,
      portalToSectorId: formPortalToSector
        ? (formPortalToSector as SectorId)
        : undefined,
      portalTargetObjectId: formPortalTargetId || undefined,
      x: Number(formX),
      y: Number(formY),
      width: Number(formWidth),
      height: Number(formHeight),
      entranceX: Number(formEntranceX),
      entranceY: Number(formEntranceY),
    };

    if (formId) {
      updateStore(payload);
      toast.success(`"${payload.name}" atualizado com sucesso!`);
    } else {
      addStore(payload);
      toast.success(`"${payload.name}" cadastrado com sucesso!`);
    }

    resetForm();
    setActiveTab("list");
  }

  function handleSavePoint(e: React.FormEvent) {
    e.preventDefault();
    if (!pointFormName.trim()) {
      toast.warning("Informe o nome/identificação do ponto de localização!");
      return;
    }

    const payload: LocationPoint = {
      id: pointFormId || `loc-${Date.now()}`,
      name: pointFormName.trim(),
      cx: Number(pointFormCx),
      cy: Number(pointFormCy),
    };

    if (pointFormId) {
      updateLocationPoint(payload);
      toast.success(`Ponto "${payload.name}" atualizado!`);
    } else {
      addLocationPoint(payload);
      toast.success(`Novo ponto "${payload.name}" criado!`);
    }

    resetPointForm();
    setActiveTab("points");
  }

  function handleDeleteStore(id: string, name: string) {
    if (window.confirm(`Tem certeza que deseja excluir "${name}"?`)) {
      deleteStore(id);
      toast.info(`Local "${name}" excluído.`);
    }
  }

  function handleDeletePoint(id: string, name: string) {
    if (window.confirm(`Tem certeza que deseja excluir o ponto "${name}"?`)) {
      deleteLocationPoint(id);
      toast.info(`Ponto "${name}" excluído.`);
    }
  }

  function handleExportJson() {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(
          {
            objects: allObjects,
            locationPoints: allLocationPoints,
            corridorLines: allCorridorLines,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      "centro-fashion-todos-setores-dados.json"
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Arquivo JSON (todos os setores) exportado com sucesso!");
  }

  function handleImportJsonFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result || "{}"));
        importMapData(parsed);
        toast.success("Dados do mapa importados com sucesso!");
      } catch {
        toast.error("Arquivo JSON inválido!");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleResetStores() {
    if (
      window.confirm(
        "Deseja limpar todos os locais cadastrados e deixar o mapa totalmente vazio?"
      )
    ) {
      resetDefaultStores();
      toast.info("Todos os locais foram removidos. O mapa está limpo!");
    }
  }

  function handleClearAllPoints() {
    if (
      window.confirm(
        "Deseja remover todos os pontos de localização dos corredores para começar do zero?"
      )
    ) {
      clearAllLocationPoints();
      toast.info("Todos os pontos de localização foram removidos!");
    }
  }

  function handleResetPoints() {
    if (
      window.confirm(
        "Deseja restaurar a malha padrão de pontos de localização dos corredores?"
      )
    ) {
      resetDefaultLocationPoints();
      toast.info("Pontos de localização padrão restaurados!");
    }
  }

  // Filtered stores
  const filteredObjects = objects.filter((obj) => {
    const matchesSearch =
      obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obj.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedTypeFilter === "todos" || obj.type === selectedTypeFilter;
    const matchesCategory =
      selectedCategoryFilter === "todas" ||
      obj.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Filtered location points
  const filteredPoints = locationPoints.filter(
    (pt) =>
      pt.name.toLowerCase().includes(pointSearchTerm.toLowerCase()) ||
      pt.id.toLowerCase().includes(pointSearchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/80 gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>Configurações & Demarcação</span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${SECTOR_META_MAP[activeSector].badgeClass}`}
              >
                {SECTOR_META_MAP[activeSector].name}
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Gerencie lojas, acessos, pontos de localização, retas de corredores e conexões entre setores
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={activeSector}
              onChange={(e) => {
                setActiveSector(e.target.value as SectorId);
                resetForm();
                resetPointForm();
              }}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm"
            >
              {SECTORS.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  📍 Editando: {sec.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setIsConfigModalOpen(false);
                resetForm();
                resetPointForm();
              }}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 px-6 bg-white gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`py-3 px-2 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "list"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <span>🏬 Locais (Lojas/Boxes)</span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {objects.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetForm();
              setActiveTab("form");
            }}
            className={`py-3 px-2 font-semibold text-sm border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "form"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FiPlus className="text-base" />
            <span>{formId ? "Editar Local" : "Novo Local"}</span>
          </button>

          <div className="h-6 w-px bg-gray-200 self-center mx-1" />

          <button
            type="button"
            onClick={() => setActiveTab("points")}
            className={`py-3 px-2 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "points"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FiMapPin className="text-base" />
            <span>Pontos de Localização</span>
            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
              {locationPoints.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetPointForm();
              setActiveTab("point-form");
            }}
            className={`py-3 px-2 font-semibold text-sm border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "point-form"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FiPlus className="text-base" />
            <span>{pointFormId ? "Editar Ponto" : "Novo Ponto"}</span>
          </button>

          <div className="h-6 w-px bg-gray-200 self-center mx-1" />

          <button
            type="button"
            onClick={() => setActiveTab("corridors")}
            className={`py-3 px-2 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "corridors"
                ? "border-orange-600 text-orange-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FiGitCommit className="text-base" />
            <span>Retas de Corredores</span>
            <span className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full">
              {corridorLines.length}
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/40">
          {/* 1. ABA LISTA DE LOJAS */}
          {activeTab === "list" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1 min-w-[220px]">
                  <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Filtrar por nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedTypeFilter}
                    onChange={(e) => setSelectedTypeFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="todos">Todos os Tipos</option>
                    <option value="loja">🏬 Lojas</option>
                    <option value="box">🛍️ Boxes</option>
                    <option value="quiosque">🍔 Quiosques</option>
                    <option value="elevador">🛗 Elevadores</option>
                    <option value="escada_rolante">🎢 Escadas Rolantes</option>
                    <option value="esteira_rolante">🛤️ Esteiras Rolantes</option>
                    <option value="escada">🪜 Escadas Fixas</option>
                    <option value="banheiro">🚻 Banheiros / Sanitários</option>
                    <option value="entrada_saida">🚪 Entradas / Saídas</option>
                    <option value="servico">ℹ️ Outros Serviços</option>
                  </select>

                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[180px]"
                  >
                    <option value="todas">Todas as Categorias</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleStartDemarcation}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                  >
                    <FiCrosshair />
                    <span>Demarcar no Mapa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab("form");
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                  >
                    <FiPlus />
                    <span>Novo Local</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {filteredObjects.length === 0 ? (
                  <div className="col-span-2 text-center py-12 px-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <p className="font-bold text-gray-700 text-sm mb-1">
                      {objects.length === 0
                        ? "O mapa está limpo! Nenhum local cadastrado."
                        : "Nenhum local encontrado com os filtros selecionados."}
                    </p>
                    <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                      {objects.length === 0
                        ? "Clique no botão abaixo ou em 'Demarcar no Mapa' para adicionar seu primeiro box, loja ou quiosque."
                        : "Tente buscar por outro termo ou limpar os filtros de tipo e categoria."}
                    </p>
                    {objects.length === 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={handleStartDemarcation}
                          className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                        >
                          📐 Demarcar no Mapa
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            setActiveTab("form");
                          }}
                          className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                        >
                          + Novo Local
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  filteredObjects.map((item) => {
                    const stType = (item.type || "loja") as StoreType;
                    const meta = STORE_TYPE_META[stType] || STORE_TYPE_META.loja;

                    return (
                      <div
                        key={item.id}
                        className="bg-white p-3.5 rounded-xl border border-gray-200 hover:border-emerald-300 shadow-sm transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${meta.badgeClass}`}
                            >
                              {meta.icon} {meta.label}
                            </span>
                            <span className="text-[11px] font-semibold text-gray-500">
                              {item.categoryName}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {item.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100 text-[11px] text-gray-500">
                          <span>
                            Coord: ({item.x}, {item.y}) • {item.width}×{item.height}px
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingStore(item)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Editar local"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteStore(item.id, item.name)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Excluir local"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
                <span className="text-gray-500">
                  Mostrando {filteredObjects.length} de {objects.length} locais
                </span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-semibold cursor-pointer">
                    <FiUpload />
                    <span>Importar JSON</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleImportJsonFile}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="flex items-center gap-1.5 text-gray-700 hover:text-emerald-700 font-semibold"
                  >
                    <FiDownload />
                    <span>Exportar JSON</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetStores}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-red-700 font-medium"
                    title="Remover todos os locais e deixar o mapa limpo"
                  >
                    <FiRefreshCw />
                    <span>Limpar Tudo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. ABA FORMULÁRIO DE LOJA */}
          {activeTab === "form" && (
            <form onSubmit={handleSaveStore} className="flex flex-col gap-5 max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-bold text-gray-900">
                  {formId ? `Editar Local: "${formName}"` : "Cadastrar Novo Local / Box / Quiosque"}
                </h3>
                <button
                  type="button"
                  onClick={handleStartDemarcation}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                  title="Desenhar novo retângulo no mapa para este local"
                >
                  <FiCrosshair />
                  <span>{formId ? "Redesenhar no Mapa" : "Demarcar no Mapa"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nome do Local *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Box 1145, Café do Centro, Loja Moda Sul"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tipo de Local / Sinalização *
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => {
                      const nextType = e.target.value as StoreType;
                      setFormType(nextType);
                      const meta = STORE_TYPE_META[nextType];
                      if (meta?.isAccessOrService) {
                        setFormCategory("cat-serv");
                        if (!formName.trim()) {
                          setFormName(meta.label);
                        }
                      } else if (nextType === "quiosque") {
                        setFormCategory("cat-alim");
                      }
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <optgroup label="Comércio">
                      <option value="loja">🏬 Loja</option>
                      <option value="box">🛍️ Box Comercial</option>
                      <option value="quiosque">🍔 Quiosque / Alimentação</option>
                    </optgroup>
                    <optgroup label="Acessos, Circulação & Infraestrutura">
                      <option value="elevador">🛗 Elevador</option>
                      <option value="escada_rolante">🎢 Escada Rolante</option>
                      <option value="esteira_rolante">🛤️ Esteira Rolante</option>
                      <option value="escada">🪜 Escada Fixa</option>
                      <option value="banheiro">🚻 Banheiro / Sanitário</option>
                      <option value="entrada_saida">🚪 Entrada / Saída / Acesso</option>
                      <option value="servico">ℹ️ Outros Serviços (Caixa, SAC, etc.)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Categoria *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Descrição Breve
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Especialidade em vestidos, atacado e varejo."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Conexão / Portal para Outro Setor */}
              <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200">
                <div className="mb-2">
                  <span className="text-xs font-bold text-indigo-900">
                    🔗 Conexão / Passagem para Outro Setor (Opcional)
                  </span>
                  <p className="text-[11px] text-indigo-700 mt-0.5">
                    Se este ponto for uma entrada para outro setor (ex: "Passagem p/ Setor Azul", Esteira Rolante ou Elevador), selecione para qual setor ele leva. Quando alguém buscar uma loja daquele setor, a linha tracejada irá até aqui e depois continuará no outro setor!
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-indigo-900 font-semibold mb-1">
                      Leva para qual Setor?
                    </label>
                    <select
                      value={formPortalToSector}
                      onChange={(e) => {
                        setFormPortalToSector(e.target.value);
                        setFormPortalTargetId("");
                      }}
                      className="w-full px-3 py-2 border border-indigo-300 rounded-lg bg-white text-gray-800 font-semibold"
                    >
                      <option value="">— Não é passagem entre setores —</option>
                      {SECTORS.filter((s) => s.id !== activeSector).map((sec) => (
                        <option key={sec.id} value={sec.id}>
                          ➡️ Conecta com {sec.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formPortalToSector && (
                    <div>
                      <label className="block text-indigo-900 font-semibold mb-1">
                        Ponto/Entrada correspondente no{" "}
                        {SECTOR_META_MAP[formPortalToSector as SectorId]?.shortName}{" "}
                        (Opcional)
                      </label>
                      <select
                        value={formPortalTargetId}
                        onChange={(e) => setFormPortalTargetId(e.target.value)}
                        className="w-full px-3 py-2 border border-indigo-300 rounded-lg bg-white text-gray-800"
                      >
                        <option value="">
                          Usar ponto inicial padrão do{" "}
                          {SECTOR_META_MAP[formPortalToSector as SectorId]?.name}
                        </option>
                        <optgroup label="Pontos de Localização no Setor de Destino">
                          {allLocationPoints
                            .filter(
                              (p) =>
                                (p.sectorId || "verde") === formPortalToSector
                            )
                            .map((pt) => (
                              <option key={pt.id} value={pt.id}>
                                📍 {pt.name}
                              </option>
                            ))}
                        </optgroup>
                        <optgroup label="Entradas / Acessos no Setor de Destino">
                          {allObjects
                            .filter(
                              (o) =>
                                (o.sectorId || "verde") === formPortalToSector
                            )
                            .map((obj) => (
                              <option key={obj.id} value={obj.id}>
                                🚪 {obj.name}
                              </option>
                            ))}
                        </optgroup>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-800">
                    Posicionamento na Planta (Coordenadas SVG 3329 × 3600 px)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const entrance = findNearestEntrance({
                        x: formX,
                        y: formY,
                        width: formWidth,
                        height: formHeight,
                      });
                      setFormEntranceX(entrance.entranceX);
                      setFormEntranceY(entrance.entranceY);
                      toast.info("Entrada alinhada ao corredor mais próximo!");
                    }}
                    className="text-[11px] font-semibold text-emerald-700 hover:underline"
                  >
                    Recalcular Entrada Automática
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">X (Posição)</label>
                    <input
                      type="number"
                      value={formX}
                      onChange={(e) => setFormX(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Y (Posição)</label>
                    <input
                      type="number"
                      value={formY}
                      onChange={(e) => setFormY(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Largura (px)</label>
                    <input
                      type="number"
                      value={formWidth}
                      onChange={(e) => setFormWidth(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Altura (px)</label>
                    <input
                      type="number"
                      value={formHeight}
                      onChange={(e) => setFormHeight(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 border rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mt-3 pt-3 border-t border-gray-200">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Entrada no Corredor X
                    </label>
                    <input
                      type="number"
                      value={formEntranceX}
                      onChange={(e) => setFormEntranceX(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 border rounded-md bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Entrada no Corredor Y
                    </label>
                    <input
                      type="number"
                      value={formEntranceY}
                      onChange={(e) => setFormEntranceY(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 border rounded-md bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab("list");
                  }}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md transition-colors"
                >
                  <FiCheck className="text-base" />
                  <span>{formId ? "Salvar Alterações" : "Cadastrar Local"}</span>
                </button>
              </div>
            </form>
          )}

          {/* 3. ABA LISTA DE PONTOS DE LOCALIZAÇÃO */}
          {activeTab === "points" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1 min-w-[220px]">
                  <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Buscar ponto por nome ou ID..."
                    value={pointSearchTerm}
                    onChange={(e) => setPointSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleStartPointOnMap(false)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                  >
                    <FiMapPin />
                    <span>Marcar Ponto no Mapa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetPointForm();
                      setActiveTab("point-form");
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                  >
                    <FiPlus />
                    <span>Novo Ponto (Manual)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {filteredPoints.length === 0 ? (
                  <div className="col-span-2 text-center py-12 px-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <p className="font-bold text-gray-700 text-sm mb-1">
                      Nenhum ponto de localização encontrado.
                    </p>
                    <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                      Clique em "Marcar Ponto no Mapa" para posicionar novos pontos de referência nos corredores.
                    </p>
                  </div>
                ) : (
                  filteredPoints.map((pt) => {
                    const isCurrentStart = navigation.start === pt.id;
                    return (
                      <div
                        key={pt.id}
                        className={`bg-white p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 shadow-sm ${
                          isCurrentStart
                            ? "border-blue-500 ring-1 ring-blue-400 bg-blue-50/20"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full center flex-none mt-0.5 ${
                              isCurrentStart
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <FiMapPin className="text-sm" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-gray-900">
                                {pt.name}
                              </h4>
                              {isCurrentStart && (
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                  Você está aqui
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                              ID: {pt.id} • Coord: ({pt.cx}, {pt.cy})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {!isCurrentStart && (
                            <button
                              type="button"
                              onClick={() => {
                                const newNav = {
                                  ...navigation,
                                  start: pt.id,
                                };
                                setNavigation(newNav);
                                if (navigation.end) {
                                  setTimeout(() => {
                                    navigateToObject(
                                      navigation.end!,
                                      newNav,
                                      setNavigation
                                    );
                                  }, 0);
                                }
                                toast.success(
                                  `Posição atual alterada para "${pt.name}"!`
                                );
                              }}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                              title="Definir como posição atual (Você está aqui)"
                            >
                              <FiNavigation />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setEditingLocationPoint(pt)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Editar ponto"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePoint(pt.id, pt.name)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Excluir ponto"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
                <span className="text-gray-500">
                  Mostrando {filteredPoints.length} de {locationPoints.length} pontos de localização
                </span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleClearAllPoints}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-red-700 font-medium"
                    title="Remover todos os pontos de localização do mapa"
                  >
                    <FiTrash2 />
                    <span>Limpar Todos os Pontos</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPoints}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-blue-700 font-medium"
                  >
                    <FiRefreshCw />
                    <span>Restaurar Malha Padrão</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. ABA FORMULÁRIO DE PONTO DE LOCALIZAÇÃO */}
          {activeTab === "point-form" && (
            <form onSubmit={handleSavePoint} className="flex flex-col gap-5 max-w-xl mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-bold text-gray-900">
                  {pointFormId
                    ? `Editar Ponto: "${pointFormName}"`
                    : "Novo Ponto de Localização (Corredor)"}
                </h3>
                <button
                  type="button"
                  onClick={() => handleStartPointOnMap(true)}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                >
                  <FiMapPin />
                  <span>
                    {pointFormId ? "Reposicionar no Mapa" : "Escolher Posição no Mapa"}
                  </span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nome / Identificação do Ponto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Entrada Rua Pedro Pereira, Corredor Central, Frente à Escada"
                  value={pointFormName}
                  onChange={(e) => setPointFormName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <span className="block text-xs font-bold text-gray-800 mb-3">
                  Coordenadas no Corredor (SVG 3329 × 3600 px)
                </span>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Posição X (cx)
                    </label>
                    <input
                      type="number"
                      required
                      value={pointFormCx}
                      onChange={(e) => setPointFormCx(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Posição Y (cy)
                    </label>
                    <input
                      type="number"
                      required
                      value={pointFormCy}
                      onChange={(e) => setPointFormCy(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetPointForm();
                    setActiveTab("points");
                  }}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-colors"
                >
                  <FiCheck className="text-base" />
                  <span>{pointFormId ? "Salvar Ponto" : "Criar Ponto"}</span>
                </button>
              </div>
            </form>
          )}

          {/* 5. ABA RETAS DE CORREDORES (MALHA DE ROTAS) */}
          {activeTab === "corridors" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    Malha de Retas dos Corredores (Caminhos Permitidos)
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Desenhe retas pelos corredores da planta. A rota tracejada usará exatamente essas retas e seus cruzamentos para calcular o caminho mais curto sem passar sobre lojas.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowCorridorLines((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-colors ${
                      showCorridorLines
                        ? "bg-orange-50 text-orange-700 border-orange-300"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {showCorridorLines ? <FiEye /> : <FiEyeOff />}
                    <span>
                      {showCorridorLines
                        ? "Ocultar Retas no Mapa"
                        : "Mostrar Retas no Mapa"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsConfigModalOpen(false);
                      setIsDrawingCorridor(true);
                      toast.info(
                        "Clique e arraste nos corredores da planta para desenhar retas de rota!"
                      );
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm transition-colors"
                  >
                    <FiGitCommit />
                    <span>Desenhar Retas no Mapa</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[48vh] overflow-y-auto pr-1">
                {corridorLines.length === 0 ? (
                  <div className="col-span-2 text-center py-12 px-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <p className="font-bold text-gray-700 text-sm mb-1">
                      Nenhuma reta de corredor desenhada.
                    </p>
                    <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                      Clique em "Desenhar Retas no Mapa" para traçar os corredores por onde a linha de navegação deve passar, ou restaure as retas padrão.
                    </p>
                  </div>
                ) : (
                  corridorLines.map((line) => (
                    <div
                      key={line.id}
                      className="bg-white p-3 rounded-xl border border-gray-200 hover:border-orange-300 shadow-sm flex items-center justify-between gap-2"
                    >
                      <div>
                        <h5 className="text-xs font-bold text-gray-900">
                          {line.name}
                        </h5>
                        <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                          ({line.x1}, {line.y1}) → ({line.x2}, {line.y2})
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          deleteCorridorLine(line.id);
                          toast.info(`Reta "${line.name}" removida.`);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Excluir reta"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
                <span className="text-gray-500">
                  Total: {corridorLines.length} retas de corredor ativas
                </span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Deseja limpar todas as retas de corredor para desenhar sua própria malha do zero?"
                        )
                      ) {
                        clearAllCorridorLines();
                        toast.info("Todas as retas de corredor foram removidas!");
                      }
                    }}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-red-700 font-medium"
                  >
                    <FiTrash2 />
                    <span>Limpar Todas as Retas</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Deseja restaurar as retas padrão dos corredores do Setor Verde?"
                        )
                      ) {
                        resetDefaultCorridorLines();
                        toast.info("Retas padrão dos corredores restauradas!");
                      }
                    }}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-orange-700 font-medium"
                  >
                    <FiRefreshCw />
                    <span>Restaurar Retas Padrão</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfigModal;
