
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Dashboard = () => {
  const { data: currentUser } = useGetCurrentUser();
  
  if (!currentUser)
    return (
      <Loader />
    );

  return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Dashboard</h2>
      <div className="mt-3">Welcome {currentUser.name} ({currentUser.role})</div>
    </div>
  )
}

export default Dashboard