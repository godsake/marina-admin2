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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getBoats, getCustomers, type Boat, type Customer } from "@/lib/mock-data"

interface NewReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewReservationDialog({ open, onOpenChange }: NewReservationDialogProps) {
  const [boats, setBoats] = useState<Boat[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedBoat, setSelectedBoat] = useState<string>("")
  const [selectedCustomer, setSelectedCustomer] = useState<string>("")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [notes, setNotes] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const boatsData = await getBoats()
      const customersData = await getCustomers()

      // Filter only available boats
      const availableBoats = boatsData.filter((boat) => boat.status === "available")

      setBoats(availableBoats)
      setCustomers(customersData)
    }

    if (open) {
      fetchData()
    }
  }, [open])

  const handleSubmit = async () => {
    if (!selectedBoat || !selectedCustomer || !startDate || !endDate) {
      // Show validation error
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setSelectedBoat("")
    setSelectedCustomer("")
    setStartDate(new Date())
    setEndDate(new Date())
    setNotes("")
    setIsSubmitting(false)

    // Close dialog
    onOpenChange(false)

    // Show success message (in a real app, you'd use a toast or notification)
    console.log("Réservation créée avec succès")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouvelle réservation</DialogTitle>
          <DialogDescription>Créez une nouvelle réservation de bateau pour un client.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="customer">Client</Label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger id="customer">
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.firstName} {customer.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="boat">Bateau</Label>
            <Select value={selectedBoat} onValueChange={setSelectedBoat}>
              <SelectTrigger id="boat">
                <SelectValue placeholder="Sélectionner un bateau" />
              </SelectTrigger>
              <SelectContent>
                {boats.map((boat) => (
                  <SelectItem key={boat.id} value={boat.id}>
                    {boat.name} ({boat.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Date de début</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-date">Date de fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="end-date"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Informations supplémentaires sur la réservation"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Création..." : "Créer la réservation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
