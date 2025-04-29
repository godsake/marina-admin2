"use client"

import { useEffect, useState } from "react"
import { getCustomers, type Customer } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Calendar, CreditCard } from "lucide-react"

export function ClientsTable() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await getCustomers()
      setCustomers(customersData)
    }

    fetchData()
  }, [])

  const getDiscountBadge = (rentalCount: number) => {
    if (rentalCount >= 10) {
      return <Badge className="bg-purple-500">50% Rabais</Badge>
    } else if (rentalCount >= 5) {
      return <Badge className="bg-blue-500">25% Rabais</Badge>
    } else if (rentalCount >= 3) {
      return <Badge className="bg-green-500">10% Rabais</Badge>
    }
    return null
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Permis</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Rabais</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Aucun client trouvé
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="font-medium">
                      {customer.firstName} {customer.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">{customer.id}</div>
                  </TableCell>
                  <TableCell>
                    <div>{customer.email}</div>
                    <div className="text-sm text-muted-foreground">{customer.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div>{customer.licenseNumber}</div>
                    {customer.fishingPermit && (
                      <Badge variant="outline" className="mt-1">
                        Permis de pêche
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{customer.rentalCount}</TableCell>
                  <TableCell>{getDiscountBadge(customer.rentalCount)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Détails</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Modifier</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Réservations</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Paiements</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
