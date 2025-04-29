import { ParametresHeader } from "@/components/parametres/parametres-header"
import { ParametresTabs } from "@/components/parametres/parametres-tabs"

export default function ParametresPage() {
  return (
    <div className="space-y-6">
      <ParametresHeader />
      <ParametresTabs />
    </div>
  )
}
