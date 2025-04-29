import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { ReservationsCalendar } from "@/components/dashboard/reservations-calendar"
import { UrgentTasksList } from "@/components/dashboard/urgent-tasks-list"
import { ReservationDetails } from "@/components/dashboard/reservation-details"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Tâches urgentes</h2>
        <UrgentTasksList />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Réservations</h2>
          <ReservationsCalendar />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Détails des réservations</h2>
          <ReservationDetails />
        </div>
      </div>

      <DashboardCards />
    </div>
  )
}
