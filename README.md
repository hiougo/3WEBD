# READ.
Un explorateur de livres propulsé par Open Library et Wikipédia.

Ce projet fusionne les données techniques d'Open Library avec les résumés et images de Wikipédia pour créer une expérience d'archivage exceptionelle.

## Fonctionnalités :

Un mode light/dark mode : Pour une expérience utilisateur à toute épreuve.

Recherche : Recherche basique via Open Library.

Recherche Avancée : Filtrage par Titre, Auteur et Sujet.

Données Enrichies : Si un livre a un lien Wikipédia, l'application utilise en priorité les données de Wikipédia puis d'Open Library et enfin un placeholder si jamais aucune donnée n'est disponible.

## Stack Technique :

- React + TypeScript (Vite)
- Tailwind CSS (Style)
- React Router (Navigation)
- APIs : Open Library + Wikipedia REST API

## Installer :
```bash 
npm install
```

## Lancer :
```bash
npm run dev
```
Ouvrez http://localhost:5173 pour explorer les archives.

## Tester :
Assurez-vous que votre serveur dev soit lancé.
```bash
npm run cy:run
```