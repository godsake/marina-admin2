"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getReservations, type Reservation } from "@/lib/mock-data"

interface NewPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewPaymentDialog({ open, onOpenChange }: NewPaymentDialogProps) {
  const [reservationId, setReservationId] = useState("")
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("")
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const reservationsData = await getReservations()
      // Filter only pending or confirmed reservations
      const filteredReservations = reservationsData.filter(
        (res) => res.status === "pending" || res.status === "confirmed" || res.status === "in-progress",
      )
      setReservations(filteredReservations)
    }

    if (open) {
      fetchData()
    }
  }, [open])

  const handleSubmit = async () => {
    if (!reservationId || !amount || !method) {
      // Show validation error
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setReservationId("")
    setAmount("")
    setMethod("")
    setIsSubmitting(false)

    // Close dialog
    onOpenChange(false)

    // Show success message (in a real app, you'd use a toast or notification)
    console.log("Paiement enregistré avec succès")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau paiement</DialogTitle>
          <DialogDescription>Enregistrez un nouveau paiement pour une réservation.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reservation">Réservation</Label>
            <Select value={reservationId} onValueChange={setReservationId}>
              <SelectTrigger id="reservation">
                <SelectValue placeholder="Sélectionner une réservation" />
              </SelectTrigger>
              <SelectContent>
                {reservations.map((reservation) => (
                  <SelectItem key={reservation.id} value={reservation.id}>
                    {reservation.id} - {reservation.totalPrice.toFixed(2)} €
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Montant (€)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="method">Méthode de paiement</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method">
                <SelectValue placeholder="Sélectionner une méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Carte bancaire</SelectItem>
                <SelectItem value="cash">Espèces</SelectItem>
                <SelectItem value="transfer">Virement</SelectItem>
                <SelectItem value="check">Chèque</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Traitement..." : "Enregistrer le paiement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
