import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { useEffect } from "react";
import { updatePageTitle } from "@/lib/utils";

const Unauthorized = () => {
	const navigate = useNavigate();
	const location = useLocation();

  const handleBackToDashboard = () => {
    navigate('/panel/dashboard');
  }

	useEffect(() => {
    updatePageTitle(location); 
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 w-full">
			<div className="m-5 p-10 max-w-[650px] bg-white border border-red-700 shadow-lg rounded-lg">
				<h2 className="mb-5 text-lg font-bold text-red-700">Unauthorized</h2>
				You do not have the right access to view the page you want to visit, Please contact your administrator if you believe this is an error.
				<div className="mt-10">
					<Button size="sm" onClick={handleBackToDashboard}>
						<ArrowLeftCircle className="mr-2 text-red-300" size={16} /> Back to Dashboard
					</Button>
				</div>
			</div>
    </div>
  )
}

export default Unauthorized