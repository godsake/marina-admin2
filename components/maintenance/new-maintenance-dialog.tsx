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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getBoats, type Boat } from "@/lib/mock-data"

interface NewMaintenanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewMaintenanceDialog({ open, onOpenChange }: NewMaintenanceDialogProps) {
  const [boatId, setBoatId] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [cost, setCost] = useState("")
  const [notes, setNotes] = useState("")
  const [boats, setBoats] = useState<Boat[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const boatsData = await getBoats()
      setBoats(boatsData)
    }

    if (open) {
      fetchData()
    }
  }, [open])

  const handleSubmit = async () => {
    if (!boatId || !type || !description) {
      // Show validation error
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setBoatId("")
    setType("")
    setDescription("")
    setCost("")
    setNotes("")
    setIsSubmitting(false)

    // Close dialog
    onOpenChange(false)

    // Show success message (in a real app, you'd use a toast or notification)
    console.log("Maintenance enregistrée avec succès")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouvelle maintenance</DialogTitle>
          <DialogDescription>Enregistrez une nouvelle opération de maintenance pour un bateau.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="boat">Bateau</Label>
            <Select value={boatId} onValueChange={setBoatId}>
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
          <div className="grid gap-2">
            <Label htmlFor="type">Type de maintenance</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="repair">Réparation</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="cleaning">Nettoyage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez le problème ou l'opération de maintenance"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cost">Coût estimé (€)</Label>
            <Input id="cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} min="0" step="0.01" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Informations supplémentaires"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
