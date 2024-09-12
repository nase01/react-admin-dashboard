import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons";
import { useModalDeleteIsOpen, useModalIsLoading } from "@/components/ToggleProvider";

interface BtnDeleteUserProps {
  onConfirm: (ids: string[]) => void;
  isDeleting: boolean;
	message: string;
}

const BtnDeleteUser: React.FC<BtnDeleteUserProps> = ({ onConfirm, isDeleting, message }) => {
  const { modalDeleteIsOpen, setModalDeleteIsOpen } = useModalDeleteIsOpen();
  const { modalIsLoading } = useModalIsLoading();

  const handleClose = () => {
    setModalDeleteIsOpen(false);
  };

  return (
    <Dialog open={modalDeleteIsOpen} onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) => !modalIsLoading && setModalDeleteIsOpen(open)}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="my-3">{!message ? "Your data will be permanently lost, Are you sure you want to do this action?" : message}</div>
        <div className="mt-3 flex justify-between items-center gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>Cancel</Button>
          <Button variant="destructive" onClick={() => onConfirm([])}  disabled={isDeleting}>
            {isDeleting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> } Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BtnDeleteUser