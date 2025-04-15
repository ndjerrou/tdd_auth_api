# Authentification avec TDD – Node.js + MongoDB

Ce projet a été réalisé dans le cadre d’un exercice de mise en pratique de la démarche TDD (Test Driven Development). Il met en œuvre deux endpoints d’authentification : `/auth/signup` et `/auth/login`.

## Objectifs pédagogiques

- Comprendre et appliquer la démarche **Red → Green → Refactor**
- Écrire des tests avant le code
- Gérer les codes HTTP (201, 200, 400, 401, 500)
- Organiser proprement le projet en séparant routes, contrôleurs et modèles

## Stack technique

- **Node.js + Express**
- **MongoDB + Mongoose**
- **bcryptjs + jsonwebtoken**
- **Jest + Supertest**

## Structure du projet

├── app.js                  # Express app (sans listen)
├── index.js                # Lancement serveur
├── models/
│   └── user.model.js
├── routes/
│   └── auth.js
├── controllers/
│   └── auth.controller.js
├── tests/
│   └── auth.test.js


## Tests réalisés

### `/auth/signup`

- Création utilisateur valide → **201**
- Données manquantes (email/password) → **400**
- Erreur interne simulée → **500**

### `/auth/login`

- Connexion valide → **200**
- Mauvais body → **401**
- Erreur interne simulée → **500**

## Lancer les tests

```bash
npm install
npm test
```
