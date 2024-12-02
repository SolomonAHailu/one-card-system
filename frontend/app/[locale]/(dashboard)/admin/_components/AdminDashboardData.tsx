"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { handleGetDashboardInformation } from "@/store/slices/adminSlice/user";
import {
  BookOpen,
  Building2,
  DoorOpen,
  NotebookPen,
  UserRoundPlus,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";

// Chart.js imports
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboardData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(handleGetDashboardInformation());
  }, [dispatch]);

  const { userDashboardData, isUserLoading } = useSelector(
    (state: RootState) => state.user
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Prepare data for the pie chart
  const chartData = {
    labels: userDashboardData?.usersByRole.map((item) => item.role_name) || [],
    datasets: [
      {
        label: "Users by Role",
        data: userDashboardData?.usersByRole.map((item) => item.count) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FFA500",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FFA500",
        ],
      },
    ],
  };

  console.log("CHART DATA", chartData);

  return (
    <div>
      {isUserLoading ? (
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="col-span-1 rounded-sm bg-secondary/60 h-36"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {/* User data display */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {chartData.datasets[0].data.map((count, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-3 rounded-sm p-8 h-40"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xl text-[#24377a] font-semibold">
                    {chartData.labels[index]}
                  </p>
                  <div>
                    {chartData.labels[index].toLowerCase() === "admin" ? (
                      <UserRoundPlus size={26} color="#24377a" />
                    ) : chartData.labels[index].toLowerCase() ===
                      "registrar" ? (
                      <NotebookPen size={26} color="#24377a" />
                    ) : chartData.labels[index].toLowerCase() === "gate" ? (
                      <DoorOpen size={26} color="#24377a" />
                    ) : chartData.labels[index].toLowerCase() === "dorm" ? (
                      <Building2 size={26} color="#24377a" />
                    ) : chartData.labels[index].toLowerCase() === "library" ? (
                      <BookOpen size={26} color="#24377a" />
                    ) : null}
                  </div>
                </div>
                <p className="text-lg text-[#24377a] ">
                  {`${count} ${count > 1 ? "users" : "user"}`}
                </p>
              </div>
            ))}
          </div>

          {/* Total user count and pie chart */}
          <div className="flex items-center justify-between mt-6">
            {/* Total user count */}
            <div className="w-1/2 flex items-center rounded-md justify-center gap-x-4 text-[#3a509f]">
              <h3 className="text-4xl font-semibold">Total Users</h3>
              <CountUp
                end={userDashboardData?.totalUsers || 0}
                className="text-4xl font-bold flex items-center min-h-72"
              />
            </div>

            {/* Pie chart */}
            <div className="w-1/2 flex flex-col items-center">
              <h3 className="text-3xl font-semibold mb-2 text-[#3a509f]">
                User Distribution
              </h3>
              <div className="w-full min-h-72">
                {userDashboardData?.usersByRole?.length ?? 0 > 0 ? (
                  <Pie data={chartData} options={options} />
                ) : (
                  <p className="text-sm  text-[#3a509f]">No data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardData;
