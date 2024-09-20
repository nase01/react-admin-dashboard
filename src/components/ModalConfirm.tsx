import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons";
import { useModalConfirmIsOpen } from "@/components/ToggleProvider";
  
interface DialogConfirmProps {
  onConfirm: (ids: string[]) => void;
  isLoading: boolean;
  title: string;
  message: string;
  action: string;
}

const ModalConfirm: React.FC<DialogConfirmProps> = ({ onConfirm, isLoading, title, message, action }) => {
  const { modalConfirmIsOpen, setModalConfirmIsOpen } = useModalConfirmIsOpen();

  const handleClose = () => {
    setModalConfirmIsOpen(false);
  };

  return (
    <Dialog open={modalConfirmIsOpen} onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) => !isLoading && setModalConfirmIsOpen(open)}>
      <DialogContent 
        aria-describedby={undefined}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{!title ? "Confirmation" : title}</DialogTitle>
        </DialogHeader>
        <div className="my-3">{!message ? "Data will be permanently lost, Are you sure you want to do this action?" : message}</div>
        <div className="mt-3 flex justify-between items-center gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>Cancel</Button>
          <Button variant={action === "delete" ? "destructive" : "default"} onClick={() => onConfirm([])}  disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> } Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )}
  
  export default ModalConfirm