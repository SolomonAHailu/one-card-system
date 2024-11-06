import Navbar from "@/components/common/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
