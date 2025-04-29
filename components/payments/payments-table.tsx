"use client"

import { useEffect, useState } from "react"
import {
  getPayments,
  getReservations,
  getCustomers,
  type Payment,
  type Reservation,
  type Customer,
} from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Printer, RefreshCw, XCircle } from "lucide-react"

export function PaymentsTable() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const paymentsData = await getPayments()
      const reservationsData = await getReservations()
      const customersData = await getCustomers()

      setPayments(paymentsData)
      setReservations(reservationsData)
      setCustomers(customersData)
    }

    fetchData()
  }, [])

  const getReservationInfo = (reservationId: string) => {
    const reservation = reservations.find((r) => r.id === reservationId)
    if (!reservation) return { id: reservationId, customerName: "Inconnu" }

    const customer = customers.find((c) => c.id === reservation.customerId)
    const customerName = customer ? `${customer.firstName} ${customer.lastName}` : "Client inconnu"

    return {
      id: reservationId,
      customerName,
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getMethodBadge = (method: string) => {
    switch (method) {
      case "card":
        return <Badge className="bg-green-500">Carte</Badge>
      case "cash":
        return <Badge className="bg-blue-500">Espèces</Badge>
      case "transfer":
        return <Badge className="bg-purple-500">Virement</Badge>
      case "check":
        return <Badge className="bg-amber-500">Chèque</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Complété</Badge>
      case "pending":
        return <Badge variant="outline">En attente</Badge>
      case "refunded":
        return <Badge className="bg-amber-500">Remboursé</Badge>
      case "failed":
        return <Badge variant="destructive">Échoué</Badge>
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
              <TableHead>Reçu</TableHead>
              <TableHead>Réservation</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Aucun paiement trouvé
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => {
                const reservationInfo = getReservationInfo(payment.reservationId)
                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.receiptNumber}</TableCell>
                    <TableCell>{reservationInfo.id}</TableCell>
                    <TableCell>{reservationInfo.customerName}</TableCell>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>{payment.amount.toFixed(2)} $ CAD</TableCell>
                    <TableCell>{getMethodBadge(payment.method)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                            <Printer className="mr-2 h-4 w-4" />
                            <span>Imprimer reçu</span>
                          </DropdownMenuItem>
                          {payment.status === "pending" && (
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              <span>Marquer comme complété</span>
                            </DropdownMenuItem>
                          )}
                          {payment.status === "completed" && (
                            <DropdownMenuItem>
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Rembourser</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
