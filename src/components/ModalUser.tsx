import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, UserPlus2 } from "lucide-react";
import { useModalIsLoading, useModalIsOpen } from "@/components/ToggleProvider";
import UserForm from "@/_panel/forms/UserForm";
import { UserFormProps } from "@/types";

const ModalUser = ({ userId, userData, userAction = "user-create" } : UserFormProps) => {
	
	const myAction = userAction === "user-create" ? "Create User" 
	: userAction !== "account-edit" ? "Edit User" : "Account Settings";

  const { modalIsOpen, setModalIsOpen } = useModalIsOpen();
  const { modalIsLoading } = useModalIsLoading();

  return (
    <Dialog open={modalIsOpen} onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) => !modalIsLoading && setModalIsOpen(open)}>
      {userAction === "user-create" ? (
      <Button onClick={() => setModalIsOpen(true)} variant="secondary" className="shad-button gap-2">
        <UserPlus2 />
        <span className="max-md:hidden">{myAction}</span>
      </Button>
      ) : (
        <Button onClick={() => setModalIsOpen(true)} className="rounded-button" variant="outline" size="icon">
          <Pencil className="text-green-700"  />
        </Button>
      )}
      
      <DialogContent aria-describedby={undefined} className="max-h-full overflow-y-auto my-3">
        <DialogHeader>
          <DialogTitle>
            {myAction}
          </DialogTitle>
        </DialogHeader>
        <UserForm  userId={userId} userData={userData} userAction={userAction} /> 
      </DialogContent>
    </Dialog>
  )
}

export default ModalUser