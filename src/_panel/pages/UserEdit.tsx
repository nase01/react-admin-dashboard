import { useParams } from "react-router-dom";
import UserForm from "../forms/UserForm"

const UserEdit = () => {
	const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Edit User</h2>
      <div className="mt-3 max-w-[500px]">
				{ id && <UserForm userId={id} /> }
      </div>
    </div>
  )
}

export default UserEdit