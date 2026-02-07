# objetheque
Bibliothèque d'objet pour association

## Description
Une application web pour gérer la bibliothèque d'objets d'une association, construite avec des technologies modernes.

### Fonctionnalités principales
- **Gestion des objets** : Chaque objet possède un numéro unique auto-incrémenté affiché entre parenthèses après le nom (ex: "Échelle en aluminium (1)").
- **Affichage des objets** : Cartes d'objets avec espace réservé pour photo, nom avec numéro, description et statut. Les catégories et sous-catégories sont affichées dans les filtres latéraux pour éviter la répétition.
- **Catégorisation** : Organisation des objets par catégories et sous-catégories via des filtres.
- **Réservation** : Système de réservation d'objets disponibles.
- **Authentification** : Connexion et inscription des utilisateurs.
- **RBAC** : Contrôle d'accès basé sur les rôles pour sécuriser l'application.

## Pile Technologique
- **Frontend** : Next.js, Tailwind CSS
- **Authentification** : Auth.js
- **Base de données** : Prisma, PostgreSQL
- **Déploiement** : Docker
- **Autorisation** : RBAC (Contrôle d'Accès Basé sur les Rôles)

## Structure des Fichiers
Voici une description de la structure des fichiers du projet, basée sur l'architecture Next.js avec le routeur app :

### Structure générale
- **Racine du projet** : Contient les fichiers de configuration (package.json, next.config.ts, etc.), les dossiers Docker, Prisma, et les tests.
- **Dossier `src/`** : Contient le code source de l'application.
  - **Dossier `src/app/`** : Utilise le routeur app de Next.js pour les pages et les composants.

### Pages et leur code
- **Page d'accueil (/) ** : Le code se trouve dans `src/app/page.tsx`. C'est la page racine de l'application.
- **Page de connexion (/login)** : Le code est dans `src/app/login/page.tsx`.
- **Page des objets (/objects)** : Le code est dans `src/app/objects/page.tsx`.
- **Page d'inscription (/register)** : Le code est dans `src/app/register/page.tsx`.

### Autres fichiers importants dans `src/app/`
- **`layout.tsx`** : Définit la mise en page globale de l'application (headers, footers, etc.).
- **`globals.css`** : Contient les styles CSS globaux (utilise Tailwind CSS).
- **`__tests__/`** : Dossier de tests pour chaque page, avec des fichiers comme `page.test.tsx` pour les tests unitaires.

### Autres dossiers
- **`prisma/`** : Contient le schéma de base de données (`schema.prisma`).
- **`public/`** : Pour les assets statiques (images, etc.).
- **`.vscode/`** : Configurations VS Code, incluant les tâches (`tasks.json`).

## Commandes de Configuration
```bash
rm README.md
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install next-auth @prisma/client prisma @next-auth/prisma-adapter
npx prisma init
npx prisma generate
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

## Développement

### Prérequis
- Node.js 24+ (installer via NVM)
- Docker et Docker Compose
- PostgreSQL (ou utiliser Docker)

### Configuration
1. Installer NVM et Node.js : Exécuter les tâches `install-node` et `use-node` dans VS Code
2. Cloner le dépôt
3. Installer les dépendances : Exécuter la tâche `install` dans VS Code ou `npm install`
4. Configurer la base de données : Exécuter `docker-compose up -d` pour démarrer PostgreSQL et Redis
5. Exécuter les migrations Prisma : `npx prisma migrate dev`
6. Démarrer le serveur de développement : `npm run dev`

### Tâches VS Code
Utilisez les tâches suivantes dans VS Code (Ctrl+Shift+P > Tasks: Run Task) :
- `install-node` : Installer Node.js 24 via NVM
- `use-node` : Utiliser Node.js 24 via NVM
- `install` : Installer les dépendances npm
- `dev` : Démarrer le serveur de développement
- `open-browser` : Ouvrir le navigateur sur http://localhost:1502
- `build` : Construire l'application
- `lint` : Exécuter ESLint
- `test` : Exécuter les tests
- `docker-up` : Démarrer les conteneurs Docker

## Améliorations Futures
- **Notifications** : Implémenter des notifications utilisateur pour la disponibilité des objets, les dates d'échéance et les mises à jour.
- **Fonctionnalités Admin** : Développer un tableau de bord pour les administrateurs afin de gérer les utilisateurs, les objets et générer des rapports.
- **Surveillance** : Intégrer des outils de journalisation et de surveillance pour le suivi des performances et la gestion des erreurs.

## Plan de Développement
1. Configurer la structure du projet avec Next.js et Tailwind CSS.
2. Intégrer Auth.js pour l'authentification.
3. Configurer Prisma avec PostgreSQL.
4. Implémenter RBAC pour l'autorisation.
5. Conteneuriser l'application avec Docker.
6. Mettre à jour README.md avec les choix technologiques actuels et les améliorations futures.
7. Développer les fonctionnalités principales de gestion des objets.
8. Implémenter les améliorations futures (notifications, fonctionnalités admin, surveillance).
