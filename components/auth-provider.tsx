"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "staff"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading the user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("marina-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    if (email === "admin@marina.com" && password === "password") {
      const user = {
        id: "1",
        name: "Admin",
        email: "admin@marina.com",
        role: "admin",
      } as User

      setUser(user)
      localStorage.setItem("marina-user", JSON.stringify(user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("marina-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
