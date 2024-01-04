# Initialiser l'environnement de dev

## Pour le front
Avec la console:
  - npm install vite (si pas encore installé)
  - npm install (si projet pas initialisé)
  - npm start (pour lancer le serveur eet voir la page web)

## Pour le back
Avec Eclipse ou la SpringToolSuite : 
  - Import existing Maven project (personnellement j'ai mis le workspace dans le dossier Back pour que ce soit plus pratique)
  - Si tout va bien, lancer le main dans lequel il y a SpringApplication.run(...)
S'il y a des bugs Ruben peut aider car il a réussi la mise en place

## Pour la database
 - Installer MySQL : https://dev.mysql.com/downloads/installer/
 - Créer une base de données, un utilisateur (modifier application.properties dans spring boot pour lier correctement)
 - Remplir avec les scripts BDD
