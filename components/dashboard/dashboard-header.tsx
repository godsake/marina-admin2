export function DashboardHeader() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">{today}</p>
      </div>
      <div className="text-sm text-muted-foreground">Bienvenue sur votre système de gestion de marina</div>
    </div>
  )
}
