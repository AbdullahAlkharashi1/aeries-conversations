
import { Link, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/AppSidebar";
import wingLogo from "@/assets/aeries-wing.png";
import ThemeToggle from "@/components/theme/ThemeToggle";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="h-14 flex items-center border-b border-border sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <div className="container mx-auto flex items-center gap-3">
              <SidebarTrigger className="ml-1" />
              <img src={wingLogo} alt="Aeries logo" width={24} height={24} loading="lazy" />
              <Link to="/" className="text-base font-semibold tracking-tight">Aeries</Link>
              <div className="ml-auto flex items-center gap-1">
                <ThemeToggle />
              </div>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
