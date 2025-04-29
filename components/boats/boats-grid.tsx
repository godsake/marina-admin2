"use client"

import { useEffect, useState } from "react"
import { getBoats, type Boat } from "@/lib/mock-data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, PenToolIcon as Tool, Edit } from "lucide-react"

export function BoatsGrid() {
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
        return <Badge className="bg-blue-500">En location</Badge>
      case "maintenance":
        return <Badge className="bg-red-500">En maintenance</Badge>
      case "inspection":
        return <Badge className="bg-yellow-500">En inspection</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boats.map((boat) => (
        <Card key={boat.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img src={boat.image || "/placeholder.svg"} alt={boat.name} className="h-full w-full object-cover" />
          </div>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>{boat.name}</CardTitle>
              {getStatusBadge(boat.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              {boat.type} - {boat.capacity} personnes
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Niveau de carburant</span>
                <span>{boat.fuelLevel}%</span>
              </div>
              <Progress value={boat.fuelLevel} className="h-2" />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Équipement</h4>
              <div className="flex flex-wrap gap-2">
                {boat.equipment.map((item, index) => (
                  <Badge key={index} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Prix par heure</p>
                <p>{boat.pricePerHour} $ CAD</p>
              </div>
              <div>
                <p className="font-medium">Prix par jour</p>
                <p>{boat.pricePerDay} $ CAD</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Détails
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button variant="outline" size="sm">
              <Tool className="mr-2 h-4 w-4" />
              Maintenance
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
