import { create } from "zustand"

interface ReservationStore {
  selectedReservationId: string | null
  setSelectedReservationId: (id: string | null) => void
}

export const useReservationStore = create<ReservationStore>((set) => ({
  selectedReservationId: null,
  setSelectedReservationId: (id) => set({ selectedReservationId: id }),
}))
