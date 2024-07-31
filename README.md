


```markdown
# Otakulinks Frontend

## Description

Ce projet est le frontend de l'application Otakulinks, construit avec Next.js. Il permet aux utilisateurs de rechercher des mangas, de consulter leurs détails et de gérer leurs emprunts.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/otakulinks-frontend.git
    cd otakulinks-frontend
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Configurez les variables d'environnement :
    Créez un fichier `.env.local` à la racine du projet et ajoutez les variables suivantes :
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

4. Démarrez le serveur de développement :
    ```bash
    npm run dev
    ```

## Fonctionnalités

- Recherche de mangas par titre
- Affichage des détails des mangas
- Gestion des utilisateurs (inscription, connexion)
- Gestion des emprunts

## Structure des Dossiers

- `components/` - Contient les composants réutilisables
- `pages/` - Contient les pages du projet
- `utils/` - Contient les utilitaires (fonctions de recherche, gestion des utilisateurs, etc.)

## Contributions

Les contributions sont les bienvenues. Veuillez ouvrir une issue pour discuter de ce que vous aimeriez changer.

## Licence

Ce projet est sous licence MIT.
