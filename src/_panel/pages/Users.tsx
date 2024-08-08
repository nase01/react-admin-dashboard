
import Loader from "@/components/shared/Loader";
import { useGetAllUsers } from "@/lib/react-query/queries";
import { User } from "@/types"

const Users = () => {
  const { data: usersData, isLoading } = useGetAllUsers();

  if (isLoading)
    return (
      <Loader />
    );

  const users = usersData as User[];

  return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Users</h2>
      <div className="mt-3">
        {users?.map((user: User) => (
          <div key={user.id} className="user-item">
            * {user.name}
          </div>
        )) || "Failed to Fetch or Unauthorized"}
      </div>
    </div>
  )
}

export default Users