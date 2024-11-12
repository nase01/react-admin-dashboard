
import { Heading } from "@/components/Heading";
import UserInfo from "@/components/UserInfo";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <Heading
        title="Dashboard"
        description="System's data summary and analytics"
        icon={LayoutDashboard}
      />
      <div className="py-10">
        <UserInfo />
      </div>
    </div>
  )
}

export default Dashboard