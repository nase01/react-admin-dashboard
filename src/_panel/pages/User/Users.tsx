import { useEffect, useState } from "react";
import { User } from "@/types";
import { Trash2, UserPlus2, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetUsers, useGetUsersCount, useDeleteUsers } from "@/lib/react-query/queries";

import CustomPagination from "@/components/shared/CustomPagination";
import { toastConfig } from "@/constants";
import toast from "react-hot-toast";
import { Heading } from "@/components/Heading";
import ModalUser from "@/components/ModalUser";
import { useModalConfirmIsOpen, useModalIsOpen } from "@/components/ToggleProvider";

import { columns } from "@/_panel/pages/User/Columns";
import { DataTable } from "@/components/shared/DataTable";
import ModalConfirm from "@/components/shared/ModalConfirm";
import useDebounce from "@/hooks/useDebounce";
import Tooltip from "@/components/shared/Tooltip";

const Users = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { modalIsOpen, setModalIsOpen } = useModalIsOpen();
  const { modalConfirmIsOpen, setModalConfirmIsOpen } = useModalConfirmIsOpen();
  
  const { data: usersData, isLoading: isfetchingUsersData } = useGetUsers(pageSize, currentPage, debouncedSearch);
  const { data: usersCount, isLoading: isfetchingUsersCount } = useGetUsersCount(debouncedSearch);
  const { mutateAsync: deleteUsers, isPending: isDeleting } = useDeleteUsers();
 
  useEffect(() => {
    if (!modalConfirmIsOpen) {
      setSelectedIds([]);
    }
  }, [modalConfirmIsOpen]);

  const isFetching = isfetchingUsersData || isfetchingUsersCount;
  
  const data = usersData as User[] || [];
  const totalUsersCount = usersCount?.count || 0;
  const totalPages = Math.ceil(totalUsersCount / pageSize);

  const handleDeleteUser = async (ids: string[]) => {
    const response = await deleteUsers(ids)
    
    if (response?.errors) {
      toast.error(response.errors[0].detail, toastConfig);
      return;
    }

    toast.success("User successfully deleted", toastConfig);

    // Reset states after deletion
    setModalConfirmIsOpen(false);
    setSelectedIds([]);
    setSelectedUser(undefined);
  };

  // Open ModalUser for Creating and Editing
  const openModal = (user?: User) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  // Open ModalConfirm for Deletion
  const openModalConfirm = (ids: string[], user?: User) => {
    setSelectedIds(ids);
    setSelectedUser(user);
    setModalConfirmIsOpen(true);
  };

  // Add or Remove checked rows data id to the selectedIds 
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

  return (
    <>
      <div className="flex justify-between items-start">
        <Heading
          title="Users"
          description="Manage system users"
          icon={Users2}
        />
        <div className="flex gap-2">
          <Tooltip message={"Create User"}>
            <Button onClick={() => openModal()} variant="secondary" className="shad-button gap-2">
              <UserPlus2 className="w-5" />
              <span className="max-md:hidden"> Create User</span>
            </Button>
          </Tooltip>
          <Tooltip message={"Delete User(s)"}>
            <Button  
              variant="secondary" 
              disabled={selectedIds.length === 0} 
              onClick={() => openModalConfirm(selectedIds)}
              className="shad-button gap-2">
              <Trash2 className="text-danger hover:text-danger w-5" />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="py-10">
        <DataTable 
          columns={columns(openModal, openModalConfirm, getCheckedRows, selectedIds)} 
          checkedRows={selectedIds}
          data={data}
          search={search}
          setSearch={setSearch}
          isLoading={isFetching}
        />
        <div className="flex items-center justify-between px-2 mt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {
              `Total Records: ${totalUsersCount} ${selectedIds.length > 0 
              ? "(" + selectedIds.length + " Selected)" : "" }`  
            }
          </div>

          {/* For server-side pagination */}
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
          title={`Delete User${selectedIds.length > 1 ? "s" : ""}`}
          message={`You have selected ${selectedIds.length} user${selectedIds.length > 1 ? "s" : ""} 
          for deletion, and their data will be permanently lost. Are you sure you want to proceed?`}
          onConfirm={() => handleDeleteUser(selectedIds)}
          isLoading={isDeleting}
          action="delete"
        />
      )}

    </>
  )
}

export default Users;
