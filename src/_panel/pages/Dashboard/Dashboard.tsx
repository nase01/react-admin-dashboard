
import { Heading } from "@/components/Heading";
import UserInfo from "@/components/UserInfo";
import { LayoutDashboard } from "lucide-react";
import { Doughnut, Bar  } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartOptions } from "chart.js";
import { Card } from "@/components/ui/card";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {

  // Data for the donut chart
  const doughnutData = {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        label: "Demo Data",
        data: [25, 20, 30, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // Data for the bar chart
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 500, 2000, 3000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Heading
        title="Dashboard"
        description="System's data summary and analytics"
        icon={LayoutDashboard}
      />
      <div className="py-10">
        <UserInfo />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-md p-5 bg-accent shadow-sm w-full sm:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Distributions</h2>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </Card>
          <Card className="rounded-md p-5 bg-accent shadow-sm w-full sm:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Sales</h2>
            <Bar data={barData} options={barOptions} />
          </Card>
          <Card className="rounded-md p-5 bg-accent shadow-sm w-full">
            <div className="text-lg font-semibold mb-4">Summary</div>
            <div>Total Users: 10</div>
            <div>Total Usage: 4MB</div>
            <div>Total Revenue: 10,000.00</div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard