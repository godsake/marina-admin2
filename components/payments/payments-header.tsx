"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewPaymentDialog } from "./new-payment-dialog"

export function PaymentsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paiements</h1>
        <p className="text-muted-foreground">Gérez les paiements des réservations</p>
      </div>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Nouveau paiement
      </Button>
      <NewPaymentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
