"use client"

import { useEffect, useState } from "react"
import { getReservations, getBoats, getCustomers, type Reservation, type Boat, type Customer } from "@/lib/mock-data"
import { useReservationStore } from "@/lib/reservation-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ReservationsCalendar() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [boats, setBoats] = useState<Boat[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [dayReservations, setDayReservations] = useState<any[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const { setSelectedReservationId } = useReservationStore()

  useEffect(() => {
    const fetchData = async () => {
      const reservationsData = await getReservations()
      const boatsData = await getBoats()
      const customersData = await getCustomers()

      // Ajoutez des réservations supplémentaires pour tester l'affichage de plusieurs bateaux par jour
      const today = new Date()
      const todayStr = today.toISOString().split("T")[0]

      // Créez des réservations supplémentaires pour aujourd'hui et demain
      const additionalReservations = [
        ...reservationsData,
        {
          id: "res-extra-1",
          boatId: "boat-1",
          customerId: "cust-2",
          startDate: today.toISOString(),
          endDate: today.toISOString(),
          status: "confirmed",
          totalPrice: 350,
          deposit: 100,
          balance: 250,
          notes: "Réservation supplémentaire 1",
        },
        {
          id: "res-extra-2",
          boatId: "boat-4",
          customerId: "cust-3",
          startDate: today.toISOString(),
          endDate: today.toISOString(),
          status: "confirmed",
          totalPrice: 400,
          deposit: 100,
          balance: 300,
          notes: "Réservation supplémentaire 2",
        },
        {
          id: "res-extra-3",
          boatId: "boat-2",
          customerId: "cust-1",
          startDate: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          status: "pending",
          totalPrice: 450,
          deposit: 150,
          balance: 300,
          notes: "Réservation supplémentaire 3",
        },
      ]

      setReservations(additionalReservations)
      setBoats(boatsData)
      setCustomers(customersData)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (selectedDate) {
      const dateReservations = reservations.filter((res) => {
        const startDate = new Date(res.startDate)
        return (
          startDate.getFullYear() === selectedDate.getFullYear() &&
          startDate.getMonth() === selectedDate.getMonth() &&
          startDate.getDate() === selectedDate.getDate()
        )
      })
      setDayReservations(dateReservations)
    }
  }, [selectedDate, reservations])

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear(currentYear - 1)
        return 11
      }
      return prevMonth - 1
    })
  }

  const goToNextMonth = () => {
    setCurrentMonth((nextMonth) => {
      if (nextMonth === 11) {
        setCurrentYear(currentYear + 1)
        return 0
      }
      return nextMonth + 1
    })
  }

  const handleDateSelect = (day: number) => {
    // Créer une nouvelle date avec l'année et le mois actuels, et le jour sélectionné
    const newDate = new Date(currentYear, currentMonth, day)

    // Vérifier si la date a été ajustée par JavaScript (ce qui arrive avec des dates invalides comme le 31 avril)
    const actualMonth = newDate.getMonth()
    const actualDay = newDate.getDate()

    if (actualMonth !== currentMonth || actualDay !== day) {
      console.error(
        `Date invalide: ${currentYear}-${currentMonth + 1}-${day} a été ajustée à ${newDate.toISOString().split("T")[0]}`,
      )
      return
    }

    console.log(`Date sélectionnée: ${newDate.toISOString().split("T")[0]}`)

    setSelectedDate(newDate)

    // Filtrer les réservations pour cette date
    const dateReservations = reservations.filter((res) => {
      const startDate = new Date(res.startDate)
      return (
        startDate.getFullYear() === newDate.getFullYear() &&
        startDate.getMonth() === newDate.getMonth() &&
        startDate.getDate() === newDate.getDate()
      )
    })

    setDayReservations(dateReservations)

    // Si une seule réservation est trouvée, la sélectionner automatiquement
    if (dateReservations.length === 1) {
      setSelectedReservationId(dateReservations[0].id)
    } else if (dateReservations.length === 0) {
      // Réinitialiser la sélection si aucune réservation n'est trouvée
      setSelectedReservationId(null)
    }
  }

  const getReservationCountForDate = (day: number) => {
    // Créer une date pour le jour spécifié dans le mois et l'année actuels
    const date = new Date(currentYear, currentMonth, day)

    // Vérifier si la date est valide (pas ajustée par JavaScript)
    if (date.getMonth() !== currentMonth || date.getDate() !== day) {
      return 0
    }

    // Compter les réservations pour cette date
    return reservations.filter((res) => {
      const startDate = new Date(res.startDate)
      return (
        startDate.getFullYear() === date.getFullYear() &&
        startDate.getMonth() === date.getMonth() &&
        startDate.getDate() === date.getDate()
      )
    }).length
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#a7d5e6] shadow-lg overflow-hidden">
          <CardHeader className="bg-[#e6f3f7] border-b border-[#a7d5e6] pb-2">
            <CardTitle className="text-[#1a4a5a]">Calendrier des réservations</CardTitle>
          </CardHeader>
          <CardContent className="p-0 bg-[#f8fcfd]">
            <div className="bg-white rounded-md shadow-md">
              <div className="bg-[#3a95b5] p-3 rounded-t-md flex justify-between items-center">
                <button
                  className="text-white font-bold hover:bg-[#2a7a9a] p-2 rounded-full"
                  onClick={goToPreviousMonth}
                >
                  &lt;
                </button>
                <h3 className="font-bold text-white">
                  {new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(
                    new Date(currentYear, currentMonth),
                  )}
                </h3>
                <button className="text-white font-bold hover:bg-[#2a7a9a] p-2 rounded-full" onClick={goToNextMonth}>
                  &gt;
                </button>
              </div>

              {/* En-tête des jours de la semaine */}
              <div className="grid grid-cols-7 bg-[#a7d5e6] rounded-t-md">
                {["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"].map((day, index) => (
                  <div key={`header-${index}`} className="p-2 text-center font-bold text-[#1a4a5a]">
                    {day}
                  </div>
                ))}
              </div>

              {/* Corps du calendrier */}
              <div className="grid grid-cols-7">
                {/* Cellules vides pour les jours avant le début du mois */}
                {Array(getFirstDayOfMonth(currentMonth, currentYear))
                  .fill(null)
                  .map((_, index) => (
                    <div key={`empty-${index}`} className="p-2 h-14 border border-[#a7d5e6]"></div>
                  ))}

                {/* Jours du mois */}
                {Array(daysInMonth(currentMonth, currentYear))
                  .fill(null)
                  .map((_, index) => {
                    const day = index + 1
                    const isToday =
                      day === new Date().getDate() &&
                      currentMonth === new Date().getMonth() &&
                      currentYear === new Date().getFullYear()
                    const isSelected =
                      selectedDate &&
                      day === selectedDate.getDate() &&
                      currentMonth === selectedDate.getMonth() &&
                      currentYear === selectedDate.getFullYear()
                    const reservationCount = getReservationCountForDate(day)

                    return (
                      <div
                        key={`day-${day}`}
                        className={`p-2 h-14 border border-[#a7d5e6] relative cursor-pointer ${
                          isToday ? "bg-[#e6f3f7]" : ""
                        } ${isSelected ? "bg-[#a7d5e6] font-bold" : ""} hover:bg-[#e6f3f7]`}
                        onClick={() => handleDateSelect(day)}
                      >
                        <div className={`text-lg text-[#1a4a5a] ${isSelected ? "font-bold" : ""}`}>{day}</div>
                        {reservationCount > 0 && (
                          <div className="absolute bottom-1 right-1 bg-[#3a95b5] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold cursor-pointer">
                            {reservationCount}
                          </div>
                        )}
                      </div>
                    )
                  })}

                {/* Cellules vides pour compléter la dernière ligne */}
                {(() => {
                  const totalCells =
                    getFirstDayOfMonth(currentMonth, currentYear) + daysInMonth(currentMonth, currentYear)
                  const remainingCells = 7 - (totalCells % 7)
                  return remainingCells < 7
                    ? Array(remainingCells)
                        .fill(null)
                        .map((_, index) => (
                          <div key={`empty-end-${index}`} className="p-2 h-14 border border-[#a7d5e6]"></div>
                        ))
                    : null
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#a7d5e6] shadow-lg">
          <CardHeader className="bg-[#e6f3f7] border-b border-[#a7d5e6] pb-2">
            <CardTitle className="text-[#1a4a5a]">
              {selectedDate?.toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-[#f8fcfd]">
            {dayReservations.length === 0 ? (
              <p className="text-[#3a95b5] text-sm">Aucune réservation pour cette date</p>
            ) : (
              <ul className="space-y-3">
                {dayReservations.map((res) => {
                  const boat = boats.find((b) => b.id === res.boatId)
                  const customer = customers.find((c) => c.id === res.customerId)
                  return (
                    <li
                      key={res.id}
                      className="border border-[#a7d5e6] rounded-md p-3 cursor-pointer hover:bg-[#e6f3f7] transition-colors bg-white shadow-sm"
                      onClick={() => setSelectedReservationId(res.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-[#1a4a5a]">{boat?.name || "Bateau inconnu"}</p>
                          <p className="text-sm text-[#3a95b5]">
                            {customer ? `${customer.firstName} ${customer.lastName}` : "Client inconnu"}
                          </p>
                        </div>
                        <Badge
                          className={
                            res.status === "confirmed"
                              ? "bg-[#3a95b5]"
                              : res.status === "in-progress"
                                ? "bg-amber-500"
                                : res.status === "completed"
                                  ? "bg-green-500"
                                  : res.status === "cancelled"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                          }
                        >
                          {res.status === "confirmed"
                            ? "Confirmée"
                            : res.status === "in-progress"
                              ? "En cours"
                              : res.status === "completed"
                                ? "Terminée"
                                : res.status === "cancelled"
                                  ? "Annulée"
                                  : "En attente"}
                        </Badge>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#a7d5e6] shadow-lg">
          <CardHeader className="bg-[#e6f3f7] border-b border-[#a7d5e6] pb-2">
            <CardTitle className="text-[#1a4a5a]">Statistiques du mois</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-[#f8fcfd]">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#3a95b5]">Total des réservations:</span>
                <span className="font-bold text-[#1a4a5a]">{reservations.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#3a95b5]">Bateaux disponibles:</span>
                <span className="font-bold text-[#1a4a5a]">
                  {boats.filter((b) => b.status === "available").length} / {boats.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#3a95b5]">Taux d'occupation:</span>
                <span className="font-bold text-[#1a4a5a]">
                  {boats.length > 0
                    ? Math.round((boats.filter((b) => b.status !== "available").length / boats.length) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#a7d5e6] shadow-lg">
          <CardHeader className="bg-[#e6f3f7] border-b border-[#a7d5e6] pb-2">
            <CardTitle className="text-[#1a4a5a]">Réservations à venir</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-[#f8fcfd]">
            <div className="space-y-2">
              {reservations
                .filter((r) => new Date(r.startDate) > new Date())
                .slice(0, 3)
                .map((r) => {
                  const boat = boats.find((b) => b.id === r.boatId)
                  const customer = customers.find((c) => c.id === r.customerId)
                  return (
                    <div key={r.id} className="border border-[#a7d5e6] rounded p-2 bg-white">
                      <div className="text-sm text-[#3a95b5]">{new Date(r.startDate).toLocaleDateString("fr-FR")}</div>
                      <div className="font-medium text-[#1a4a5a]">{boat?.name || "Bateau inconnu"}</div>
                      <div className="text-xs text-[#3a95b5]">
                        {customer ? `${customer.firstName} ${customer.lastName}` : "Client inconnu"}
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#a7d5e6] shadow-lg">
          <CardHeader className="bg-[#e6f3f7] border-b border-[#a7d5e6] pb-2">
            <CardTitle className="text-[#1a4a5a]">Légende</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-[#f8fcfd]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-[#3a95b5]">Confirmée</Badge>
                <span className="text-[#3a95b5]">Réservation confirmée</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500">En cours</Badge>
                <span className="text-[#3a95b5]">Location en cours</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Terminée</Badge>
                <span className="text-[#3a95b5]">Location terminée</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500">Annulée</Badge>
                <span className="text-[#3a95b5]">Réservation annulée</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-500">En attente</Badge>
                <span className="text-[#3a95b5]">En attente de confirmation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
