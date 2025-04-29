"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CommunicationSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [emailProvider, setEmailProvider] = useState("smtp")

  // SMTP
  const [smtpHost, setSmtpHost] = useState("smtp.example.com")
  const [smtpPort, setSmtpPort] = useState("587")
  const [smtpUsername, setSmtpUsername] = useState("user@example.com")
  const [smtpPassword, setSmtpPassword] = useState("••••••••••••")
  const [smtpEncryption, setSmtpEncryption] = useState("tls")

  // SendGrid
  const [sendgridApiKey, setSendgridApiKey] = useState("")

  // Mailchimp
  const [mailchimpApiKey, setMailchimpApiKey] = useState("")
  const [mailchimpListId, setMailchimpListId] = useState("")

  const handleSave = async () => {
    setIsSaving(true)
    // Simuler une sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleTestEmail = async () => {
    // Simuler l'envoi d'un email de test
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Email de test envoyé avec succès!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuration des emails</CardTitle>
          <CardDescription>Configurez les paramètres d'envoi d'emails</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="smtp" className="space-y-4">
            <TabsList>
              <TabsTrigger value="smtp">SMTP</TabsTrigger>
              <TabsTrigger value="sendgrid">SendGrid</TabsTrigger>
              <TabsTrigger value="mailchimp">Mailchimp</TabsTrigger>
            </TabsList>
            <TabsContent value="smtp" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Serveur SMTP</Label>
                <Input
                  id="smtp-host"
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                  placeholder="smtp.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Port</Label>
                <Input
                  id="smtp-port"
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(e.target.value)}
                  placeholder="587"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-username">Nom d'utilisateur</Label>
                <Input
                  id="smtp-username"
                  value={smtpUsername}
                  onChange={(e) => setSmtpUsername(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Mot de passe</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  value={smtpPassword}
                  onChange={(e) => setSmtpPassword(e.target.value)}
                  placeholder="••••••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-encryption">Chiffrement</Label>
                <Select value={smtpEncryption} onValueChange={setSmtpEncryption}>
                  <SelectTrigger id="smtp-encryption">
                    <SelectValue placeholder="Sélectionner un type de chiffrement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="none">Aucun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="sendgrid" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sendgrid-api-key">Clé API SendGrid</Label>
                <Input
                  id="sendgrid-api-key"
                  type="password"
                  value={sendgridApiKey}
                  onChange={(e) => setSendgridApiKey(e.target.value)}
                  placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxx"
                />
              </div>
            </TabsContent>
            <TabsContent value="mailchimp" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mailchimp-api-key">Clé API Mailchimp</Label>
                <Input
                  id="mailchimp-api-key"
                  type="password"
                  value={mailchimpApiKey}
                  onChange={(e) => setMailchimpApiKey(e.target.value)}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxx-us1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mailchimp-list-id">ID de liste</Label>
                <Input
                  id="mailchimp-list-id"
                  value={mailchimpListId}
                  onChange={(e) => setMailchimpListId(e.target.value)}
                  placeholder="abc123def"
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6">
            <Button variant="outline" onClick={handleTestEmail}>
              Envoyer un email de test
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modèles d'emails</CardTitle>
          <CardDescription>Personnalisez les modèles d'emails envoyés aux clients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email-from">Adresse d'expéditeur</Label>
            <Input
              id="email-from"
              defaultValue="reservations@marina-quebec.com"
              placeholder="Adresse email d'expéditeur"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-name">Nom d'expéditeur</Label>
            <Input id="email-name" defaultValue="Marina Québec" placeholder="Nom d'expéditeur" />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="email-confirmation">Modèle de confirmation de réservation</Label>
            <Textarea
              id="email-confirmation"
              className="min-h-[200px]"
              defaultValue={`Bonjour {client_name},

Nous confirmons votre réservation du bateau {boat_name} pour le {reservation_date}.

Détails de la réservation:
- Date: {reservation_date}
- Heure: {reservation_time}
- Bateau: {boat_name}
- Montant: {amount} $ CAD

Merci de votre confiance!

L'équipe de Marina Québec`}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS et notifications</CardTitle>
          <CardDescription>Configurez les paramètres pour les notifications SMS</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-enabled">Activer les notifications SMS</Label>
              <p className="text-sm text-muted-foreground">Envoyer des notifications par SMS aux clients</p>
            </div>
            <Switch id="sms-enabled" defaultChecked={false} />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="sms-provider">Fournisseur SMS</Label>
            <Select defaultValue="twilio">
              <SelectTrigger id="sms-provider">
                <SelectValue placeholder="Sélectionner un fournisseur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twilio">Twilio</SelectItem>
                <SelectItem value="nexmo">Nexmo (Vonage)</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="twilio-sid">Twilio Account SID</Label>
            <Input id="twilio-sid" placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twilio-token">Twilio Auth Token</Label>
            <Input id="twilio-token" type="password" placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twilio-phone">Numéro de téléphone Twilio</Label>
            <Input id="twilio-phone" placeholder="+15551234567" />
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
