"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettings } from "./general-settings"
import { PaymentSettings } from "./payment-settings"
import { CommunicationSettings } from "./communication-settings"
import { SecuritySettings } from "./security-settings"

export function ParametresTabs() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-4 md:w-[600px]">
        <TabsTrigger value="general">Général</TabsTrigger>
        <TabsTrigger value="payment">Paiement</TabsTrigger>
        <TabsTrigger value="communication">Communication</TabsTrigger>
        <TabsTrigger value="security">Sécurité</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="space-y-4">
        <GeneralSettings />
      </TabsContent>
      <TabsContent value="payment" className="space-y-4">
        <PaymentSettings />
      </TabsContent>
      <TabsContent value="communication" className="space-y-4">
        <CommunicationSettings />
      </TabsContent>
      <TabsContent value="security" className="space-y-4">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  )
}
