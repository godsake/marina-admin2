"use client"

import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewBoatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewBoatDialog({ open, onOpenChange }: NewBoatDialogProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [capacity, setCapacity] = useState("")
  const [pricePerHour, setPricePerHour] = useState("")
  const [pricePerDay, setPricePerDay] = useState("")
  const [equipment, setEquipment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!name || !type || !capacity || !pricePerHour || !pricePerDay) {
      // Show validation error
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setName("")
    setType("")
    setCapacity("")
    setPricePerHour("")
    setPricePerDay("")
    setEquipment("")
    setIsSubmitting(false)

    // Close dialog
    onOpenChange(false)

    // Show success message (in a real app, you'd use a toast or notification)
    console.log("Bateau ajouté avec succès")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau bateau</DialogTitle>
          <DialogDescription>Ajoutez un nouveau bateau à la flotte de la marina.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom du bateau</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex: Aqua Dream" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type de bateau</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pontoon">Ponton</SelectItem>
                <SelectItem value="speedboat">Bateau à moteur</SelectItem>
                <SelectItem value="fishing">Bateau de pêche</SelectItem>
                <SelectItem value="deck">Deck Boat</SelectItem>
                <SelectItem value="jetski">Jet Ski</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacité (personnes)</Label>
              <Input
                id="capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="1"
                max="20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fuel">Niveau de carburant (%)</Label>
              <Input id="fuel" type="number" defaultValue="100" min="0" max="100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price-hour">Prix par heure (€)</Label>
              <Input
                id="price-hour"
                type="number"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                min="0"
                step="5"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price-day">Prix par jour (€)</Label>
              <Input
                id="price-day"
                type="number"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
                min="0"
                step="10"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="equipment">Équipement</Label>
            <Textarea
              id="equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="Gilets de sauvetage, GPS, Glacière, etc. (séparés par des virgules)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Ajout en cours..." : "Ajouter le bateau"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
