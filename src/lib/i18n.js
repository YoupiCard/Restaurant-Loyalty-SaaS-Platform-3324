export const translations = {
  fr: {
    // Navigation
    nav: {
      dashboard: 'Tableau de bord',
      establishments: 'Établissements',
      rewards: 'Récompenses',
      analytics: 'Analyses',
      settings: 'Paramètres',
      logout: 'Déconnexion'
    },

    // Dashboard
    dashboard: {
      title: 'Tableau de bord',
      qrScans: 'Scans QR',
      participations: 'Participations',
      rewards: 'Récompenses',
      reviews: 'Avis Google',
      youpicard: 'Cartes Youpicard',
      todayStats: 'Statistiques du jour',
      weekStats: 'Cette semaine',
      monthStats: 'Ce mois'
    },

    // Establishments
    establishments: {
      title: 'Mes Établissements',
      addNew: 'Nouvel Établissement',
      name: 'Nom',
      status: 'Statut',
      actions: 'Actions',
      active: 'Actif',
      inactive: 'Inactif',
      edit: 'Modifier',
      delete: 'Supprimer',
      qrCode: 'QR Code'
    },

    // Spinwheel
    spinwheel: {
      title: 'Tentez votre chance !',
      subtitle: 'Tournez la roue pour gagner une récompense',
      spin: 'Faire tourner',
      congratulations: 'Félicitations !',
      youWon: 'Vous avez gagné :',
      claimReward: 'Récupérer ma récompense',
      emailPlaceholder: 'Votre adresse email',
      thankYou: 'Merci de votre participation !',
      installCard: 'Installer la carte de fidélité',
      leaveReview: 'Laisser un avis Google'
    },

    // Common
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      loading: 'Chargement...',
      email: 'Email',
      password: 'Mot de passe',
      login: 'Connexion',
      register: 'Inscription',
      welcome: 'Bienvenue',
      error: 'Erreur',
      success: 'Succès'
    }
  },

  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      establishments: 'Establishments',
      rewards: 'Rewards',
      analytics: 'Analytics',
      settings: 'Settings',
      logout: 'Logout'
    },

    // Dashboard
    dashboard: {
      title: 'Dashboard',
      qrScans: 'QR Scans',
      participations: 'Participations',
      rewards: 'Rewards',
      reviews: 'Google Reviews',
      youpicard: 'Youpicard Cards',
      todayStats: 'Today\'s Stats',
      weekStats: 'This Week',
      monthStats: 'This Month'
    },

    // Establishments
    establishments: {
      title: 'My Establishments',
      addNew: 'New Establishment',
      name: 'Name',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      qrCode: 'QR Code'
    },

    // Spinwheel
    spinwheel: {
      title: 'Try your luck!',
      subtitle: 'Spin the wheel to win a reward',
      spin: 'Spin',
      congratulations: 'Congratulations!',
      youWon: 'You won:',
      claimReward: 'Claim my reward',
      emailPlaceholder: 'Your email address',
      thankYou: 'Thank you for participating!',
      installCard: 'Install loyalty card',
      leaveReview: 'Leave a Google review'
    },

    // Common
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      loading: 'Loading...',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      register: 'Register',
      welcome: 'Welcome',
      error: 'Error',
      success: 'Success'
    }
  }
}

export const useTranslation = (language = 'fr') => {
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return { t }
}