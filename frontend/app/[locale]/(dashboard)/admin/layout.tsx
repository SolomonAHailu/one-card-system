import RouteDisplay from "@/components/common/RouteDisplay";
import Sidebar from "@/components/common/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-96px)] flex gap-x-3 m-2">
      <Sidebar open={true} />
      <div className="flex-1 flex flex-col gap-y-3 inset-0">
        {/* <RouteDisplay /> */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
