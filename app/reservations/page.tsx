import { ReservationsHeader } from "@/components/reservations/reservations-header"
import { ReservationsTable } from "@/components/reservations/reservations-table"

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <ReservationsHeader />
      <ReservationsTable />
    </div>
  )
}
