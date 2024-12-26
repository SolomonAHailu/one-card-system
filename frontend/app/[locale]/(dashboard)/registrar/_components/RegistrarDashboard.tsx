// "use client";
// import { Skeleton } from "@/components/ui/skeleton";
// import { RootState } from "@/store";
// import { handleGetDashboardInformationForStudent } from "@/store/slices/registrarSlice/students";
// import { CreditCard, UserCheck, UserX, XCircle } from "lucide-react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Card from "@/components/registrarDashboard/Card";
// import { RadarGraph } from "@/components/registrarDashboard/RadarGraph";
// import { BarGraph } from "@/components/registrarDashboard/BarChart";

// const RegistrarDashboardData = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch<any>(handleGetDashboardInformationForStudent());
//   }, [dispatch]);

//   const { studentDataForDashboard, isStudentLoading } = useSelector(
//     (state: RootState) => state.student
//   );

//   const cardData = [
//     {
//       label: "Active Students",
//       amount:
//         studentDataForDashboard?.studentsByCategory
//           ?.find((item) => item.category === "Active Students")
//           ?.count?.toString() || "0",
//       description: "Total number of active students.",
//       icon: UserCheck,
//     },
//     {
//       label: "Inactive Students",
//       amount:
//         studentDataForDashboard?.studentsByCategory
//           ?.find((item) => item.category === "Inactive Students")
//           ?.count?.toString() || "0",
//       description: "Total number of inactive students.",
//       icon: UserX,
//     },
//     {
//       label: "Students with Cards",
//       amount:
//         studentDataForDashboard?.studentsByCategory
//           ?.find((item) => item.category === "Students with Cards")
//           ?.count?.toString() || "0",
//       description: "Total number of students with cards.",
//       icon: CreditCard,
//     },
//     {
//       label: "Students without Cards",
//       amount:
//         studentDataForDashboard?.studentsByCategory
//           ?.find((item) => item.category === "Students without Cards")
//           ?.count?.toString() || "0",
//       description: "Total number of students without cards.",
//       icon: XCircle,
//     },
//   ];

//   const pieData =
//     studentDataForDashboard?.studentsByCategory?.map(
//       (student: { category: any; count: any }) => ({
//         name: student.category
//           .replace("Active Students", "Active")
//           .replace("Inactive Students", "Inactive")
//           .replace("Students with Cards", "WithCards")
//           .replace("Students without Cards", "WithoutCards"),
//         total: student.count,
//       })
//     ) || [];

//   const studentsByCategory = studentDataForDashboard?.studentsByCategory || [];

//   const chartConfig =
//     studentsByCategory.reduce((config, student, index) => {
//       if (student && student.category) {
//         const name = student.category
//           .replace("Active Students", "Active")
//           .replace("Inactive Students", "Inactive")
//           .replace("Students with Cards", "With Cards")
//           .replace("Students without Cards", "Without Cards");

//         config[name.toLowerCase().replace(" ", "_")] = {
//           label: name,
//           color: `hsl(var(--chart-${index + 1}))`,
//         };
//       }
//       return config;
//     }, {} as Record<string, { label: string; color: string }>) || {};

//   const chartData = studentsByCategory
//     .map((student, index) => {
//       if (student && student.category && typeof student.count === "number") {
//         return {
//           name: student.category
//             .replace("Active Students", "Active")
//             .replace("Inactive Students", "Inactive")
//             .replace("Students with Cards", "With Cards")
//             .replace("Students without Cards", "Without Cards"),
//           total: student.count,
//           fill: `hsl(var(--chart-${index + 1}))`,
//         };
//       }
//       return null; // Keep this line for incomplete data handling
//     })
//     .filter(
//       (item): item is { name: string; total: number; fill: string } =>
//         item !== null
//     ); // Narrow down type

//   return (
//     <div>
//       {isStudentLoading ? (
//         <div className="grid grid-cols-2 gap-2">
//           {Array.from({ length: 4 }).map((_, index) => (
//             <Skeleton
//               key={index}
//               className="col-span-1 rounded-sm bg-secondary/60 h-36"
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col gap-5 w-full">
//           <h2></h2> {/*  for the space between */}
//           <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
//             {cardData.map((data, index) => (
//               <Card
//                 key={index}
//                 label={data.label}
//                 amount={data.amount}
//                 description={data.description}
//                 icon={data.icon}
//               />
//             ))}
//           </section>
//           <h2></h2>
//           <section className="grid grid-cols-1 gap-4 tranasition-all lg:grid-cols-2">
//             <BarGraph
//               chartData={chartData}
//               chartConfig={chartConfig}
//               title="Distribution of Students"
//             />
//             <RadarGraph
//               pieData={pieData}
//               title="Student Categories Overview"
//               desc="Students categorized"
//             />
//           </section>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegistrarDashboardData;
///////////////
///////////////
///////////////
///////////////
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { handleGetDashboardInformationForStudent } from "@/store/slices/registrarSlice/students";
import { CreditCard, UserCheck, UserX, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/registrarDashboard/Card";
import { RadarGraph } from "@/components/registrarDashboard/RadarGraph";
import { BarGraph } from "@/components/registrarDashboard/BarChart";

// Helper to extract student category data
const getCardData = (studentsByCategory: any[]) => [
  {
    label: "Active Students",
    amount:
      studentsByCategory
        .find((item) => item.category === "Active Students")
        ?.count?.toString() || "0",
    description: "Total number of active students.",
    icon: UserCheck,
  },
  {
    label: "Inactive Students",
    amount:
      studentsByCategory
        .find((item) => item.category === "Inactive Students")
        ?.count?.toString() || "0",
    description: "Total number of inactive students.",
    icon: UserX,
  },
  {
    label: "Students with Cards",
    amount:
      studentsByCategory
        .find((item) => item.category === "Students with Cards")
        ?.count?.toString() || "0",
    description: "Total number of students with cards.",
    icon: CreditCard,
  },
  {
    label: "Students without Cards",
    amount:
      studentsByCategory
        .find((item) => item.category === "Students without Cards")
        ?.count?.toString() || "0",
    description: "Total number of students without cards.",
    icon: XCircle,
  },
];

// Helper to format chart data
const formatChartData = (studentsByCategory: any[]) =>
  studentsByCategory.map((student, index) => ({
    name: student.category
      .replace("Active Students", "Active")
      .replace("Inactive Students", "Inactive")
      .replace("Students with Cards", "With Cards")
      .replace("Students without Cards", "Without Cards"),
    total: student.count,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

// Helper to generate chart configuration
const generateChartConfig = (studentsByCategory: any[]) =>
  studentsByCategory.reduce((config, student, index) => {
    const name = student.category
      .replace("Active Students", "Active")
      .replace("Inactive Students", "Inactive")
      .replace("Students with Cards", "With Cards")
      .replace("Students without Cards", "Without Cards");
    config[name.toLowerCase().replace(" ", "_")] = {
      label: name,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {} as Record<string, { label: string; color: string }>);

const RegistrarDashboardData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(handleGetDashboardInformationForStudent());
  }, [dispatch]);

  const { studentDataForDashboard, isStudentLoading } = useSelector(
    (state: RootState) => state.student
  );

  const studentsByCategory = studentDataForDashboard?.studentsByCategory || [];
  const cardData = getCardData(studentsByCategory);
  const chartData = formatChartData(studentsByCategory);
  const chartConfig = generateChartConfig(studentsByCategory);

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div>
      {isStudentLoading ? (
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
              chartData={chartData}
              chartConfig={chartConfig}
              title="Distribution of Students"
              desc={`As of ${formattedDate}`}
            />
            <RadarGraph
              pieData={chartData}
              title="Student Categories Overview"
              desc={`As of ${formattedDate}`}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default RegistrarDashboardData;
