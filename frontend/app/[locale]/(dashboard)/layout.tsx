import { AppSidebar } from "@/components/common/Appsidebar";
import Navbar from "@/components/common/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen overflow-hidden px-2 py-2 flex flex-col gap-y-1">
          <Navbar />
          <div className="flex-1 ">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
