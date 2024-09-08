import { useParams } from "react-router-dom";
import UserForm from "../forms/UserForm"
import { useGetUserById } from "@/lib/react-query/queries";
import Loader2 from "@/components/shared/Loader2";


const UserEdit = () => {
	const { id } = useParams<{ id: string }>();
  
  const userId = id || ""

	const { data: userData, isLoading: isFetchingUserData } = id 
	? useGetUserById(id) 
	: { data: undefined, isLoading: false };


	if (isFetchingUserData) return <Loader2 />;

  return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Edit User</h2>
      <div className="mt-3 max-w-[500px]">
				{ userData 
          ? <UserForm  userId={userId} userData={userData} userAction="user-edit" /> 
          : "Error: Failed to fetch user data." 
        }
      </div>
    </div>
  )
}

export default UserEdit