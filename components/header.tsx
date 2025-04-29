"use client"

import { useState } from "react"
import { Bell, Menu, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { setTheme } = useTheme()
  const [notificationCount] = useState(3)

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 sm:max-w-xs">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="md:hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u1qCLj8gqx47SukTouE5FClsiF4mDP.png"
          alt="Marina Fitch Bay"
          className="h-8"
        />
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {notificationCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Retard de retour: Bateau #5</DropdownMenuItem>
            <DropdownMenuItem>Inspection requise: Bateau #3</DropdownMenuItem>
            <DropdownMenuItem>Nouvelle réservation: Client Dupont</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="hidden md:block">
            <div className="text-sm font-medium">Admin</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">admin@marina.com</div>
          </div>
        </div>
      </div>
    </header>
  )
}
