
import { Heading } from "@/components/Heading";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <Heading
        title="Dashboard"
        description="System's data summary and analytics"
        icon={LayoutDashboard}
      />
    </div>
  )
}

export default Dashboard