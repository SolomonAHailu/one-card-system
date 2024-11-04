import RouteDisplay from "@/components/common/RouteDisplay";
import Sidebar from "@/components/common/Sidebar";
import SidebarToogler from "@/components/common/SidebarToogler";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-96px)] flex gap-x-3 m-2">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-y-3 relative">
        <div className="flex-1 relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50">
            <SidebarToogler />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
