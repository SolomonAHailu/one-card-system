import { AppSidebar } from "@/components/common/Appsidebar";
import Navbar from "@/components/common/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <SidebarProvider>
        <AppSidebar />
        {/* <main className="h-fit w-full lg:h-100vh lg:overflow-hidden px-2 py-2 flex flex-col gap-y-2"> */}
        <main className="h-fit w-full lg:h-90vh lg:overflow-hidden px-2 py-2 flex flex-col gap-y-2">
          <Navbar />
          <div className="flex-1 ">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
