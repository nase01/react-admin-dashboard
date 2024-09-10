import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
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
      <DialogContent 
      onOpenAutoFocus={(e) => userData && e.preventDefault()}
      aria-describedby={undefined} className="max-h-full overflow-y-auto my-3">
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