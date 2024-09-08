import UserForm from "../forms/UserForm"
import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import { Heading } from "@/components/Heading";
import { UserCog2 } from "lucide-react";

const AccountSettings = () => {
  const { data: currentUser } = useGetCurrentUser();

	if (!currentUser) return <Loader />;

  return (
    <div>
      <Heading
        title="Account Settings"
        description="Update your account informations"
        icon={UserCog2}
      />
      <div className="mt-10 max-w-[1050px]">
				{ currentUser 
          ? <UserForm  userId={currentUser.id} userData={currentUser} userAction="account-edit" /> 
          : "Error: Failed to fetch user data." 
        }
      </div>
    </div>
  )
}

export default AccountSettings