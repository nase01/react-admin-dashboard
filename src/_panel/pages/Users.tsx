import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types";
import { Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetUsers, useGetUsersCount, useDeleteUsers } from "@/lib/react-query/queries";


import Loader from "@/components/shared/Loader";
import Pagination from '@/components/shared/Pagination';
import { toast } from "@/components/ui/use-toast";

const Users = () => {
  const navigate = useNavigate();

  const perPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const { data: usersData, isLoading: isfetchingUsersData } = useGetUsers(perPage, currentPage);
  const { data: usersCount, isLoading: isfetchingUsersCount } = useGetUsersCount();
  const { mutateAsync: deleteUsers, isPending: isDeleting } = useDeleteUsers();

  if (isfetchingUsersData || isfetchingUsersCount) return <Loader />;

  const data = usersData as User[];
  const totalUsersCount = usersCount?.count || 0;
  const totalPages = Math.ceil(totalUsersCount / perPage);

  const goToUsersCreate = () => {
    navigate('/panel/users/create');
  }

  const handleDeleteUser = async (ids: string) => {
    
    const response = await deleteUsers([ids])
    
    if (response?.errors) {
      toast({ title: response.errors[0].detail });
      return;
    }

    toast({ title: "User successfully delete" });
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Users</h2>
      <div className="mt-3 max-w-[500px]">

        <div className="text-right items-center">
          <Button type="button" onClick={goToUsersCreate} size="sm">New</Button>
        </div>

        {data?.map((user: User) => (
          <div key={user.id} className="flex justify-between items-center my-2 bg-slate-100 border border-slate-200 p-3 rounded-lg">
            <div className="text-xl">{user.name} ({user.role})</div>
            <div className="flex space-x-2">
              <Button
                onClick={() => window.location.href = `/panel/users/edit/${user.id}`} 
                disabled={isDeleting} 
                className="rounded-button" 
                variant="outline" size="icon">
                  <Pencil className="text-green-700"  />
              </Button>
              <Button onClick={() => handleDeleteUser(user.id)} 
                disabled={isDeleting} 
                className="rounded-button" 
                variant="outline" 
                size="icon">
                  <Trash className="text-red-700"/>
              </Button>
            </div>
          </div>
        ))}

        {totalPages > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}
      </div>
    </div>
  )
}

export default Users;
