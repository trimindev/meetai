"use client";
import { Bell, Search, Settings, HelpCircle } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardNavbarProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
}

export default function DashboardNavbar({
  title = "Dashboard",
  subtitle,
  showSearch = true,
}: DashboardNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock notification count - replace with actual data
  const notificationCount = 3;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left Section - Sidebar Trigger & Title */}
        <div className="flex items-center gap-4">
          {/* Sidebar Trigger */}
          <SidebarTrigger className="" />

          {/* Page Title */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center Section - Search */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search meetings, agents, or settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full bg-muted/50 focus:bg-background transition-colors"
              />
            </form>
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                // Toggle mobile search modal or expand search
                console.log("Open mobile search");
              }}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </Badge>
                )}
                <span className="sr-only">
                  Notifications ({notificationCount} unread)
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="ml-2">
                  {notificationCount}
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-sm">
                      New meeting scheduled
                    </span>
                    <span className="text-xs text-muted-foreground">
                      2m ago
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI Agent meeting with team at 3:00 PM
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-sm">
                      Agent performance update
                    </span>
                    <span className="text-xs text-muted-foreground">
                      1h ago
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Customer service agent improved by 15%
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-sm">
                      System maintenance
                    </span>
                    <span className="text-xs text-muted-foreground">
                      3h ago
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Scheduled maintenance completed successfully
                  </p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help & Support</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>📚 Documentation</DropdownMenuItem>
              <DropdownMenuItem>🎥 Video Tutorials</DropdownMenuItem>
              <DropdownMenuItem>💬 Contact Support</DropdownMenuItem>
              <DropdownMenuItem>🔄 What&apos;s New</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Quick Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>🎨 Appearance</DropdownMenuItem>
              <DropdownMenuItem>🔔 Notifications</DropdownMenuItem>
              <DropdownMenuItem>🤖 Agent Preferences</DropdownMenuItem>
              <DropdownMenuItem>⚙️ Advanced Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
