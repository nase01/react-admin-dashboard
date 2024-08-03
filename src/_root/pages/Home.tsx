import { Button } from "@/components/ui/button";

const Home = () => {
	
	const navigateToDashboard = () => {
		window.location.href = "/dashboard";
	};

  return (
    <div className="text-center">
			<h1 className="font-bold text-lg">Welcome to Landing Page</h1>
			<Button className="mt-5" onClick={navigateToDashboard}>Go to Dashboard</Button>
    </div>
  )
}

export default Home