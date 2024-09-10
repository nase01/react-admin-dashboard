import { useState } from "react";
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
import ModalUser from "@/components/ModalUser";
import { useModalIsOpen } from "@/components/ToggleProvider";

const Users = () => {
  const perPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const { modalIsOpen, setModalIsOpen } = useModalIsOpen();
  const { data: usersData, isLoading: isfetchingUsersData } = useGetUsers(perPage, currentPage);
  const { data: usersCount, isLoading: isfetchingUsersCount } = useGetUsersCount();
  const { mutateAsync: deleteUsers, isPending: isDeleting } = useDeleteUsers();

  if (isfetchingUsersData || isfetchingUsersCount) return <Loader2 />;

  const data = usersData as User[];
  const totalUsersCount = usersCount?.count || 0;
  const totalPages = Math.ceil(totalUsersCount / perPage);

  const handleDeleteUser = async (ids: string) => {
    
    const response = await deleteUsers([ids])
    
    if (response?.errors) {
      toast.error(response.errors[0].detail, toastConfig);
      return;
    }

    toast.success("User successfully deleted", toastConfig);
  };

  const openModal = (user?: User) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <Heading
          title="Users"
          description="Manage system users"
          icon={Users2}
        />
        <Button onClick={() => openModal()} variant="secondary" className="shad-button gap-2">
          <UserPlus2 />
          <span className="max-md:hidden"> Create User</span>
        </Button>
      </div>
      
      <div className="mt-10">
        {data?.map((user: User) => (
          <div key={user.id} className="flex justify-between items-center my-3  border border-slate-200 p-3 rounded-lg">
            <div className="text-xl">{user.name} ({user.role})</div>
            <div className="flex space-x-2">
              <Button onClick={() => openModal(user)} className="rounded-button" variant="outline" size="icon">
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

      {modalIsOpen && (
        <ModalUser
          userId={selectedUser?.id}
          userData={selectedUser}
          userAction={selectedUser ? "user-edit" : "user-create"}
        />
      )}

    </>
  )
}

export default Users;
