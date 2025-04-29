"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Ship, Users, CreditCard, PenToolIcon as Tool, Settings, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    title: "Réservations",
    href: "/reservations",
    icon: Calendar,
  },
  {
    title: "Bateaux",
    href: "/bateaux",
    icon: Ship,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    title: "Paiements",
    href: "/paiements",
    icon: CreditCard,
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Tool,
  },
  {
    title: "Paramètres",
    href: "/parametres",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[5]">
        <div className="flex flex-col flex-1 min-h-0 bg-[#f8fcfd] dark:bg-gray-900 border-r border-[#a7d5e6] dark:border-gray-800">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-[#a7d5e6] dark:border-gray-800 bg-[#e6f3f7]">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u1qCLj8gqx47SukTouE5FClsiF4mDP.png"
                alt="Marina Fitch Bay"
                className="h-10 mr-2"
              />
              <h1 className="text-xl font-bold text-[#1a4a5a]">Admin</h1>
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-2 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    pathname === item.href
                      ? "bg-[#a7d5e6] text-[#1a4a5a]"
                      : "text-[#3a95b5] hover:bg-[#e6f3f7] hover:text-[#1a4a5a]",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex flex-col border-t border-[#a7d5e6] dark:border-gray-800 p-4 bg-[#e6f3f7]">
            <Button
              variant="outline"
              className="w-full justify-start mb-2 border-[#a7d5e6] text-[#1a4a5a]"
              onClick={() => console.log("Déconnexion")}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Déconnexion
            </Button>
            <div className="text-xs text-center text-[#3a95b5] mt-2">Designé par Victor IA</div>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-64 md:flex-shrink-0"></div>
    </>
  )
}
