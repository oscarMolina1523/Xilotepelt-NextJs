
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Edit, Save, Plus, Trash } from "lucide-react";

interface EditControlsProps {
  onEdit?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  isEditing?: boolean;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  disabled?: boolean;
}

const EditControls = ({
  onEdit,
  onSave,
  onDelete,
  onAdd,
  isEditing = false,
  showAdd = false,
  showEdit = true,
  showDelete = true,
  disabled = false,
}: EditControlsProps) => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-2">
      {showAdd && !isEditing && (
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1 bg-green-100 border-green-200 text-green-700 hover:bg-green-200"
          onClick={onAdd}
          disabled={disabled}
        >
          <Plus className="h-4 w-4" />
          <span>Agregar</span>
        </Button>
      )}

      {showEdit && !isEditing && (
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1 bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200"
          onClick={onEdit}
          disabled={disabled}
        >
          <Edit className="h-4 w-4" />
          <span>Editar</span>
        </Button>
      )}

      {isEditing && (
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1 bg-green-100 border-green-200 text-green-700 hover:bg-green-200"
          onClick={onSave}
          disabled={disabled}
        >
          <Save className="h-4 w-4" />
          <span>Guardar</span>
        </Button>
      )}

      {showDelete && (
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1 bg-red-100 border-red-200 text-red-700 hover:bg-red-200"
              disabled={disabled}
            >
              <Trash className="h-4 w-4" />
              <span>Eliminar</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Estás seguro de que quieres eliminar este elemento?</DialogTitle>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">Cancelar</Button>
              <Button 
                variant="destructive"
                onClick={onDelete}
                disabled={disabled}
              >
                Eliminar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EditControls;
