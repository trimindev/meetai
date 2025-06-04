"use client";
import {
  Users,
  Bot,
  Crown,
  User,
  Settings,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "../icons/Logo";

// First group - Main navigation
const mainItems = [
  {
    title: "Meeting",
    url: "/meeting",
    icon: Users,
    color: "#3B82F6", // Blue
  },
  {
    title: "Agent",
    url: "/agent",
    icon: Bot,
    color: "#8B5CF6", // Purple
  },
];

// Second group - Premium features
const premiumItems = [
  {
    title: "Upgrade",
    url: "/upgrade",
    icon: Crown,
    color: "#F59E0B", // Amber/Gold
  },
];

// Mock user data - replace with actual user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "", // Leave empty to show initials
  plan: "Pro Plan",
};

export function AppSidebar() {
  const pathname = usePathname();

  const handleProfileClick = () => {
    // Handle profile navigation
    console.log("Navigate to profile");
  };

  const handleSettingsClick = () => {
    // Handle settings navigation
    console.log("Navigate to settings");
  };

  const handleLogoutClick = () => {
    // Handle logout
    console.log("Logout user");
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center">
              <Logo color="#000000" width={40} height={40} />
              <h1 className="ml-2 text-lg font-semibold text-primary">
                Meet.Ai
              </h1>
            </div>
          </SidebarGroupLabel>
        </SidebarGroup>

        <SidebarSeparator className="" />

        {/* Main Navigation Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        transition-all duration-200 hover:bg-accent
                        ${
                          isActive
                            ? "bg-accent text-accent-foreground border-l-2 shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon
                          size={18}
                          style={{
                            color: isActive ? item.color : "currentColor",
                          }}
                        />
                        <span
                          className={`font-medium ${
                            isActive ? "text-foreground" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="" />

        {/* Premium Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {premiumItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50
                        ${
                          isActive
                            ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border-l-2 shadow-sm"
                            : "text-muted-foreground hover:text-amber-700"
                        }
                      `}
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon
                          size={18}
                          style={{
                            color: isActive ? item.color : "currentColor",
                          }}
                        />
                        <span
                          className={`font-medium ${
                            isActive ? "text-amber-800" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Section Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="w-full justify-between hover:bg-accent transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left min-w-0">
                      <span className="text-sm font-medium text-foreground truncate">
                        {userData.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {userData.plan}
                      </span>
                    </div>
                  </div>
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-56 mb-2"
                sideOffset={8}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userData.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleProfileClick}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSettingsClick}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogoutClick}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
