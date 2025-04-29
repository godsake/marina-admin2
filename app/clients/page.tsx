import { ClientsHeader } from "@/components/clients/clients-header"
import { ClientsTable } from "@/components/clients/clients-table"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <ClientsHeader />
      <ClientsTable />
    </div>
  )
}
