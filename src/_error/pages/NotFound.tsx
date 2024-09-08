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
		<div className="m-5 p-10 max-w-[650px] border border-red-700 shadow-lg rounded-lg">
			<h2 className="mb-5 text-2xl font-extrabold text-red-700">404</h2>
			It seems the page <b>"{location.pathname}"</b> you want to access  does not exist.
			<div className="mt-10">
				<Button size="sm" onClick={handleBackToDashboard}>
					<ArrowLeftCircle className="mr-2" size={16} /> Back to Dashboard
				</Button>
			</div>
		</div>
  )
}

export default Unauthorized