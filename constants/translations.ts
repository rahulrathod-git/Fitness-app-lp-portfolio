export const LANGUAGES = {
 de: 'Deutsch',
 en: 'English',
} as const;

export type LanguageKey = keyof typeof LANGUAGES;

export const translations = {
 de: {
   // Navigation
   home: 'Startseite',
   book: 'Buchen',
   profile: 'Profil',
   settings: 'Einstellungen',
   back: 'Zurück',
   cancel: 'Abbrechen',
   save: 'Speichern',
   close: 'Schließen',
   
   // Welcome Screen
   welcomeTitle: 'CoachingApp',
   welcomeSubtitle: 'Lebensveränderndes Coaching. Jederzeit. Überall.',
   login: 'Anmelden',
   signUp: 'Registrieren',
   
   // Login Screen
   welcomeBack: 'Willkommen zurück',
   signInContinue: 'Melde dich an, um deine Reise fortzusetzen',
   email: 'E-Mail',
   password: 'Passwort',
   logIn: 'Anmelden',
   forgotPassword: 'Passwort vergessen?',
   dontHaveAccount: 'Noch kein Konto? ',
   
   // Sign Up Screen
   createAccount: 'Konto erstellen',
   joinTransformation: 'Tritt uns bei und starte deine Transformation',
   username: 'Benutzername',
   alreadyHaveAccount: 'Bereits ein Konto? ',
   passwordRequirements: 'Das Passwort muss enthalten:',
   atLeast8Characters: '• Mindestens 8 Zeichen',
   oneUppercase: '• Einen Großbuchstaben',
   oneSpecialCharacter: '• Ein Sonderzeichen',
   
   // Forgot Password Screen
   resetPassword: 'Passwort zurücksetzen',
   enterEmailReset: 'Gib deine E-Mail ein, um einen Reset-Link zu erhalten',
   sendResetLink: 'Reset-Link senden',
   resetLinkSent: 'Ein Passwort-Reset-Link wurde an deine E-Mail gesendet',
   
   // Home Screen
   featured: 'Empfohlen',
   mostPopular: 'Beliebteste',
   quickWorkouts: '10-Minuten-Workouts',
   beginnersPackage: 'Einsteiger-Paket',
   perfectForGettingStarted: 'Perfekt für den Einstieg!',
   
   // Settings Screen
   appearance: 'Darstellung',
   language: 'Sprache',
   lightMode: 'Heller Modus',
   darkMode: 'Dunkler Modus',
   
   // Book Screen
   bookSession: 'Session buchen',
   availableOn: 'Verfügbar am',
   bookNow: 'Jetzt buchen',
   booked: 'Gebucht',
   noSessionsAvailable: 'Keine Sessions an diesem Tag verfügbar.',
   
   // User Profile Screen
   yourProfile: 'Dein Profil',
   myBookings: 'Meine Buchungen',
   myPackages: 'Meine Pakete',
   nothingToShow: 'Nichts anzuzeigen',
   logout: 'Abmelden',
   logoutConfirm: 'Bist du sicher, dass du dich abmelden möchtest?',
   
   // Package Details Screen
   whatsIncluded: 'Was ist enthalten',
   getStartedNow: 'Jetzt loslegen',
   lifetimeAccess: '• Lebenslanger Zugang zu allen Materialien',
   moneyBackGuarantee: '• 30-Tage-Geld-zurück-Garantie',
   allFitnessLevels: '• Kompatibel mit allen Levels',
   fullBodyWorkoutGuide: 'Ganzkörper-Workout-Anleitung',
   oneOnOneCoaching: '1:1-Coaching-Sitzungen',
   progressTracking: 'Fortschrittsverfolgung vorlagen',
   
   // Workout Details Screen
   aboutThisWorkout: 'Über dieses Workout',
   startWorkout: 'Workout starten',
   workoutNotFound: 'Workout nicht gefunden!',
   
   // Article Details Screen
   articleNotFound: 'Artikel nicht gefunden!',
   
   // Form Validation Messages
   pleaseEnterEmail: 'Bitte gib eine E-Mail ein',
   pleaseEnterValidEmail: 'Bitte gib eine gültige E-Mail ein',
   pleaseEnterPassword: 'Bitte gib ein Passwort ein',
   passwordMinLength: 'Passwort muss mindestens 8 Zeichen haben',
   pleaseEnterUsername: 'Bitte gib einen Benutzernamen ein',
   usernameMinLength: 'Benutzername muss mindestens 3 Zeichen haben',
   passwordValidation: 'Passwort muss 8+ Zeichen mit Großbuchstaben und Sonderzeichen haben',
 },
 
 en: {
   // Navigation
   home: 'Home',
   book: 'Book',
   profile: 'Profile',
   settings: 'Settings',
   back: 'Back',
   cancel: 'Cancel',
   save: 'Save',
   close: 'Close',
   
   // Welcome Screen
   welcomeTitle: 'CoachingApp',
   welcomeSubtitle: 'Life-changing coaching. Anytime. Anywhere.',
   login: 'Log In',
   signUp: 'Sign Up',
   
   // Login Screen
   welcomeBack: 'Welcome Back',
   signInContinue: 'Sign in to continue your journey',
   email: 'Email',
   password: 'Password',
   logIn: 'Log In',
   forgotPassword: 'Forgot Password?',
   dontHaveAccount: "Don't have an account? ",
   
   // Sign Up Screen
   createAccount: 'Create Account',
   joinTransformation: 'Join us and start your transformation',
   username: 'Username',
   alreadyHaveAccount: 'Already have an account? ',
   passwordRequirements: 'Password must contain:',
   atLeast8Characters: '• At least 8 characters',
   oneUppercase: '• One uppercase letter',
   oneSpecialCharacter: '• One special character',
   
   // Forgot Password Screen
   resetPassword: 'Reset Password',
   enterEmailReset: 'Enter your email to receive a reset link',
   sendResetLink: 'Send Reset Link',
   resetLinkSent: 'A password reset link has been sent to your email',
   
   // Home Screen
   featured: 'Featured',
   mostPopular: 'Most Popular',
   quickWorkouts: '10 Minute workouts',
   beginnersPackage: "Beginner's Package",
   perfectForGettingStarted: 'Perfect for getting started!',
   
   // Settings Screen
   appearance: 'Appearance',
   language: 'Language',
   lightMode: 'Light Mode',
   darkMode: 'Dark Mode',
   
   // Book Screen
   bookSession: 'Book a Session',
   availableOn: 'Available on',
   bookNow: 'Book Now',
   booked: 'Booked',
   noSessionsAvailable: 'No sessions available on this day.',
   
   // User Profile Screen
   yourProfile: 'Your Profile',
   myBookings: 'My Bookings',
   myPackages: 'My Packages',
   nothingToShow: 'Nothing to show here',
   logout: 'Logout',
   logoutConfirm: 'Are you sure you want to logout?',
   
   // Package Details Screen
   whatsIncluded: "What's Included",
   getStartedNow: 'Get Started Now',
   lifetimeAccess: '• Lifetime access to all materials',
   moneyBackGuarantee: '• 30-day money-back guarantee',
   allFitnessLevels: '• Compatible with all fitness levels',
   fullBodyWorkoutGuide: 'Full Body Workout Guide',
   oneOnOneCoaching: '1:1 Coaching Sessions',
   progressTracking: 'Progress Tracking Templates',
   
   // Workout Details Screen
   aboutThisWorkout: 'About this workout',
   startWorkout: 'Start Workout',
   workoutNotFound: 'Workout not found!',
   
   // Article Details Screen
   articleNotFound: 'Article not found!',
   
   // Form Validation Messages
   pleaseEnterEmail: 'Please enter an email',
   pleaseEnterValidEmail: 'Please enter a valid email',
   pleaseEnterPassword: 'Please enter a password',
   passwordMinLength: 'Password must be at least 8 characters',
   pleaseEnterUsername: 'Please enter a username',
   usernameMinLength: 'Username must be at least 3 characters',
   passwordValidation: 'Password must be 8+ characters with uppercase and special character',
 },
};