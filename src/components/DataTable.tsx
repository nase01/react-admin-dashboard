import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import Loader from "@/components/shared/Loader";
import Tooltip from "@/components/shared/Tooltip";
import { DataTableViewOptions } from "./DataTableViewOptions";
// import { DataTablePagination } from "./DataTablePagination";
import { Button } from "./ui/button";
import { Download } from "lucide-react";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  checkedRows?: String[],
  search: string; 
  setSearch: (value: string) => void;
  isLoading: Boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  checkedRows,
  search,
  setSearch,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search name or email..."
            value={search} // Bind to the search input
            onChange={(event) => setSearch(event.target.value)} // Update search state
            className="h-8 w-[150px] lg:w-[250px] shad-input"
          />
        </div>
        <DataTableViewOptions table={table} />
        <Tooltip message="Export Data">
          <Button  variant="ghost" size="sm"  className="ml-auto h-8 lg:flex">
            <Download className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="bg-muted/70 hover:bg-muted/80" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={checkedRows && checkedRows.includes((row.original as { id: string }).id ) ? "selected" : undefined }
                  data-row-index={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-2" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isLoading ? <Loader /> : search !== "" ? `No search results for ${search}` : "No results." }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {
        // Client-Side Pagination
        // <DataTablePagination table={table} />
      }
    </div>
  );
}
