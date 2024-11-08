import StaticNavbar from "@/components/common/StaticNavbar";


export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-[100vh]">
      <StaticNavbar />
      <main className="flex-grow flex-1 flex items-center justify-center h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}
