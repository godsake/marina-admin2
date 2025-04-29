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
import { Checkbox } from "@/components/ui/checkbox"

interface NewClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewClientDialog({ open, onOpenChange }: NewClientDialogProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [hasFishingPermit, setHasFishingPermit] = useState(false)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !phone || !licenseNumber) {
      // Show validation error
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setFirstName("")
    setLastName("")
    setEmail("")
    setPhone("")
    setAddress("")
    setLicenseNumber("")
    setHasFishingPermit(false)
    setNotes("")
    setIsSubmitting(false)

    // Close dialog
    onOpenChange(false)

    // Show success message (in a real app, you'd use a toast or notification)
    console.log("Client ajouté avec succès")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau client</DialogTitle>
          <DialogDescription>Ajoutez un nouveau client à la base de données.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Prénom</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jean"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Nom</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Dupont"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean.dupont@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="514-555-1234" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Rue Principale, Montréal, QC"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="license">Numéro de permis de conduire</Label>
            <Input
              id="license"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="D1234-56789"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fishing-permit"
              checked={hasFishingPermit}
              onCheckedChange={(checked) => setHasFishingPermit(checked as boolean)}
            />
            <Label htmlFor="fishing-permit">Possède un permis de pêche</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Informations supplémentaires sur le client"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Ajout en cours..." : "Ajouter le client"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
