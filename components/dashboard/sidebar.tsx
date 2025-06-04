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
import Logo from "../icons/logo";

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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4">
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
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
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
                      style={{
                        borderLeftColor: isActive ? item.color : "transparent",
                      }}
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
                        {isActive && (
                          <div
                            className="ml-auto w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        )}
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
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">
            Premium
          </SidebarGroupLabel>
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
                      style={{
                        borderLeftColor: isActive ? item.color : "transparent",
                      }}
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
                        {isActive && (
                          <div
                            className="ml-auto w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
