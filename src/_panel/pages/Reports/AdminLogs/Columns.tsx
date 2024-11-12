import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import { Logs } from "@/types";
import moment from 'moment';

export const columns = (): ColumnDef<Logs>[] => [
  {
    accessorKey: "info",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Log Info" />
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
  }
];
