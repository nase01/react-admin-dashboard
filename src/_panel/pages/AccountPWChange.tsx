import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import ChangePWForm from "../forms/ChangePWForm";

const AccountPWChange = () => {
  const { data: currentUser } = useGetCurrentUser();

	if (!currentUser) return <Loader />;
  
	return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Password Change</h2>
      <div className="mt-3 max-w-[550px]">  
      
        {currentUser && currentUser.pwForceChange && (
          <div className="mt-2 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            You are required to change your password to continue using this panel.
          </div>
        )}

        { currentUser 
          ? <ChangePWForm  /> 
          : "Error: Failed to fetch user data." 
        }
      </div>
    </div>
  )
}

export default AccountPWChange