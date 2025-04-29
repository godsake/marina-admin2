"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PaymentSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [currency, setCurrency] = useState("CAD")
  const [taxRate, setTaxRate] = useState("14.975")

  // PayPal
  const [paypalEnabled, setPaypalEnabled] = useState(true)
  const [paypalClientId, setPaypalClientId] = useState("sb-xxxxxxxxxxxxxxxx")
  const [paypalSecret, setPaypalSecret] = useState("••••••••••••••••••••••••")
  const [paypalSandbox, setPaypalSandbox] = useState(true)

  // Stripe
  const [stripeEnabled, setStripeEnabled] = useState(false)
  const [stripePublishableKey, setStripePublishableKey] = useState("")
  const [stripeSecretKey, setStripeSecretKey] = useState("")
  const [stripeTestMode, setStripeTestMode] = useState(true)

  const handleSave = async () => {
    setIsSaving(true)
    // Simuler une sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres généraux de paiement</CardTitle>
          <CardDescription>Configurez les options générales de paiement pour votre marina</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currency">Devise</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Sélectionner une devise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CAD">Dollar canadien ($ CAD)</SelectItem>
                <SelectItem value="USD">Dollar américain ($ USD)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-rate">Taux de taxe (%)</Label>
            <Input
              id="tax-rate"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              step="0.001"
              min="0"
              max="100"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="deposit-required">Acompte obligatoire</Label>
              <p className="text-sm text-muted-foreground">Exiger un acompte pour confirmer les réservations</p>
            </div>
            <Switch id="deposit-required" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Passerelles de paiement</CardTitle>
          <CardDescription>Configurez les passerelles de paiement pour accepter les paiements en ligne</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="paypal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="stripe">Stripe</TabsTrigger>
              <TabsTrigger value="other">Autres méthodes</TabsTrigger>
            </TabsList>
            <TabsContent value="paypal" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="paypal-enabled">Activer PayPal</Label>
                  <p className="text-sm text-muted-foreground">Permettre les paiements via PayPal</p>
                </div>
                <Switch id="paypal-enabled" checked={paypalEnabled} onCheckedChange={setPaypalEnabled} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="paypal-client-id">Client ID</Label>
                <Input
                  id="paypal-client-id"
                  value={paypalClientId}
                  onChange={(e) => setPaypalClientId(e.target.value)}
                  disabled={!paypalEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-secret">Secret</Label>
                <Input
                  id="paypal-secret"
                  type="password"
                  value={paypalSecret}
                  onChange={(e) => setPaypalSecret(e.target.value)}
                  disabled={!paypalEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="paypal-sandbox">Mode Sandbox</Label>
                  <p className="text-sm text-muted-foreground">Utiliser l'environnement de test PayPal</p>
                </div>
                <Switch
                  id="paypal-sandbox"
                  checked={paypalSandbox}
                  onCheckedChange={setPaypalSandbox}
                  disabled={!paypalEnabled}
                />
              </div>
            </TabsContent>
            <TabsContent value="stripe" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="stripe-enabled">Activer Stripe</Label>
                  <p className="text-sm text-muted-foreground">Permettre les paiements via Stripe</p>
                </div>
                <Switch id="stripe-enabled" checked={stripeEnabled} onCheckedChange={setStripeEnabled} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="stripe-publishable-key">Clé publique</Label>
                <Input
                  id="stripe-publishable-key"
                  value={stripePublishableKey}
                  onChange={(e) => setStripePublishableKey(e.target.value)}
                  disabled={!stripeEnabled}
                  placeholder="pk_test_..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret-key">Clé secrète</Label>
                <Input
                  id="stripe-secret-key"
                  type="password"
                  value={stripeSecretKey}
                  onChange={(e) => setStripeSecretKey(e.target.value)}
                  disabled={!stripeEnabled}
                  placeholder="sk_test_..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="stripe-test-mode">Mode test</Label>
                  <p className="text-sm text-muted-foreground">Utiliser l'environnement de test Stripe</p>
                </div>
                <Switch
                  id="stripe-test-mode"
                  checked={stripeTestMode}
                  onCheckedChange={setStripeTestMode}
                  disabled={!stripeEnabled}
                />
              </div>
            </TabsContent>
            <TabsContent value="other" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cash-enabled">Espèces</Label>
                  <p className="text-sm text-muted-foreground">Accepter les paiements en espèces</p>
                </div>
                <Switch id="cash-enabled" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="check-enabled">Chèques</Label>
                  <p className="text-sm text-muted-foreground">Accepter les paiements par chèque</p>
                </div>
                <Switch id="check-enabled" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="transfer-enabled">Virements bancaires</Label>
                  <p className="text-sm text-muted-foreground">Accepter les paiements par virement bancaire</p>
                </div>
                <Switch id="transfer-enabled" defaultChecked />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reçus et factures</CardTitle>
          <CardDescription>Configurez les options pour les reçus et factures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Nom de l'entreprise</Label>
            <Input id="company-name" defaultValue="Marina Québec Inc." placeholder="Nom de votre entreprise" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Adresse</Label>
            <Input
              id="company-address"
              defaultValue="123 Rue du Port, Québec, QC G1K 3X2"
              placeholder="Adresse de votre entreprise"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-tax-id">Numéro de TVQ/TPS</Label>
            <Input
              id="company-tax-id"
              defaultValue="TVQ: 1234567890 | TPS: 123456789RT0001"
              placeholder="Numéros de taxes"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-send-receipts">Envoi automatique des reçus</Label>
              <p className="text-sm text-muted-foreground">Envoyer automatiquement les reçus par email</p>
            </div>
            <Switch id="auto-send-receipts" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
