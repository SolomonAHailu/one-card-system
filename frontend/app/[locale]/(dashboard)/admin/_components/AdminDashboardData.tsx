"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { handleGetDashboardInformation } from "@/store/slices/adminSlice/user";
import { Users2, Shield, KeyRound, Monitor } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card, { CardProps } from "@/components/adminDashboard/Card";
import { BarGraph } from "@/components/adminDashboard/BarGraph";
import { RadarGraph } from "@/components/adminDashboard/RadarGraph";

// Helper to generate bar chart data
const formatBarChartData = (usersByRole: any[]) =>
  usersByRole.map((item, index) => ({
    name: item.role_name,
    total: item.count,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

// Helper to generate bar chart config
const generateBarChartConfig = (usersByRole: any[]) =>
  usersByRole.reduce((config, item, index) => {
    config[item.role_name.toLowerCase().replace(" ", "_")] = {
      label: item.role_name,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {} as Record<string, { label: string; color: string }>);

// Utility function to get card data
const getCardData = (userDashboardData: any): CardProps[] => {
  return [
    {
      label: "Total Users",
      amount: userDashboardData?.totalUsers?.toString() || "0",
      description: "Total number of users.",
      icon: Users2,
    },
    {
      label: "Total Roles",
      amount: userDashboardData?.totalRoles?.toString() || "0",
      description: "Total number of roles.",
      icon: Shield,
    },
    {
      label: "Total Permissions",
      amount: userDashboardData?.totalPermissions?.toString() || "0",
      description: "Total number of permissions.",
      icon: KeyRound,
    },
    {
      label: "Total Devices",
      amount: userDashboardData?.totalDevices?.toString() || "0",
      description: "Total number of devices.",
      icon: Monitor,
    },
  ];
};

const AdminDashboardData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(handleGetDashboardInformation());
  }, [dispatch]);

  const { userDashboardData, isUserLoading } = useSelector(
    (state: RootState) => state.user
  );

  // Use the utility function to get card data
  const cardData = getCardData(userDashboardData);
  const usersByRole = userDashboardData?.usersByRole || [];
  const barChartData = formatBarChartData(usersByRole);
  const barChartConfig = generateBarChartConfig(usersByRole);

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div>
      {isUserLoading ? (
        <div className="flex flex-col gap-5 w-full">
          <h2></h2> {/* for the space between */}
          <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
            {/* Skeletons for cards */}
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="col-span-1 rounded-lg bg-secondary/60 h-36"
              />
            ))}
          </section>
          <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
            {/* Skeletons for graphs */}
            <Skeleton className="rounded-lg bg-secondary/60 h-96" />
            <Skeleton className="rounded-lg bg-secondary/60 h-96" />
          </section>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full">
          <h2></h2> {/* for the space between */}
          <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
            {cardData.map((data, index) => (
              <Card
                key={index}
                label={data.label}
                amount={data.amount}
                description={data.description}
                icon={data.icon}
              />
            ))}
          </section>
          <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
            <BarGraph
              chartData={barChartData}
              chartConfig={barChartConfig}
              title="User Role Distribution"
              desc={`As of ${formattedDate}`}
            />
            <RadarGraph
              pieData={barChartData}
              title="Student Categories Overview"
              desc={`As of ${formattedDate}`}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardData;
