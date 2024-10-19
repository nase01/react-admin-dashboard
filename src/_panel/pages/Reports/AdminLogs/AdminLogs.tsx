
import { Heading } from "@/components/Heading";
import { BookUser } from "lucide-react";

const AdminLogs = () => {
  return (
    <div>
      <Heading
        title="Admin Logs"
        description="List of user admin activities"
        icon={BookUser}
      />
    </div>
  )
}

export default AdminLogs