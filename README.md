### Webhooks n8n pour l'application Marina Admin

Voici un tableau des webhooks potentiels vers n8n pour l'application de gestion de marina. Ces webhooks peuvent être utilisés pour intégrer l'application avec des workflows automatisés via n8n.

| Fonctionnalité | URL du Webhook | Méthode | Description
|-----|-----|-----|-----
| Récupérer les bateaux | [https://n8n.srv798586.hstgr.cloud/webhook/get-boats](https://n8n.srv798586.hstgr.cloud/webhook/get-boats) | GET | Récupère la liste complète des bateaux
| Récupérer un bateau | [https://n8n.srv798586.hstgr.cloud/webhook/get-boat/:id](https://n8n.srv798586.hstgr.cloud/webhook/get-boat/:id) | GET | Récupère les détails d'un bateau spécifique
| Récupérer les clients | [https://n8n.srv798586.hstgr.cloud/webhook/get-customers](https://n8n.srv798586.hstgr.cloud/webhook/get-customers) | GET | Récupère la liste complète des clients
| Récupérer un client | [https://n8n.srv798586.hstgr.cloud/webhook/get-customer/:id](https://n8n.srv798586.hstgr.cloud/webhook/get-customer/:id) | GET | Récupère les détails d'un client spécifique
| Récupérer les réservations | [https://n8n.srv798586.hstgr.cloud/webhook/get-reservations](https://n8n.srv798586.hstgr.cloud/webhook/get-reservations) | GET | Récupère la liste complète des réservations
| Récupérer une réservation | [https://n8n.srv798586.hstgr.cloud/webhook/get-reservation/:id](https://n8n.srv798586.hstgr.cloud/webhook/get-reservation/:id) | GET | Récupère les détails d'une réservation spécifique
| Créer une réservation | [https://n8n.srv798586.hstgr.cloud/webhook/create-reservation](https://n8n.srv798586.hstgr.cloud/webhook/create-reservation) | POST | Crée une nouvelle réservation
| Mettre à jour une réservation | [https://n8n.srv798586.hstgr.cloud/webhook/update-reservation/:id](https://n8n.srv798586.hstgr.cloud/webhook/update-reservation/:id) | PUT | Met à jour une réservation existante
| Récupérer les paiements | [https://n8n.srv798586.hstgr.cloud/webhook/get-payments](https://n8n.srv798586.hstgr.cloud/webhook/get-payments) | GET | Récupère la liste des paiements
| Créer un paiement | [https://n8n.srv798586.hstgr.cloud/webhook/create-payment](https://n8n.srv798586.hstgr.cloud/webhook/create-payment) | POST | Enregistre un nouveau paiement
| Récupérer les maintenances | [https://n8n.srv798586.hstgr.cloud/webhook/get-maintenances](https://n8n.srv798586.hstgr.cloud/webhook/get-maintenances) | GET | Récupère la liste des opérations de maintenance
| Récupérer les tâches urgentes | [https://n8n.srv798586.hstgr.cloud/webhook/get-urgent-tasks](https://n8n.srv798586.hstgr.cloud/webhook/get-urgent-tasks) | GET | Récupère la liste des tâches urgentes


## Exemple d'utilisation

Pour intégrer ces webhooks avec n8n:

1. Créez un nouveau workflow dans n8n
2. Ajoutez un nœud "Webhook" comme déclencheur
3. Configurez l'URL du webhook (par exemple, `/webhook/get-boats`)
4. Connectez ce webhook à d'autres nœuds pour traiter les données ou déclencher des actions


Ces webhooks peuvent être utilisés pour automatiser diverses tâches comme:

- Envoyer des notifications automatiques pour les réservations
- Générer des rapports quotidiens sur l'occupation des bateaux
- Synchroniser les données avec d'autres systèmes
- Envoyer des rappels pour les maintenances à venir


### Exemples de Payloads JSON pour les Webhooks n8n

Voici des exemples de payloads JSON pour chacun des webhooks listés précédemment:

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-boats](https://n8n.srv798586.hstgr.cloud/webhook/get-boats)

**Réponse:**

```json
{
  "boats": [
    {
      "id": "boat-1",
      "name": "Aqua Dream",
      "type": "Pontoon",
      "capacity": 8,
      "pricePerHour": 75,
      "pricePerDay": 350,
      "status": "available",
      "fuelLevel": 100,
      "equipment": ["Life jackets", "Cooler", "Bluetooth speaker", "Fishing gear"],
      "image": "/lakeside-leisure.png"
    },
    {
      "id": "boat-2",
      "name": "Wave Runner",
      "type": "Speedboat",
      "capacity": 6,
      "pricePerHour": 95,
      "pricePerDay": 450,
      "status": "rented",
      "fuelLevel": 85,
      "equipment": ["Life jackets", "Wakeboard", "Tube", "GPS"],
      "image": "/sleek-speedboat-on-open-water.png"
    }
  ]
}
```

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-boat/:id](https://n8n.srv798586.hstgr.cloud/webhook/get-boat/:id)

**Réponse:**

```json
{
  "boat": {
    "id": "boat-1",
    "name": "Aqua Dream",
    "type": "Pontoon",
    "capacity": 8,
    "pricePerHour": 75,
    "pricePerDay": 350,
    "status": "available",
    "fuelLevel": 100,
    "equipment": ["Life jackets", "Cooler", "Bluetooth speaker", "Fishing gear"],
    "image": "/lakeside-leisure.png"
  }
}
```

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-customers](https://n8n.srv798586.hstgr.cloud/webhook/get-customers)

**Réponse:**

```json
{
  "customers": [
    {
      "id": "cust-1",
      "firstName": "Jean",
      "lastName": "Dupont",
      "email": "jean.dupont@example.com",
      "phone": "514-555-1234",
      "address": "123 Rue Principale, Montréal, QC",
      "licenseNumber": "D1234-56789",
      "fishingPermit": true,
      "rentalCount": 8,
      "notes": "Client régulier, préfère les bateaux de pêche"
    },
    {
      "id": "cust-2",
      "firstName": "Marie",
      "lastName": "Tremblay",
      "email": "marie.tremblay@example.com",
      "phone": "450-555-5678",
      "address": "456 Boulevard St-Laurent, Laval, QC",
      "licenseNumber": "T5678-12345",
      "fishingPermit": false,
      "rentalCount": 3,
      "notes": "Préfère les pontons pour sorties familiales"
    }
  ]
}
```

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-customer/:id](https://n8n.srv798586.hstgr.cloud/webhook/get-customer/:id)

**Réponse:**

```json
{
  "customer": {
    "id": "cust-1",
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean.dupont@example.com",
    "phone": "514-555-1234",
    "address": "123 Rue Principale, Montréal, QC",
    "licenseNumber": "D1234-56789",
    "fishingPermit": true,
    "rentalCount": 8,
    "notes": "Client régulier, préfère les bateaux de pêche"
  }
}
```

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-reservations](https://n8n.srv798586.hstgr.cloud/webhook/get-reservations)

**Réponse:**

```json
{
  "reservations": [
    {
      "id": "res-1",
      "boatId": "boat-2",
      "customerId": "cust-1",
      "startDate": "2023-07-15T10:00:00Z",
      "endDate": "2023-07-15T18:00:00Z",
      "status": "in-progress",
      "totalPrice": 450,
      "deposit": 100,
      "balance": 350,
      "notes": "Location à la journée"
    },
    {
      "id": "res-2",
      "boatId": "boat-4",
      "customerId": "cust-2",
      "startDate": "2023-07-17T09:00:00Z",
      "endDate": "2023-07-17T17:00:00Z",
      "status": "confirmed",
      "totalPrice": 400,
      "deposit": 100,
      "balance": 300,
      "notes": "Sortie familiale"
    }
  ]
}
```

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-reservation/:id](https://n8n.srv798586.hstgr.cloud/webhook/get-reservation/:id)

**Réponse:**

```json
{
  "reservation": {
    "id": "res-1",
    "boatId": "boat-2",
    "customerId": "cust-1",
    "startDate": "2023-07-15T10:00:00Z",
    "endDate": "2023-07-15T18:00:00Z",
    "status": "in-progress",
    "totalPrice": 450,
    "deposit": 100,
    "balance": 350,
    "notes": "Location à la journée",
    "boat": {
      "id": "boat-2",
      "name": "Wave Runner",
      "type": "Speedboat"
    },
    "customer": {
      "id": "cust-1",
      "firstName": "Jean",
      "lastName": "Dupont",
      "email": "jean.dupont@example.com",
      "phone": "514-555-1234"
    }
  }
}
```

## POST: [https://n8n.srv798586.hstgr.cloud/webhook/create-reservation](https://n8n.srv798586.hstgr.cloud/webhook/create-reservation)

**Requête:**

```json
{
  "boatId": "boat-1",
  "customerId": "cust-3",
  "startDate": "2023-07-20T09:00:00Z",
  "endDate": "2023-07-20T17:00:00Z",
  "totalPrice": 350,
  "deposit": 100,
  "balance": 250,
  "notes": "Première location pour ce client"
}
```

**Réponse:**

```json
{
  "success": true,
  "reservation": {
    "id": "res-6",
    "boatId": "boat-1",
    "customerId": "cust-3",
    "startDate": "2023-07-20T09:00:00Z",
    "endDate": "2023-07-20T17:00:00Z",
    "status": "confirmed",
    "totalPrice": 350,
    "deposit": 100,
    "balance": 250,
    "notes": "Première location pour ce client"
  }
}
```

## PUT: [https://n8n.srv798586.hstgr.cloud/webhook/update-reservation/:id](https://n8n.srv798586.hstgr.cloud/webhook/update-reservation/:id)

**Requête:**

```json
{
  "status": "completed",
  "notes": "Location terminée, bateau rendu en bon état"
}
```

**Réponse:**

```json
{
  "success": true,
  "reservation": {
    "id": "res-1",
    "boatId": "boat-2",
    "customerId": "cust-1",
    "startDate": "2023-07-15T10:00:00Z",
    "endDate": "2023-07-15T18:00:00Z",
    "status": "completed",
    "totalPrice": 450,
    "deposit": 100,
    "balance": 350,
    "notes": "Location terminée, bateau rendu en bon état"
  }
}
```

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-payments](https://n8n.srv798586.hstgr.cloud/webhook/get-payments)

**Réponse:**

```json
{
  "payments": [
    {
      "id": "pay-1",
      "reservationId": "res-1",
      "amount": 100,
      "method": "card",
      "status": "completed",
      "date": "2023-07-13T14:30:00Z",
      "receiptNumber": "R-2023-001"
    },
    {
      "id": "pay-2",
      "reservationId": "res-2",
      "amount": 100,
      "method": "transfer",
      "status": "completed",
      "date": "2023-07-14T10:15:00Z",
      "receiptNumber": "R-2023-002"
    }
  ]
}
```

## POST: [https://n8n.srv798586.hstgr.cloud/webhook/create-payment](https://n8n.srv798586.hstgr.cloud/webhook/create-payment)

**Requête:**

```json
{
  "reservationId": "res-3",
  "amount": 200,
  "method": "card",
  "status": "completed",
  "receiptNumber": "R-2023-005"
}
```

**Réponse:**

```json
{
  "success": true,
  "payment": {
    "id": "pay-5",
    "reservationId": "res-3",
    "amount": 200,
    "method": "card",
    "status": "completed",
    "date": "2023-07-15T15:45:22Z",
    "receiptNumber": "R-2023-005"
  }
}
```

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-maintenances](https://n8n.srv798586.hstgr.cloud/webhook/get-maintenances)

**Réponse:**

```json
{
  "maintenances": [
    {
      "id": "maint-1",
      "boatId": "boat-3",
      "type": "repair",
      "description": "Réparation du moteur",
      "status": "in-progress",
      "reportedDate": "2023-07-13T09:00:00Z",
      "completedDate": null,
      "cost": 350,
      "notes": "Pièces commandées, attente de livraison"
    },
    {
      "id": "maint-2",
      "boatId": "boat-5",
      "type": "inspection",
      "description": "Inspection de routine",
      "status": "pending",
      "reportedDate": "2023-07-15T08:30:00Z",
      "completedDate": null,
      "cost": 0,
      "notes": "Planifiée pour demain"
    }
  ]
}
```

## GET: [https://n8n.srv798586.hstgr.cloud/webhook/get-urgent-tasks](https://n8n.srv798586.hstgr.cloud/webhook/get-urgent-tasks)

**Réponse:**

```json
{
  "urgentTasks": [
    {
      "id": "task-1",
      "type": "late-return",
      "relatedId": "res-1",
      "description": "Retard de retour: Bateau Wave Runner (Jean Dupont)",
      "createdAt": "2023-07-15T18:30:00Z"
    },
    {
      "id": "task-2",
      "type": "inspection-needed",
      "relatedId": "boat-5",
      "description": "Inspection requise: Jet Ski Water Glider",
      "createdAt": "2023-07-15T16:30:00Z"
    },
    {
      "id": "task-3",
      "type": "maintenance-required",
      "relatedId": "boat-3",
      "description": "Maintenance urgente: Bateau Fisher King (problème de moteur)",
      "createdAt": "2023-07-15T13:30:00Z"
    }
  ]
}
```

Ces exemples de payloads JSON peuvent être utilisés comme référence pour comprendre la structure des données échangées avec les webhooks n8n. Ils sont basés sur les structures de données observées dans le code de l'application Marina Admin.
