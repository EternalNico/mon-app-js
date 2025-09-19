# Conversion README.md vers PDF

Ce projet inclut un script automatique pour convertir le README.md en format PDF.

## Utilisation

### Méthode automatique

```bash
npm run generate-pdf
```

Cette commande :
1. ✅ Génère automatiquement un fichier `README.html` avec un style optimisé pour PDF
2. ⚠️  Tente de générer automatiquement un PDF (peut échouer selon l'environnement système)

### Méthode manuelle (recommandée)

Si la génération automatique du PDF échoue :

1. **Exécutez la commande** :
   ```bash
   npm run generate-pdf
   ```

2. **Ouvrez le fichier HTML** généré (`README.html`) dans votre navigateur web

3. **Imprimez en PDF** :
   - Appuyez sur `Ctrl+P` (Windows/Linux) ou `Cmd+P` (Mac)
   - Choisissez "Enregistrer au format PDF" ou "Print to PDF"
   - Configurez les options :
     - Format : A4
     - Marges : Normales
     - Échelle : 80-100%
   - Sauvegardez le fichier comme `README.pdf`

## Fonctionnalités du PDF généré

- 📄 **Format A4** avec marges optimisées
- 🎨 **Style professionnel** avec couleurs et typographie adaptées
- 📑 **Tableaux et listes** bien formatés
- 💻 **Code source** avec coloration syntaxique
- 🖼️ **Images** redimensionnées automatiquement
- 📊 **Sauts de page** intelligents pour les titres

## Fichiers générés

- `README.html` : Version HTML stylée pour l'impression
- `README.pdf` : Version PDF finale (si génération automatique réussie)

## Dépendances

Le script utilise :
- `marked` : Conversion Markdown vers HTML
- `html-pdf` : Tentative de génération PDF automatique (optionnel)

## En cas de problème

Si vous rencontrez des erreurs :
1. Assurez-vous que Node.js est installé
2. Exécutez `npm install` pour installer les dépendances
3. Utilisez la méthode manuelle via le navigateur