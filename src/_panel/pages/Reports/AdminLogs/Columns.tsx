import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import { Logs } from "@/types";

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
    enableSorting: true,
    enableHiding: true
  }
];
