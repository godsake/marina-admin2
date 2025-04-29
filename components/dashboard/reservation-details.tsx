"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Ship, User, CreditCard, FileText } from "lucide-react"
import { useReservationStore } from "@/lib/reservation-store"
import { getReservation, getBoat, getCustomer, type Reservation, type Boat, type Customer } from "@/lib/mock-data"

export function ReservationDetails() {
  const { selectedReservationId } = useReservationStore()
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [boat, setBoat] = useState<Boat | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchReservationDetails() {
      if (!selectedReservationId) return

      setLoading(true)
      try {
        const reservationData = await getReservation(selectedReservationId)
        setReservation(reservationData)

        if (reservationData) {
          const [boatData, customerData] = await Promise.all([
            getBoat(reservationData.boatId),
            getCustomer(reservationData.customerId),
          ])

          setBoat(boatData)
          setCustomer(customerData)
        }
      } catch (error) {
        console.error("Error fetching reservation details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReservationDetails()
  }, [selectedReservationId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">En attente</Badge>
      case "confirmed":
        return <Badge className="bg-[#3a95b5]">Confirmée</Badge>
      case "in-progress":
        return <Badge className="bg-amber-500">En cours</Badge>
      case "completed":
        return <Badge className="bg-green-500">Terminée</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  if (!selectedReservationId) {
    return (
      <Card className="border-[#a7d5e6] shadow-lg h-full">
        <CardContent className="flex items-center justify-center h-full p-6">
          <div className="text-center text-[#3a95b5]">
            <Calendar className="mx-auto h-12 w-12 opacity-50 mb-2" />
            <p>Sélectionnez une réservation dans le calendrier pour voir les détails</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="border-[#a7d5e6] shadow-lg">
        <CardContent className="flex items-center justify-center h-64 p-6">
          <div className="text-center text-[#3a95b5]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3a95b5] mx-auto mb-2"></div>
            <p>Chargement des détails...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!reservation) {
    return (
      <Card className="border-[#a7d5e6] shadow-lg">
        <CardContent className="flex items-center justify-center h-64 p-6">
          <div className="text-center text-[#3a95b5]">
            <p>Réservation non trouvée</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[#a7d5e6] shadow-lg">
      <CardHeader className="bg-[#e6f3f7] border-b border-[#a7d5e6] pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-[#1a4a5a]">Réservation #{reservation.id}</CardTitle>
          {getStatusBadge(reservation.status)}
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-[#f8fcfd] space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-[#3a95b5] mt-0.5" />
            <div>
              <p className="font-medium text-[#1a4a5a]">Dates</p>
              <p className="text-[#3a95b5]">{formatDate(reservation.startDate)}</p>
              {reservation.startDate !== reservation.endDate && (
                <p className="text-[#3a95b5]">jusqu'au {formatDate(reservation.endDate)}</p>
              )}
            </div>
          </div>

          {boat && (
            <div className="flex items-start gap-3">
              <Ship className="h-5 w-5 text-[#3a95b5] mt-0.5" />
              <div>
                <p className="font-medium text-[#1a4a5a]">Bateau</p>
                <p className="text-[#3a95b5]">
                  {boat.name} ({boat.type})
                </p>
                <p className="text-xs text-[#3a95b5]">Capacité: {boat.capacity} personnes</p>
              </div>
            </div>
          )}

          {customer && (
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-[#3a95b5] mt-0.5" />
              <div>
                <p className="font-medium text-[#1a4a5a]">Client</p>
                <p className="text-[#3a95b5]">
                  {customer.firstName} {customer.lastName}
                </p>
                <p className="text-xs text-[#3a95b5]">
                  {customer.email} | {customer.phone}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-[#3a95b5] mt-0.5" />
            <div>
              <p className="font-medium text-[#1a4a5a]">Paiement</p>
              <p className="text-[#3a95b5]">Total: {reservation.totalPrice.toFixed(2)} $ CAD</p>
              <div className="flex gap-4 text-xs text-[#3a95b5]">
                <p>Acompte: {reservation.deposit.toFixed(2)} $ CAD</p>
                <p>Solde: {reservation.balance.toFixed(2)} $ CAD</p>
              </div>
            </div>
          </div>

          {reservation.notes && (
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-[#3a95b5] mt-0.5" />
              <div>
                <p className="font-medium text-[#1a4a5a]">Notes</p>
                <p className="text-[#3a95b5]">{reservation.notes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button className="bg-[#3a95b5] hover:bg-[#2a7a9a]">Modifier</Button>
          <Button variant="outline" className="border-[#a7d5e6] text-[#3a95b5]">
            Imprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
