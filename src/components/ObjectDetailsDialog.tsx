import { ObjectItem, STORE_TYPE_META, StoreType } from "@/utils/types";
import { FiNavigation, FiEdit2 } from "react-icons/fi";
import { Dialog, DialogBody, DialogHeader } from "./ui/Dialog";

interface ObjectItemDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  object: ObjectItem;
  objectNavigation: () => void;
  onEditStore?: (store: ObjectItem) => void;
}

function ObjectItemDetailsDialog({
  open,
  onClose,
  object,
  objectNavigation,
  onEditStore,
}: ObjectItemDetailsDialogProps) {
  const stType = (object.type || "loja") as StoreType;
  const meta = STORE_TYPE_META[stType] || STORE_TYPE_META.loja;

  return (
    <>
      <Dialog
        open={open}
        handler={() => {
          onClose();
        }}
      >
        <DialogHeader>
          <div className="flex items-center justify-between w-full pr-6">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {object.categoryName || "Local"}
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border ${meta.badgeClass}`}
            >
              {meta.icon} {meta.label}
            </span>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="mb-6">
            <p className="text-xl font-bold text-gray-900">
              {meta.isAccessOrService ? `${meta.icon} ` : ""}
              {object.name}
            </p>
            <p className="text-sm text-gray-600 mt-1">{object.desc}</p>
            {object.x !== undefined && object.y !== undefined && (
              <p className="text-xs text-gray-400 mt-2">
                Posição: ({object.x}, {object.y}) • {object.width}×{object.height}px
              </p>
            )}
          </div>
          <div className="inline-flex rounded-md right-0 bottom-0 p-3 absolute gap-2 items-center">
            {onEditStore && (
              <button
                type="button"
                className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none font-medium rounded-full text-sm p-3 text-center inline-flex items-center shadow-sm transition-colors"
                onClick={() => onEditStore(object)}
                title="Editar / Reposicionar no mapa"
              >
                <FiEdit2 className="text-base" />
              </button>
            )}
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-full text-sm px-4 py-2.5 text-center inline-flex items-center gap-2 shadow-md transition-colors"
              onClick={objectNavigation}
              title="Traçar rota até este local"
            >
              <FiNavigation className="text-base" />
              <span className="font-semibold text-xs">Traçar Rota</span>
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default ObjectItemDetailsDialog;
