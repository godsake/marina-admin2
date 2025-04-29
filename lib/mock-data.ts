// Types
export type BoatStatus = "available" | "rented" | "maintenance" | "inspection"

export type Boat = {
  id: string
  name: string
  type: string
  capacity: number
  pricePerHour: number
  pricePerDay: number
  status: BoatStatus
  fuelLevel: number
  equipment: string[]
  image: string
}

export type Customer = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  licenseNumber: string
  fishingPermit: boolean
  rentalCount: number
  notes: string
}

export type ReservationStatus = "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"

export type Reservation = {
  id: string
  boatId: string
  customerId: string
  startDate: string
  endDate: string
  status: ReservationStatus
  totalPrice: number
  deposit: number
  balance: number
  notes: string
}

export type PaymentMethod = "card" | "cash" | "transfer" | "check"

export type PaymentStatus = "pending" | "completed" | "refunded" | "failed"

export type Payment = {
  id: string
  reservationId: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  date: string
  receiptNumber: string
}

export type MaintenanceType = "routine" | "repair" | "inspection" | "cleaning"

export type MaintenanceStatus = "pending" | "in-progress" | "completed"

export type Maintenance = {
  id: string
  boatId: string
  type: MaintenanceType
  description: string
  status: MaintenanceStatus
  reportedDate: string
  completedDate: string | null
  cost: number
  notes: string
}

export type UrgentTask = {
  id: string
  type: "late-return" | "inspection-needed" | "maintenance-required" | "payment-due"
  relatedId: string
  description: string
  createdAt: string
}

// Mock Data
export const boats: Boat[] = [
  {
    id: "boat-1",
    name: "Aqua Dream",
    type: "Pontoon",
    capacity: 8,
    pricePerHour: 75,
    pricePerDay: 350,
    status: "available",
    fuelLevel: 100,
    equipment: ["Life jackets", "Cooler", "Bluetooth speaker", "Fishing gear"],
    image: "/lakeside-leisure.png",
  },
  {
    id: "boat-2",
    name: "Wave Runner",
    type: "Speedboat",
    capacity: 6,
    pricePerHour: 95,
    pricePerDay: 450,
    status: "rented",
    fuelLevel: 85,
    equipment: ["Life jackets", "Wakeboard", "Tube", "GPS"],
    image: "/sleek-speedboat-on-open-water.png",
  },
  {
    id: "boat-3",
    name: "Fisher King",
    type: "Fishing Boat",
    capacity: 4,
    pricePerHour: 65,
    pricePerDay: 300,
    status: "maintenance",
    fuelLevel: 50,
    equipment: ["Life jackets", "Fishing rods", "Tackle box", "Fish finder"],
    image: "/weathered-trawler.png",
  },
  {
    id: "boat-4",
    name: "Sun Seeker",
    type: "Deck Boat",
    capacity: 10,
    pricePerHour: 85,
    pricePerDay: 400,
    status: "available",
    fuelLevel: 90,
    equipment: ["Life jackets", "Cooler", "Bluetooth speaker", "Swim ladder"],
    image: "/family-fun-deck-boat.png",
  },
  {
    id: "boat-5",
    name: "Water Glider",
    type: "Jet Ski",
    capacity: 2,
    pricePerHour: 55,
    pricePerDay: 250,
    status: "inspection",
    fuelLevel: 75,
    equipment: ["Life jackets"],
    image: "/sunny-day-ride.png",
  },
]

export const customers: Customer[] = [
  {
    id: "cust-1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "514-555-1234",
    address: "123 Rue Principale, Montréal, QC",
    licenseNumber: "D1234-56789",
    fishingPermit: true,
    rentalCount: 8,
    notes: "Client régulier, préfère les bateaux de pêche",
  },
  {
    id: "cust-2",
    firstName: "Marie",
    lastName: "Tremblay",
    email: "marie.tremblay@example.com",
    phone: "450-555-5678",
    address: "456 Boulevard St-Laurent, Laval, QC",
    licenseNumber: "T5678-12345",
    fishingPermit: false,
    rentalCount: 3,
    notes: "Préfère les pontons pour sorties familiales",
  },
  {
    id: "cust-3",
    firstName: "Pierre",
    lastName: "Lavoie",
    email: "pierre.lavoie@example.com",
    phone: "819-555-9012",
    address: "789 Chemin du Lac, Gatineau, QC",
    licenseNumber: "L9012-34567",
    fishingPermit: true,
    rentalCount: 12,
    notes: "VIP, client depuis 5 ans",
  },
  {
    id: "cust-4",
    firstName: "Sophie",
    lastName: "Bergeron",
    email: "sophie.bergeron@example.com",
    phone: "418-555-3456",
    address: "321 Avenue des Pins, Québec, QC",
    licenseNumber: "B3456-78901",
    fishingPermit: false,
    rentalCount: 1,
    notes: "Première location en juillet 2023",
  },
  {
    id: "cust-5",
    firstName: "Michel",
    lastName: "Gagnon",
    email: "michel.gagnon@example.com",
    phone: "514-555-7890",
    address: "654 Rue Notre-Dame, Montréal, QC",
    licenseNumber: "G7890-12345",
    fishingPermit: true,
    rentalCount: 5,
    notes: "Aime les jet-skis",
  },
]

// Generate dates for the next 30 days
const generateDates = () => {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push(date.toISOString())
  }
  return dates
}

const dates = generateDates()

export const reservations: Reservation[] = [
  {
    id: "res-1",
    boatId: "boat-2",
    customerId: "cust-1",
    startDate: dates[0],
    endDate: dates[0],
    status: "in-progress",
    totalPrice: 450,
    deposit: 100,
    balance: 350,
    notes: "Location à la journée",
  },
  {
    id: "res-2",
    boatId: "boat-4",
    customerId: "cust-2",
    startDate: dates[2],
    endDate: dates[2],
    status: "confirmed",
    totalPrice: 400,
    deposit: 100,
    balance: 300,
    notes: "Sortie familiale",
  },
  {
    id: "res-3",
    boatId: "boat-1",
    customerId: "cust-3",
    startDate: dates[5],
    endDate: dates[6],
    status: "confirmed",
    totalPrice: 700,
    deposit: 200,
    balance: 500,
    notes: "Weekend complet",
  },
  {
    id: "res-4",
    boatId: "boat-5",
    customerId: "cust-4",
    startDate: dates[1],
    endDate: dates[1],
    status: "completed",
    totalPrice: 165,
    deposit: 50,
    balance: 115,
    notes: "Location de 3 heures",
  },
  {
    id: "res-5",
    boatId: "boat-3",
    customerId: "cust-5",
    startDate: dates[10],
    endDate: dates[10],
    status: "pending",
    totalPrice: 300,
    deposit: 0,
    balance: 300,
    notes: "Journée de pêche",
  },
]

export const payments: Payment[] = [
  {
    id: "pay-1",
    reservationId: "res-1",
    amount: 100,
    method: "card",
    status: "completed",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    receiptNumber: "R-2023-001",
  },
  {
    id: "pay-2",
    reservationId: "res-2",
    amount: 100,
    method: "transfer",
    status: "completed",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    receiptNumber: "R-2023-002",
  },
  {
    id: "pay-3",
    reservationId: "res-3",
    amount: 200,
    method: "card",
    status: "completed",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    receiptNumber: "R-2023-003",
  },
  {
    id: "pay-4",
    reservationId: "res-4",
    amount: 165,
    method: "cash",
    status: "completed",
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    receiptNumber: "R-2023-004",
  },
]

export const maintenances: Maintenance[] = [
  {
    id: "maint-1",
    boatId: "boat-3",
    type: "repair",
    description: "Réparation du moteur",
    status: "in-progress",
    reportedDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    completedDate: null,
    cost: 350,
    notes: "Pièces commandées, attente de livraison",
  },
  {
    id: "maint-2",
    boatId: "boat-5",
    type: "inspection",
    description: "Inspection de routine",
    status: "pending",
    reportedDate: new Date().toISOString(),
    completedDate: null,
    cost: 0,
    notes: "Planifiée pour demain",
  },
  {
    id: "maint-3",
    boatId: "boat-1",
    type: "cleaning",
    description: "Nettoyage complet",
    status: "completed",
    reportedDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    completedDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    cost: 75,
    notes: "Nettoyage intérieur et extérieur",
  },
]

export const urgentTasks: UrgentTask[] = [
  {
    id: "task-1",
    type: "late-return",
    relatedId: "res-1",
    description: "Retard de retour: Bateau Wave Runner (Jean Dupont)",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    type: "inspection-needed",
    relatedId: "boat-5",
    description: "Inspection requise: Jet Ski Water Glider",
    createdAt: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
  },
  {
    id: "task-3",
    type: "maintenance-required",
    relatedId: "boat-3",
    description: "Maintenance urgente: Bateau Fisher King (problème de moteur)",
    createdAt: new Date(new Date().setHours(new Date().getHours() - 5)).toISOString(),
  },
]

// Helper functions to simulate API calls
export const getBoats = () => {
  return Promise.resolve(boats)
}

export const getBoat = (id: string) => {
  const boat = boats.find((b) => b.id === id)
  return Promise.resolve(boat || null)
}

export const getCustomers = () => {
  return Promise.resolve(customers)
}

export const getCustomer = (id: string) => {
  const customer = customers.find((c) => c.id === id)
  return Promise.resolve(customer || null)
}

export const getReservations = () => {
  return Promise.resolve(reservations)
}

export const getReservation = (id: string) => {
  const reservation = reservations.find((r) => r.id === id)
  return Promise.resolve(reservation || null)
}

export const getPayments = () => {
  return Promise.resolve(payments)
}

export const getPayment = (id: string) => {
  const payment = payments.find((p) => p.id === id)
  return Promise.resolve(payment || null)
}

export const getMaintenances = () => {
  return Promise.resolve(maintenances)
}

export const getMaintenance = (id: string) => {
  const maintenance = maintenances.find((m) => m.id === id)
  return Promise.resolve(maintenance || null)
}

export const getUrgentTasks = () => {
  return Promise.resolve(urgentTasks)
}

export const getCustomerReservations = (customerId: string) => {
  const customerReservations = reservations.filter((r) => r.customerId === customerId)
  return Promise.resolve(customerReservations)
}

export const getBoatReservations = (boatId: string) => {
  const boatReservations = reservations.filter((r) => r.boatId === boatId)
  return Promise.resolve(boatReservations)
}

export const getReservationPayments = (reservationId: string) => {
  const reservationPayments = payments.filter((p) => p.reservationId === reservationId)
  return Promise.resolve(reservationPayments)
}

export const getBoatMaintenances = (boatId: string) => {
  const boatMaintenances = maintenances.filter((m) => m.boatId === boatId)
  return Promise.resolve(boatMaintenances)
}
