
import { useState } from "react";
import { Heading } from "@/components/Heading";
import useDebounce from "@/hooks/useDebounce";
import { useGetAdminLogs, useGetAdminLogsCount } from "@/lib/react-query/queries";
import { Logs } from "@/types";
import { BookUser } from "lucide-react";


import CustomPagination from "@/components/CustomPagination";
import { columns } from "@/_panel/pages/Reports/AdminLogs/Columns";
import { DataTable } from "@/components/DataTable";
import { generateLogsExcel } from "@/lib/exporter/excel";

const AdminLogs = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: logsData, isLoading: isfetchingLogs } = useGetAdminLogs(pageSize, currentPage, debouncedSearch);
  const { data: logsCount, isLoading: isfetchingLogsCount } = useGetAdminLogsCount(debouncedSearch);

  const isFetching = isfetchingLogs || isfetchingLogsCount;

  const data = logsData as Logs[] || [];
  const totalLogsCount = logsCount?.count || 0;
  const totalPages = Math.ceil(totalLogsCount / pageSize);

  const handleExportData = (type: string) => {
    if(logsData) {
      
      let title = "RPanel - Admin Logs"; 

      if(type === "excel") {
        generateLogsExcel(title, logsData)
      } else {
        // generateUsersPdf(title, usersData)
      }
    }
  }
  
  return (
    <div>
      <Heading
        title="Admin Logs"
        description="List of user admin activities"
        icon={BookUser}
      />
      <div className="py-10">
        <DataTable 
          columns={columns()}
          data={data}
          search={search}
          setSearch={setSearch}
          isLoading={isFetching}
          exportData={handleExportData}
        />
        <div className="flex items-center justify-between px-2 mt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {
              `Total Records: ${totalLogsCount}` 
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
    </div>
  )
}

export default AdminLogs