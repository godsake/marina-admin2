"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sun, Moon, Monitor } from "lucide-react"

export function GeneralSettings() {
  const { theme, setTheme } = useTheme()
  const [marinaName, setMarinaName] = useState("Marina Admin")
  const [language, setLanguage] = useState("fr")
  const [timezone, setTimezone] = useState("America/Montreal")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  const [isSaving, setIsSaving] = useState(false)

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
          <CardTitle>Apparence</CardTitle>
          <CardDescription>Personnalisez l'apparence de votre interface d'administration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Thème</Label>
            <div className="flex items-center space-x-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Clair
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Sombre
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="flex items-center gap-2"
              >
                <Monitor className="h-4 w-4" />
                Système
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="marina-name">Nom de la marina</Label>
            <Input
              id="marina-name"
              value={marinaName}
              onChange={(e) => setMarinaName(e.target.value)}
              placeholder="Nom de votre marina"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Localisation</CardTitle>
          <CardDescription>Configurez les paramètres régionaux de votre application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="language">Langue</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Sélectionner une langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Fuseau horaire</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Sélectionner un fuseau horaire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Montreal">Montréal (UTC-5)</SelectItem>
                <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (UTC+1)</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-format">Format de date</Label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger id="date-format">
                <SelectValue placeholder="Sélectionner un format de date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">JJ/MM/AAAA</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/JJ/AAAA</SelectItem>
                <SelectItem value="YYYY-MM-DD">AAAA-MM-JJ</SelectItem>
              </SelectContent>
            </Select>
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
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configurez les notifications du système</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-email">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
            </div>
            <Switch id="notifications-email" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-browser">Notifications navigateur</Label>
              <p className="text-sm text-muted-foreground">Afficher des notifications dans le navigateur</p>
            </div>
            <Switch id="notifications-browser" defaultChecked />
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
