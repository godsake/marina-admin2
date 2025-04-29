import { MaintenanceHeader } from "@/components/maintenance/maintenance-header"
import { MaintenanceTable } from "@/components/maintenance/maintenance-table"

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <MaintenanceHeader />
      <MaintenanceTable />
    </div>
  )
}
