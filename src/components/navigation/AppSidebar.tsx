import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, MessageSquare, Settings } from "lucide-react";
import { createNewSession, getSessions } from "@/lib/chat-storage";
import { useEffect, useState } from "react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sessions, setSessions] = useState(getSessions());
  const { toast } = useToast();

  useEffect(() => {
    const onStorage = () => setSessions(getSessions());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Keep sessions fresh on route changes (ensures titles/order update)
  useEffect(() => {
    setSessions(getSessions());
  }, [location.pathname]);

  const handleNewChat = () => {
    try {
      const id = createNewSession();
      // Refresh local list immediately so the new chat appears at the top
      setSessions(getSessions());
      navigate(`/chat/${id}`);
    } catch (err) {
      console.error("Failed to create new chat", err);
      toast({
        title: "Couldn’t start a new chat",
        description: "Please try again. If this persists, clear local data in Settings.",
        variant: "destructive",
      });
    }
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Button variant="hero" onClick={handleNewChat} className="w-full">
          <Plus className="mr-1" /> New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.map((s) => (
                <SidebarMenuItem key={s.id}>
                  <SidebarMenuButton asChild isActive={location.pathname === `/chat/${s.id}`} tooltip={s.title}>
                    <NavLink to={`/chat/${s.id}`} className={({ isActive }) => (isActive ? "" : "")}>
                      <MessageSquare />
                      <span>{s.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <NavLink to="/settings">
                    <Settings />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground">Aeries © {new Date().getFullYear()}</p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
