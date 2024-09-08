import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader2 from "@/components/shared/Loader2";
import ChangePWForm from "../forms/ChangePWForm";
import { Heading } from "@/components/Heading";
import { LockKeyhole } from "lucide-react";

const AccountPWChange = () => {
  const { data: currentUser } = useGetCurrentUser();

	if (!currentUser) return <Loader2 />;
  
	return (
    <div>
      <Heading
        title="Password Change"
        description="Change your own password"
        icon={LockKeyhole}
      />
      <div className="mt-10 max-w-[1050px]">  
      
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