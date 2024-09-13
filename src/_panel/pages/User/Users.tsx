import { useState } from "react";
import { User } from "@/types";
import { UserPlus2, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetUsers, useGetUsersCount, useDeleteUsers } from "@/lib/react-query/queries";

import Loader2 from "@/components/shared/Loader2";
import Pagination from '@/components/shared/Pagination';
import { toastConfig } from "@/constants";
import toast from "react-hot-toast";
import { Heading } from "@/components/Heading";
import ModalUser from "@/components/ModalUser";
import { useModalConfirmIsOpen, useModalIsOpen } from "@/components/ToggleProvider";

import { columns } from "@/_panel/pages/User/Columns";
import { DataTable } from "@/components/shared/DataTable";
import DialogConfirm from "@/components/shared/ModalConfirm";
import ModalConfirm from "@/components/shared/ModalConfirm";

const Users = () => {
  const perPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { modalIsOpen, setModalIsOpen } = useModalIsOpen();
  const { modalConfirmIsOpen, setModalConfirmIsOpen } = useModalConfirmIsOpen();
  
  const { data: usersData, isLoading: isfetchingUsersData } = useGetUsers(perPage, currentPage);
  const { data: usersCount, isLoading: isfetchingUsersCount } = useGetUsersCount();
  const { mutateAsync: deleteUsers, isPending: isDeleting } = useDeleteUsers();

  if (isfetchingUsersData || isfetchingUsersCount) return <Loader2 />;

  const data = usersData as User[];
  const totalUsersCount = usersCount?.count || 0;
  const totalPages = Math.ceil(totalUsersCount / perPage);

  const handleDeleteUser = async (ids: string[]) => {
    const response = await deleteUsers(ids)
    
    if (response?.errors) {
      toast.error(response.errors[0].detail, toastConfig);
      return;
    }

    toast.success("User successfully deleted", toastConfig);
    setModalConfirmIsOpen(false);
  };

  const openModal = (user?: User) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const openModalConfirm = (ids: string[], user?: User) => {
    setSelectedIds(ids);
    setSelectedUser(user);
    setModalConfirmIsOpen(true);
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
      <div className="py-10">
        <DataTable 
          columns={columns(openModal, openModalConfirm)} 
          data={data}
        />
      </div>
      {modalIsOpen && (
        <ModalUser
          userId={selectedUser?.id}
          userData={selectedUser}
          userAction={selectedUser ? "user-edit" : "user-create"}
        />
      )}

      {modalConfirmIsOpen && (
        <ModalConfirm
          title={selectedUser ? `Delete User ${selectedUser.name}` : "Delete Selected User's"} 
          message="This data will be permanently lost, Are you sure you want to do this action?"
          onConfirm={() => handleDeleteUser(selectedIds)}
          isLoading={isDeleting}
          action="delete"
        />
      )}

    </>
  )
}

export default Users;
