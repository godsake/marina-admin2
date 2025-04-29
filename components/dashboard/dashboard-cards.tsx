"use client"

import { useEffect, useState } from "react"
import { Ship, Calendar, Users, DollarSign } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBoats, getReservations, getCustomers, getPayments } from "@/lib/mock-data"

export function DashboardCards() {
  const [stats, setStats] = useState({
    totalBoats: 0,
    availableBoats: 0,
    todayReservations: 0,
    totalCustomers: 0,
    revenueToday: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const boats = await getBoats()
      const reservations = await getReservations()
      const customers = await getCustomers()
      const payments = await getPayments()

      const today = new Date().toISOString().split("T")[0]

      setStats({
        totalBoats: boats.length,
        availableBoats: boats.filter((boat) => boat.status === "available").length,
        todayReservations: reservations.filter((res) => new Date(res.startDate).toISOString().split("T")[0] === today)
          .length,
        totalCustomers: customers.length,
        revenueToday: payments
          .filter((payment) => new Date(payment.date).toISOString().split("T")[0] === today)
          .reduce((sum, payment) => sum + payment.amount, 0),
      })
    }

    fetchData()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-[#a7d5e6] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-[#e6f3f7]">
          <CardTitle className="text-sm font-medium text-[#1a4a5a]">Bateaux</CardTitle>
          <Ship className="h-4 w-4 text-[#3a95b5]" />
        </CardHeader>
        <CardContent className="bg-gradient-to-br from-[#f8fcfd] to-white">
          <div className="text-2xl font-bold text-[#1a4a5a]">
            {stats.availableBoats} / {stats.totalBoats}
          </div>
          <p className="text-xs text-[#3a95b5]">Bateaux disponibles</p>
        </CardContent>
      </Card>
      <Card className="border-[#a7d5e6] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-[#e6f3f7]">
          <CardTitle className="text-sm font-medium text-[#1a4a5a]">Réservations</CardTitle>
          <Calendar className="h-4 w-4 text-[#3a95b5]" />
        </CardHeader>
        <CardContent className="bg-gradient-to-br from-[#f8fcfd] to-white">
          <div className="text-2xl font-bold text-[#1a4a5a]">{stats.todayReservations}</div>
          <p className="text-xs text-[#3a95b5]">Réservations aujourd'hui</p>
        </CardContent>
      </Card>
      <Card className="border-[#a7d5e6] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-[#e6f3f7]">
          <CardTitle className="text-sm font-medium text-[#1a4a5a]">Clients</CardTitle>
          <Users className="h-4 w-4 text-[#3a95b5]" />
        </CardHeader>
        <CardContent className="bg-gradient-to-br from-[#f8fcfd] to-white">
          <div className="text-2xl font-bold text-[#1a4a5a]">{stats.totalCustomers}</div>
          <p className="text-xs text-[#3a95b5]">Clients enregistrés</p>
        </CardContent>
      </Card>
      <Card className="border-[#a7d5e6] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-[#e6f3f7]">
          <CardTitle className="text-sm font-medium text-[#1a4a5a]">Revenus</CardTitle>
          <DollarSign className="h-4 w-4 text-[#3a95b5]" />
        </CardHeader>
        <CardContent className="bg-gradient-to-br from-[#f8fcfd] to-white">
          <div className="text-2xl font-bold text-[#1a4a5a]">{stats.revenueToday.toFixed(2)} $ CAD</div>
          <p className="text-xs text-[#3a95b5]">Revenus aujourd'hui</p>
        </CardContent>
      </Card>
    </div>
  )
}
