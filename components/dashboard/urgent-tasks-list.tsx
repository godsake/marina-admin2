"use client"

import { useEffect, useState } from "react"
import { getUrgentTasks, type UrgentTask } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, PenToolIcon as Tool, CreditCard } from "lucide-react"

export function UrgentTasksList() {
  const [tasks, setTasks] = useState<UrgentTask[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const tasksData = await getUrgentTasks()
      setTasks(tasksData)
    }

    fetchData()
  }, [])

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "late-return":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "inspection-needed":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "maintenance-required":
        return <Tool className="h-5 w-5 text-red-500" />
      case "payment-due":
        return <CreditCard className="h-5 w-5 text-[#3a95b5]" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getTaskBadge = (type: string) => {
    switch (type) {
      case "late-return":
        return <Badge className="bg-amber-500">Retard</Badge>
      case "inspection-needed":
        return <Badge className="bg-yellow-500">Inspection</Badge>
      case "maintenance-required":
        return <Badge className="bg-red-500">Maintenance</Badge>
      case "payment-due":
        return <Badge className="bg-[#3a95b5]">Paiement</Badge>
      default:
        return <Badge>Autre</Badge>
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="border-[#a7d5e6] shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-[#e6f3f7]">
                <th className="text-left p-4 text-[#1a4a5a]">Type</th>
                <th className="text-left p-4 text-[#1a4a5a]">Description</th>
                <th className="text-left p-4 text-[#1a4a5a]">Heure</th>
                <th className="text-left p-4 text-[#1a4a5a]">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-[#3a95b5]">
                    Aucune tâche urgente
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-[#f8fcfd]">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getTaskIcon(task.type)}
                        {getTaskBadge(task.type)}
                      </div>
                    </td>
                    <td className="p-4 text-[#3a95b5]">{task.description}</td>
                    <td className="p-4 text-[#3a95b5]">{formatTime(task.createdAt)}</td>
                    <td className="p-4">
                      <button className="text-sm text-[#3a95b5] hover:underline">Voir détails</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
