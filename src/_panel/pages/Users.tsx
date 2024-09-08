import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types";
import { Pencil, UserPlus2, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetUsers, useGetUsersCount, useDeleteUsers } from "@/lib/react-query/queries";

import Loader2 from "@/components/shared/Loader2";
import Pagination from '@/components/shared/Pagination';
import BtnDeleteUser from "@/components/BtnDeleteUser";
import { toastConfig } from "@/constants";
import toast from "react-hot-toast";
import { Heading } from "@/components/Heading";

const Users = () => {
  const navigate = useNavigate();

  const perPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const { data: usersData, isLoading: isfetchingUsersData } = useGetUsers(perPage, currentPage);
  const { data: usersCount, isLoading: isfetchingUsersCount } = useGetUsersCount();
  const { mutateAsync: deleteUsers, isPending: isDeleting } = useDeleteUsers();

  if (isfetchingUsersData || isfetchingUsersCount) return <Loader2 />;

  const data = usersData as User[];
  const totalUsersCount = usersCount?.count || 0;
  const totalPages = Math.ceil(totalUsersCount / perPage);

  const goToUsersCreate = () => {
    navigate('/panel/users/create');
  }

  const handleDeleteUser = async (ids: string) => {
    
    const response = await deleteUsers([ids])
    
    if (response?.errors) {
      toast.error(response.errors[0].detail, toastConfig);
      return;
    }

    toast.success("User successfully deleted", toastConfig);
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <Heading
          title="Users"
          description="Manage system users"
          icon={Users2}
        />
        <Button onClick={goToUsersCreate} variant="secondary" className="shad-button gap-2">
          <UserPlus2 />
          <span className="max-md:hidden">Add User</span>
        </Button>
      </div>
      
      <div className="mt-10">
        {data?.map((user: User) => (
          <div key={user.id} className="flex justify-between items-center my-3  border border-slate-200 p-3 rounded-lg">
            <div className="text-xl">{user.name} ({user.role})</div>
            <div className="flex space-x-2">
              <Button
                onClick={() => window.location.href = `/panel/users/edit/${user.id}`} 
                disabled={isDeleting} 
                className="rounded-button" 
                variant="outline" size="icon">
                  <Pencil className="text-green-700"  />
              </Button>
              
              <BtnDeleteUser 
                onClick={() => handleDeleteUser(user.id)} 
                isDeleting={isDeleting} 
              />
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
    </>
  )
}

export default Users;
