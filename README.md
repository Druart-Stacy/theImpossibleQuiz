# Quiz sur les Capitales Européennes
Ce projet est une application web interactive qui propose un quiz sur les capitales de différents pays européens. L'utilisateur dispose de trois vies et doit répondre correctement aux questions dans un temps imparti pour avancer dans le quiz.

## Fonctionnalités
Quiz interactif : Testez vos connaissances sur les capitales européennes.
Gestion des vies : Vous avez trois vies. Une mauvaise réponse ou le dépassement du temps entraîne la perte d'une vie.
Minuteur : Un temps limite de 10 secondes est attribué pour chaque question.
Progression : Passez à la question suivante en répondant correctement.
Technologies Utilisées
HTML5 : Structure de la page web.
CSS3 : Styles et mise en page.
JavaScript (ES6) : Logique du jeu et interactivité.
TypeScript : Version typée du JavaScript pour une meilleure maintenabilité.
Prérequis
Un navigateur web moderne (Chrome, Firefox, Edge, Safari).
Pour exécuter le code TypeScript, il est nécessaire d'avoir Node.js installé et d'utiliser le compilateur TypeScript (tsc).
Installation
Cloner le dépôt

## bash
Copier le code
git clone https://github.com/votre-utilisateur/quiz-capitales.git
Naviguer dans le répertoire du projet

## bash
Copier le code
cd quiz-capitales
Si vous utilisez le TypeScript

Installer les dépendances :

## bash
Copier le code
npm install
Compiler le fichier TypeScript :

## bash
Copier le code
tsc app.ts
Ouvrir le fichier index.html dans votre navigateur

## Structure du Projet
index.html : Le fichier HTML principal qui contient la structure de la page.
app.js : Le script JavaScript principal qui gère la logique du quiz.
app.ts : Le script TypeScript pour une version typée du code.
styles.css : Feuille de style pour la mise en page et le design.
Utilisation
Lancer le quiz

Ouvrez le fichier index.html dans votre navigateur. Le quiz commencera automatiquement.

Répondre aux questions

Lisez la question affichée.
Entrez votre réponse dans le champ prévu à cet effet.
Cliquez sur le bouton "Submit" pour valider votre réponse.
Gestion du temps

Un minuteur de 10 secondes est affiché pour chaque question. Vous devez répondre avant la fin du temps imparti.

Perte de vies

Mauvaise réponse : Vous perdez une vie.
Temps écoulé : Vous perdez une vie.
Fin du jeu

Game Over : Si vous perdez toutes vos vies.
Félicitations : Si vous répondez correctement à toutes les questions.
Personnalisation
Vous pouvez ajouter vos propres questions ou modifier celles existantes en éditant le tableau questions dans les fichiers app.js ou app.ts.

Exemple d'ajout d'une question :

javascript
Copier le code
{
  question: "Quelle est la capitale des Pays-Bas ?",
  answer: "Amsterdam",
  type: 'string'
}
Contributions
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request pour améliorer le projet.

# Auteurs
Druart Stacy - projet de formation chez BeCode
Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

# Remerciements
Aux utilisateurs qui testeront ce quiz et fourniront des retours constructifs.
À la communauté open-source pour l'inspiration et les ressources.
