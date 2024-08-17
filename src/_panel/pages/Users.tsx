
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useGetAllUsers } from "@/lib/react-query/queries";
import { User } from "@/types"
import { Trash, Pencil, ArrowLeft, ArrowRight } from "lucide-react";

const Users = () => {
  const { data, isLoading } = useGetAllUsers();

  if (isLoading)
    return (
      <Loader />
    );

  const users = data as User[];

  return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Users</h2>
      <div className="mt-3 max-w-[500px]">
        <div className="text-right items-center">
          <Button size="sm">New</Button>
        </div>
        {users?.map((user: User) => (
          <div key={user.id} className="flex justify-between items-center my-2 bg-slate-100 border border-slate-200 p-3 rounded-lg">
            <div className="text-xl">{user.name} ({user.role})</div>
            <div className="flex space-x-2">
              <Button className="rounded-button" variant="outline" size="icon">
                <Pencil className="text-green-700"  />
              </Button>
              <Button className="rounded-button" variant="outline" size="icon">
                <Trash className="text-red-700"/>
              </Button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <Button className="rounded-button" variant="outline" size="icon"><ArrowLeft /></Button>
          <Button className="rounded-button" variant="outline" size="icon"><ArrowRight /></Button>
        </div>
      </div>
    </div>
  )
}

export default Users