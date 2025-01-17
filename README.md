# Eco Bliss Bath

## Description
Site vitrine en ligne de produits de beauté écoresponsables, testé grâce à Cypress !
L'objectif de ce projet est d'automatiser les tests réalisés sur le site. 

## Installation du projet
1. Téléchargez ou clonez le dépôt
2. Depuis un terminal ouvert dans le dossier du projet, lancer la commande : `sudo docker-compose up --build`
3. Ouvrez le site depuis la page http://localhost:8080 

## Lancement des tests Cypress
### Prérequis
1. Installez node.js :
- https://nodejs.org/
- Pour vérifier que l’installation s’est bien passée, ouvrez votre terminal et tapez 
```bash
node -v
```
Vous devriez obtenir la version de Node.js installée

2. Installez Cypress :
- Tapez le code suivant dans le terminal
```bash
npm install cypress --save-dev 
```
> Attendez quelques secondes, voire quelques minutes selon votre connexion, pour le téléchargement des packages, jusqu’à avoir la réponse à votre ligne de commande.
 Vous devez obtenir un message qui ressemble au suivant :
 ![Image](https://user.oc-static.com/upload/2023/10/19/16977305146287_image43.png)

### En avant Guingamp ! 
- Pour ouvrir l'interface de Cypress, tapez dans le terminal
```bash
npx cypress open
```
- Pour exécuter l'ensemble des tests et générer un rapport, tapez dans le terminal
```bash
npx cypress run
```