import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus2 } from "lucide-react";
import { useMobileMenuToggle } from "@/components/ToggleProvider";
import UserForm from "@/_panel/forms/UserForm";
import { UserFormProps } from "@/types";

const ModalUser = ({ userAction = "user-create" } : UserFormProps) => {
	
	const myAction = userAction === "user-create" ? "Create User" 
	: userAction !== "account-edit" ? "Edit User" : "Account Settings";

  const { modalIsOpen, setModalIsOpen } = useMobileMenuToggle();

  return (
    <Dialog open={modalIsOpen} onOpenChange={() => setModalIsOpen(false) } >
      <Button onClick={() => setModalIsOpen(true)} variant="secondary" className="shad-button gap-2">
        <UserPlus2 />
        <span className="max-md:hidden">{myAction}</span>
      </Button>
      <DialogContent className="max-h-full overflow-y-auto my-3">
        <DialogHeader>
          <DialogTitle>
            {myAction}
          </DialogTitle>
        </DialogHeader>
        <UserForm userAction={userAction} />
      </DialogContent>
    </Dialog>
  )
}

export default ModalUser