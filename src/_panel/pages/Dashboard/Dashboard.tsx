
import UserInfo from "@/components/UserInfo";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, ChartOptions } from "chart.js";
import { Card } from "@/components/ui/card";
import { useGetUsersCount } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import { numberFormat } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  const { data: usersCount, isLoading: isfetchingUsersCount } = useGetUsersCount();
  console.log(usersCount)
  // Data for the donut chart
  const doughnutData = {
    labels: ["Memory", "CPU", "Storage"],
    datasets: [
      {
        data: [12, 30, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
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
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || ""; // Get the dataset label
            const value = context.raw; // The value for the current slice
            return `${datasetLabel}: ${value} MB`;
          },
        },
      },
    },
  };

  // Calculate the total revenue (sum of lineData's data array)
  const totalUsage = doughnutData.datasets[0].data.reduce((sum, value) => sum + value, 0);

   // Data for the line chart
   const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 500, 2000, 3000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 0.6)",
        pointRadius: 5,
        tension: 0.4, // Makes the line slightly curved
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
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

  // Calculate the total revenue (sum of lineData's data array)
  const totalRevenue = lineData.datasets[0].data.reduce((sum, value) => sum + value, 0);

  return (
    <div>
      <div className="pb-10">
        <UserInfo />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-md p-5 bg-accent shadow-sm w-full sm:col-span-1">
            <div className="text-lg font-semibold mb-4 border-b pb-2 text-primary dark:text-white">
              Data Usage
            </div>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </Card>
          <Card className="rounded-md p-5 bg-accent shadow-sm w-full ">
            <div className="text-lg font-semibold mb-4 border-b pb-2 text-primary dark:text-white">
              Summary
            </div>
            {isfetchingUsersCount  ? <Loader  /> : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Users:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{usersCount?.count}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Usage:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{`${totalUsage} MB`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Revenue:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{numberFormat(totalRevenue)}</span>
                </div>
              </>
            )}
          </Card>
          <Card className="rounded-md p-5 bg-accent shadow-sm w-full sm:col-span-2">
            <div className="text-lg font-semibold mb-4 border-b pb-2 text-primary dark:text-white">
              Sales
            </div>
            <Line data={lineData} options={lineOptions} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard