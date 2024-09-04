import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import ChangePWForm from "../forms/ChangePWForm";

const AccountPWChange = () => {
  const { data: currentUser } = useGetCurrentUser();

	if (!currentUser) return <Loader />;
  
	return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Password Change</h2>
      <div className="mt-3 max-w-[500px]">
				{ currentUser 
          ? <ChangePWForm  /> 
          : "Error: Failed to fetch user data." 
        }
      </div>
    </div>
  )
}

export default AccountPWChange