"use client"

import { useEffect, useState } from "react"
import { getMaintenances, getBoats, type Maintenance, type Boat } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, CheckCircle } from "lucide-react"

export function MaintenanceTable() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([])
  const [boats, setBoats] = useState<Boat[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const maintenancesData = await getMaintenances()
      const boatsData = await getBoats()

      setMaintenances(maintenancesData)
      setBoats(boatsData)
    }

    fetchData()
  }, [])

  const getBoatName = (boatId: string) => {
    const boat = boats.find((b) => b.id === boatId)
    return boat?.name || "Bateau inconnu"
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "routine":
        return <Badge className="bg-blue-500">Routine</Badge>
      case "repair":
        return <Badge className="bg-red-500">Réparation</Badge>
      case "inspection":
        return <Badge className="bg-yellow-500">Inspection</Badge>
      case "cleaning":
        return <Badge className="bg-green-500">Nettoyage</Badge>
      default:
        return <Badge variant="outline">Autre</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">En attente</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">En cours</Badge>
      case "completed":
        return <Badge className="bg-green-500">Terminée</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bateau</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Signalé le</TableHead>
              <TableHead>Terminé le</TableHead>
              <TableHead>Coût</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Aucune maintenance trouvée
                </TableCell>
              </TableRow>
            ) : (
              maintenances.map((maintenance) => (
                <TableRow key={maintenance.id}>
                  <TableCell>{getBoatName(maintenance.boatId)}</TableCell>
                  <TableCell>{getTypeBadge(maintenance.type)}</TableCell>
                  <TableCell>{maintenance.description}</TableCell>
                  <TableCell>{formatDate(maintenance.reportedDate)}</TableCell>
                  <TableCell>{formatDate(maintenance.completedDate)}</TableCell>
                  <TableCell>{maintenance.cost.toFixed(2)} $ CAD</TableCell>
                  <TableCell>{getStatusBadge(maintenance.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Détails</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Modifier</span>
                        </DropdownMenuItem>
                        {maintenance.status !== "completed" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Marquer comme terminée</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
