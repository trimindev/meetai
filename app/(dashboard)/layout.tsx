import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/Sidebar";
import { Toaster } from "sonner";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <DashboardNavbar />
        <div className="flex items-center justify-center min-h-screen">
          {children}
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
