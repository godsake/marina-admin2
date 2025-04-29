"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewClientDialog } from "./new-client-dialog"

export function ClientsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-muted-foreground">Gérez les clients de la marina</p>
      </div>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Nouveau client
      </Button>
      <NewClientDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
