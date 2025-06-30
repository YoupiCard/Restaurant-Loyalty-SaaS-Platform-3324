# RestaurantSaaS - Plateforme de Fidélisation

Une plateforme SaaS bilingue (français/anglais) destinée aux restaurateurs pour collecter des avis clients, offrir des jeux interactifs et gérer la fidélisation.

## 🎯 Fonctionnalités

### Core Features
- **Collecte d'avis Google** via intégration Climbo
- **Jeu interactif Spinwheel** avec récompenses configurables
- **Système de récompenses** téléchargeables par email
- **Intégration carte de fidélité** Youpicard
- **Dashboard restaurateur** avec KPI temps réel
- **Interface bilingue** français/anglais
- **Architecture multi-établissements** avec gestion des groupes

### Rôles Utilisateurs
- **Superadmin** : Accès total à la plateforme
- **Group Admin** : Gestion des chaînes de restaurants
- **Restaurant Manager** : Gestion d'un établissement individuel

### Intégrations
- **Supabase** : Base de données et authentification
- **Climbo** : Affichage et gestion des avis Google
- **Youpicard** : Cartes de fidélité digitales
- **Stripe** : Gestion des abonnements (à venir)

## 🛠️ Technologies

- **Frontend** : React 18, Vite, Tailwind CSS
- **Animations** : Framer Motion
- **Routing** : React Router v7
- **Base de données** : Supabase
- **Authentification** : Supabase Auth
- **Icons** : React Icons
- **Notifications** : React Hot Toast
- **Forms** : React Hook Form
- **Charts** : ECharts
- **QR Codes** : React QR Code

## 🚀 Installation

```bash
# Cloner le repository
git clone [url-du-repo]
cd restaurant-saas-platform

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

## ⚙️ Configuration

### Variables d'environnement
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

### Base de données Supabase

La plateforme utilise les tables suivantes :

- `users` : Utilisateurs de la plateforme
- `groups` : Groupes/chaînes de restaurants
- `establishments` : Établissements individuels
- `rewards` : Récompenses configurables
- `spinwheel_sessions` : Sessions de jeu des clients
- `daily_metrics` : Métriques quotidiennes

## 📱 Pages Principales

### Dashboard (`/dashboard`)
- Vue d'ensemble des KPI
- Statistiques temps réel
- Actions rapides

### Spinwheel (`/spin/:establishmentId`)
- Page publique du jeu
- Intégration Climbo
- Collecte d'avis et récompenses

### Gestion des Établissements (`/establishments`)
- Configuration des restaurants
- Génération de QR codes
- Paramètres de branding

### Récompenses (`/rewards`)
- Configuration des gains
- Probabilités et templates d'email
- Gestion des campagnes

### Analyses (`/analytics`)
- Métriques détaillées
- Graphiques de performance
- Export de données

## 🎨 Design System

### Couleurs
- **Primary** : Orange (#ed7014)
- **Secondary** : Bleu (#0ea5e9)
- **Success** : Vert
- **Warning** : Jaune
- **Error** : Rouge

### Composants
- `StatCard` : Cartes de statistiques
- `SpinWheel` : Roue de la fortune interactive
- `SafeIcon` : Wrapper sécurisé pour les icônes
- `Navbar` : Navigation principale

## 🌐 Internationalisation

Le système supporte le français et l'anglais avec :
- Traductions complètes de l'interface
- Stockage des préférences linguistiques
- Contenu multilingue en base de données

## 🔐 Sécurité

- Authentification via Supabase Auth
- Gestion des rôles et permissions
- Validation des données côté client et serveur
- Protection des routes sensibles

## 📊 Métriques Trackées

- Scans de QR codes
- Participations au jeu
- Récompenses réclamées
- Avis Google collectés
- Installations de cartes Youpicard

## 🚀 Déploiement

```bash
# Build de production
npm run build

# Preview du build
npm run preview
```

## 📝 Roadmap

- [ ] Système de paiement Stripe
- [ ] API Youpicard complète
- [ ] Envoi d'emails automatisés
- [ ] Analytics avancées
- [ ] Application mobile
- [ ] Intégrations supplémentaires

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support, contactez-nous à support@restaurantsaas.com