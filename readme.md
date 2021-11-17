## NODE EXPRESS CHAT

### Technologies

- **Client**
  - React

- **Serveur**
  - NodeJS
  - Express
  - MongoDB
  - Socket.io
  - BCrypt

### Fonctionnalités

- Connexion avec un nom d'utilisateur et un mot de passe
- Creation d'un compte utilisateur (Le formulaire est le même que le login pour une question de simplicité)
- Envoyer/recevoir des messages (avec persistence des messages)
- Liste des utilisateurs connectés
- Consulter le nombre de message dans le chat général
- Consulter le nombre de message d'un utilisateur (Le tooltip s'affiche lorsque l'on passe la souris sur l'utilisateur dans la liste des connectés)
- Filtre à insultes

### Installation

1. ```git clone https://github.com/TomBrulin/node-express-chat```
2. ```cd back-end```
3. ```npm install```
4. ```cd ../front-end```
5. ```npm install```
6. Créer un fichier .env dans le dossier back-end
   1. Definir les variables d'environnement
      1. DB_USER
      2. DB_PASS
      3. DB_URL
      4. DB_NAME

### Routes API

- **/online** : Récuperer la liste des utilisateur connectés
- **/messages** : Récuperer l'historique des message trier par date
- **/total-messages** : Récuperer le nombre de messages dans le général
- **/total-user-messages/:username** : Récuprer le nombre de message d'un utilisateur