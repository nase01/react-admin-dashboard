import UserForm from "../forms/UserForm"
import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";

const AccountSettings = () => {
  const { data: currentUser } = useGetCurrentUser();

	if (!currentUser) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Account Settings</h2>
      <div className="mt-3 max-w-[500px]">
				{ currentUser 
          ? <UserForm  userId={currentUser.id} userData={currentUser} userAction="account-edit" /> 
          : "Error: Failed to fetch user data." 
        }
      </div>
    </div>
  )
}

export default AccountSettings