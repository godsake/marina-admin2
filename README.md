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
