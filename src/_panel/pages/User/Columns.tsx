import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "@/components/DataTableHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types";
import moment from "moment";

export const columns = (
  openModal: (user?: User) => void,
  openModalConfirm: (id: string[], user?: User) => void,
  getCheckedRows: (id: string) => void,
  selectedIds: string | string[]
): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          /* 
            Clearing getCheckedRows before selecting all rows, 
            you're ensuring that the previous selections are reset, 
            and then you accurately pass the selected rows again after 
            toggling the "Select All" checkbox.
          */
          getCheckedRows(""); 
          
          setTimeout(() => {
            table.getSelectedRowModel().rows.map((row) => getCheckedRows(row.original.id));
          }, 0);

        }}
        aria-label="Select all"
        className="translate-y-[2px] shad-checkbox"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.id)}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value)
          getCheckedRows(row.original.id)
        }}
        aria-label="Select row"
        className="translate-y-[2px] shad-checkbox"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => {
      return moment(row.original.createdAt).format("YYYY-MM-DD HH:mm:ss");
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer"
              onClick={() => openModal(rowData)}>
							<Edit className="mr-2 w-4 text-main"/> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"
              onClick={() => openModalConfirm([rowData.id], rowData)}>
              <Trash className="mr-2 w-4 text-danger"/> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
