"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewBoatDialog } from "./new-boat-dialog"

export function BoatsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bateaux</h1>
        <p className="text-muted-foreground">Gérez la flotte de bateaux de la marina</p>
      </div>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Nouveau bateau
      </Button>
      <NewBoatDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
