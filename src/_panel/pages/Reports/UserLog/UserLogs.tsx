
import { Heading } from "@/components/Heading";
import { BookUser } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <Heading
        title="User Logs"
        description="Monitor user's activity"
        icon={BookUser}
      />
    </div>
  )
}

export default Dashboard