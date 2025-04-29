import { BoatsHeader } from "@/components/boats/boats-header"
import { BoatsGrid } from "@/components/boats/boats-grid"

export default function BoatsPage() {
  return (
    <div className="space-y-6">
      <BoatsHeader />
      <BoatsGrid />
    </div>
  )
}
