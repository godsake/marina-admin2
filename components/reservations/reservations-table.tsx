"use client"

import { useEffect, useState } from "react"
import { getReservations, getBoats, getCustomers, type Reservation, type Boat, type Customer } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash, CheckCircle, XCircle } from "lucide-react"

export function ReservationsTable() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [boats, setBoats] = useState<Boat[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const reservationsData = await getReservations()
      const boatsData = await getBoats()
      const customersData = await getCustomers()

      setReservations(reservationsData)
      setBoats(boatsData)
      setCustomers(customersData)
    }

    fetchData()
  }, [])

  const getBoatName = (boatId: string) => {
    const boat = boats.find((b) => b.id === boatId)
    return boat?.name || "Bateau inconnu"
  }

  const getCustomerName = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId)
    return customer ? `${customer.firstName} ${customer.lastName}` : "Client inconnu"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">En attente</Badge>
      case "confirmed":
        return <Badge>Confirmée</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">En cours</Badge>
      case "completed":
        return <Badge className="bg-green-500">Terminée</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>
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
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Bateau</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Aucune réservation trouvée
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>{getCustomerName(reservation.customerId)}</TableCell>
                  <TableCell>{getBoatName(reservation.boatId)}</TableCell>
                  <TableCell>{formatDate(reservation.startDate)}</TableCell>
                  <TableCell>{reservation.totalPrice.toFixed(2)} $ CAD</TableCell>
                  <TableCell>{getStatusBadge(reservation.status)}</TableCell>
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
                        {reservation.status === "pending" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Confirmer</span>
                          </DropdownMenuItem>
                        )}
                        {(reservation.status === "pending" || reservation.status === "confirmed") && (
                          <DropdownMenuItem>
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Annuler</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
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
