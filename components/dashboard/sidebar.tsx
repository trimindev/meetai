"use client";
import { Users, Bot, Crown } from "lucide-react";
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
} from "@/components/ui/sidebar";
import Logo from "@/components/icons/Logo";
import { AccountMenu } from "./AccountMenu"; // Import the new component

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

// Mock user data - replace with actual user data from your auth context/hook
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "", // Leave empty to show initials
  plan: "Pro Plan",
};

export function AppSidebar() {
  const pathname = usePathname();

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

      {/* Account Menu */}
      <AccountMenu userData={userData} />
    </Sidebar>
  );
}
