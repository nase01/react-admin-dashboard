import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";

interface BtnDeleteUserProps {
  onClick: () => void;
  isDeleting: boolean;
}

const BtnDeleteUser: React.FC<BtnDeleteUserProps> = ({ onClick, isDeleting }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isDeleting) {
      setIsOpen(false);
    }
  }, [isDeleting]);
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) => !isDeleting && setIsOpen(open)}>
      <DialogTrigger className="rounded-button border border-input bg-background hover:bg-accent hover:text-accent-foreground" onClick={() => setIsOpen(true)} disabled={isDeleting}>
        <Trash className="text-red-700" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <div>Your data will be permanently lost, Are you sure you want to do this action?</div>
        <div className="mt-3 flex justify-between items-center gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>Cancel</Button>
          <Button variant="destructive" onClick={onClick}  disabled={isDeleting}>
            {isDeleting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> } Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BtnDeleteUser