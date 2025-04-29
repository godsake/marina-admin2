"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function SecuritySettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [passwordMinLength, setPasswordMinLength] = useState("8")
  const [sessionTimeout, setSessionTimeout] = useState("30")

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
          <CardTitle>Authentification</CardTitle>
          <CardDescription>Configurez les paramètres d'authentification et de sécurité</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="auth-provider">Fournisseur d'authentification</Label>
            <Select defaultValue="local">
              <SelectTrigger id="auth-provider">
                <SelectValue placeholder="Sélectionner un fournisseur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local (base de données)</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="microsoft">Microsoft</SelectItem>
                <SelectItem value="auth0">Auth0</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">Exiger une vérification en deux étapes pour la connexion</p>
            </div>
            <Switch id="two-factor" defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="password-min-length">Longueur minimale du mot de passe</Label>
            <Input
              id="password-min-length"
              type="number"
              value={passwordMinLength}
              onChange={(e) => setPasswordMinLength(e.target.value)}
              min="6"
              max="32"
            />
          </div>
          <div className="space-y-4">
            <Label>Exigences de mot de passe</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="password-uppercase" defaultChecked />
                <Label htmlFor="password-uppercase">Au moins une majuscule</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="password-lowercase" defaultChecked />
                <Label htmlFor="password-lowercase">Au moins une minuscule</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="password-number" defaultChecked />
                <Label htmlFor="password-number">Au moins un chiffre</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="password-special" defaultChecked />
                <Label htmlFor="password-special">Au moins un caractère spécial</Label>
              </div>
            </div>
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
          <CardTitle>Sessions</CardTitle>
          <CardDescription>Configurez les paramètres de session et de déconnexion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Délai d'expiration de session (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              min="5"
              max="1440"
            />
            <p className="text-sm text-muted-foreground">Durée d'inactivité avant déconnexion automatique</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="remember-me">Option "Se souvenir de moi"</Label>
              <p className="text-sm text-muted-foreground">Permettre aux utilisateurs de rester connectés</p>
            </div>
            <Switch id="remember-me" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="force-logout">Déconnexion forcée</Label>
              <p className="text-sm text-muted-foreground">
                Déconnecter les utilisateurs lors d'un changement de mot de passe
              </p>
            </div>
            <Switch id="force-logout" defaultChecked />
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
          <CardTitle>Rôles et permissions</CardTitle>
          <CardDescription>Configurez les rôles et les permissions des utilisateurs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Rôle: Administrateur</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="admin-manage-users" defaultChecked />
                <Label htmlFor="admin-manage-users">Gérer les utilisateurs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="admin-manage-boats" defaultChecked />
                <Label htmlFor="admin-manage-boats">Gérer les bateaux</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="admin-manage-reservations" defaultChecked />
                <Label htmlFor="admin-manage-reservations">Gérer les réservations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="admin-manage-payments" defaultChecked />
                <Label htmlFor="admin-manage-payments">Gérer les paiements</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="admin-manage-settings" defaultChecked />
                <Label htmlFor="admin-manage-settings">Gérer les paramètres</Label>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Rôle: Gestionnaire</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="manager-manage-users" />
                <Label htmlFor="manager-manage-users">Gérer les utilisateurs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="manager-manage-boats" defaultChecked />
                <Label htmlFor="manager-manage-boats">Gérer les bateaux</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="manager-manage-reservations" defaultChecked />
                <Label htmlFor="manager-manage-reservations">Gérer les réservations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="manager-manage-payments" defaultChecked />
                <Label htmlFor="manager-manage-payments">Gérer les paiements</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="manager-manage-settings" />
                <Label htmlFor="manager-manage-settings">Gérer les paramètres</Label>
              </div>
            </div>
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
