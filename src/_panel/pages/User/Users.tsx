import { useState } from "react";
import { User } from "@/types";
import { Trash2, UserPlus2, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetUsers, useGetUsersCount, useDeleteUsers } from "@/lib/react-query/queries";

import Loader2 from "@/components/shared/Loader2";
import CustomPagination from "@/components/shared/CustomPagination";
import { toastConfig } from "@/constants";
import toast from "react-hot-toast";
import { Heading } from "@/components/Heading";
import ModalUser from "@/components/ModalUser";
import { useModalConfirmIsOpen, useModalIsOpen } from "@/components/ToggleProvider";

import { columns } from "@/_panel/pages/User/Columns";
import { DataTable } from "@/components/shared/DataTable";
import ModalConfirm from "@/components/shared/ModalConfirm";

const Users = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { modalIsOpen, setModalIsOpen } = useModalIsOpen();
  const { modalConfirmIsOpen, setModalConfirmIsOpen } = useModalConfirmIsOpen();
  
  const { data: usersData, isLoading: isfetchingUsersData } = useGetUsers(pageSize, currentPage);
  const { data: usersCount, isLoading: isfetchingUsersCount } = useGetUsersCount();
  const { mutateAsync: deleteUsers, isPending: isDeleting } = useDeleteUsers();

  if (isfetchingUsersData || isfetchingUsersCount) return <Loader2 />;
  
  const data = usersData as User[];
  const totalUsersCount = usersCount?.count || 0;
  const totalPages = Math.ceil(totalUsersCount / pageSize);

  const handleDeleteUser = async (ids: string[]) => {
    const response = await deleteUsers(ids)
    
    if (response?.errors) {
      toast.error(response.errors[0].detail, toastConfig);
      return;
    }

    toast.success("User successfully deleted", toastConfig);

    // Clear State
    setModalConfirmIsOpen(false);
    setSelectedIds([]);
    setSelectedUser(undefined);
  };

  // Open ModalUser
  const openModal = (user?: User) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  // Open ModelConfirm
  const openModalConfirm = (ids: string[], user?: User) => {
    setSelectedIds(ids);
    setSelectedUser(user);
    setModalConfirmIsOpen(true);
  };

  const getCheckedRows = (id: string) => {
    if (id === "") {
      setSelectedIds([]); 
    } else {
      setSelectedIds((prevSelectedIds) => {
        if (prevSelectedIds.includes(id)) {
          return prevSelectedIds.filter((selectedId) => selectedId !== id); 
        } else {
          return [...prevSelectedIds, id]; 
        }
      });
    }
  }

  console.log(pageSize)
  
  return (
    <>
      <div className="flex justify-between items-start">
        <Heading
          title="Users"
          description="Manage system users"
          icon={Users2}
        />
        <div className="flex gap-2">
          <Button onClick={() => openModal()} variant="secondary" className="shad-button gap-2">
            <UserPlus2 className="w-5" />
            <span className="max-md:hidden"> Create User</span>
          </Button>
          <Button  
            variant="secondary" 
            disabled={selectedIds.length === 0} 
            onClick={() => openModalConfirm(selectedIds)}
            className="shad-button gap-2">
            <Trash2 className="text-danger hover:text-danger w-5" />
          </Button>
        </div>
      </div>
      <div className="py-10">
        <DataTable 
          columns={columns(openModal, openModalConfirm, getCheckedRows)} 
          data={data}
        />
        <div className="flex items-center justify-between px-2 mt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {
              `Total Users: ${totalUsersCount} ${selectedIds.length > 0 
              ? "(" + selectedIds.length + " Selected)" : "" }`  
            }
          </div>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onSizeChange={setPageSize}
          />
        </div>
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
          title={selectedUser ? `Delete User ${selectedUser.name}` : "Bulk Delete"} 
          message={selectedUser 
            ? "This data will be permanently lost, Are you sure you want to do this action?" 
            : `You have selected ${selectedIds.length} user(s) for deletion, and their data will be permanently lost. Are you sure you want to proceed?`} 
          onConfirm={() => handleDeleteUser(selectedIds)}
          isLoading={isDeleting}
          action="delete"
        />
      )}

    </>
  )
}

export default Users;
