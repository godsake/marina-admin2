"use client"

import { useEffect, useState } from "react"
import { getBoats, type Boat } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function BoatStatusTable() {
  const [boats, setBoats] = useState<Boat[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const boatsData = await getBoats()
      setBoats(boatsData)
    }

    fetchData()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Disponible</Badge>
      case "rented":
        return <Badge className="bg-[#3a95b5]">En location</Badge>
      case "maintenance":
        return <Badge className="bg-red-500">En maintenance</Badge>
      case "inspection":
        return <Badge className="bg-yellow-500">En inspection</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  return (
    <Card className="border-[#a7d5e6] shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-[#e6f3f7]">
                <th className="text-left p-4 text-[#1a4a5a]">Bateau</th>
                <th className="text-left p-4 text-[#1a4a5a]">Type</th>
                <th className="text-left p-4 text-[#1a4a5a]">Statut</th>
                <th className="text-left p-4 text-[#1a4a5a]">Carburant</th>
              </tr>
            </thead>
            <tbody>
              {boats.map((boat) => (
                <tr key={boat.id} className="border-b hover:bg-[#f8fcfd]">
                  <td className="p-4">
                    <div className="font-medium text-[#1a4a5a]">{boat.name}</div>
                    <div className="text-sm text-[#3a95b5]">Capacité: {boat.capacity} pers.</div>
                  </td>
                  <td className="p-4 text-[#3a95b5]">{boat.type}</td>
                  <td className="p-4">{getStatusBadge(boat.status)}</td>
                  <td className="p-4 w-40">
                    <div className="flex items-center gap-2">
                      <Progress value={boat.fuelLevel} className="h-2 bg-[#e6f3f7]" />
                      <span className="text-sm text-[#3a95b5]">{boat.fuelLevel}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
