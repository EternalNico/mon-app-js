#!/usr/bin/env node

const { marked } = require('marked');
const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');

const inputFile = 'README.md';
const outputHtmlFile = 'README.html';
const outputPdfFile = 'README.pdf';

console.log('Conversion du README.md en HTML et PDF...');

// Lire le contenu du README.md
const markdownContent = fs.readFileSync(inputFile, 'utf-8');

// Configurer marked pour un meilleur rendu
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false,
    sanitize: false
});

// Convertir en HTML
const htmlContent = marked(markdownContent);

// CSS pour un style adapté à l'impression PDF
const cssStyle = `
<style>
    @media print {
        * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
        }
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
    }
    
    h1, h2, h3, h4, h5, h6 {
        color: #2c3e50;
        margin-top: 2em;
        margin-bottom: 1em;
        font-weight: 600;
    }
    
    h1 {
        border-bottom: 3px solid #3498db;
        padding-bottom: 10px;
        font-size: 2.5em;
    }
    
    h2 {
        border-bottom: 2px solid #95a5a6;
        padding-bottom: 8px;
        font-size: 2em;
    }
    
    h3 {
        color: #34495e;
        font-size: 1.5em;
    }
    
    code {
        background-color: #f8f9fa;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        color: #e74c3c;
    }
    
    pre {
        background-color: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 6px;
        padding: 15px;
        overflow-x: auto;
        margin: 1em 0;
    }
    
    pre code {
        background-color: transparent;
        padding: 0;
        color: #333;
    }
    
    blockquote {
        border-left: 4px solid #3498db;
        margin: 1em 0;
        padding-left: 20px;
        color: #7f8c8d;
        font-style: italic;
    }
    
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 1em 0;
    }
    
    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
    }
    
    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }
    
    img {
        max-width: 100%;
        height: auto;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin: 1em 0;
    }
    
    ul, ol {
        margin: 1em 0;
        padding-left: 2em;
    }
    
    li {
        margin: 0.5em 0;
    }
    
    hr {
        border: none;
        border-top: 2px solid #ecf0f1;
        margin: 2em 0;
    }
    
    .success {
        color: #27ae60;
        font-weight: bold;
    }
    
    .error {
        color: #e74c3c;
        font-weight: bold;
    }
    
    .warning {
        color: #f39c12;
        font-weight: bold;
    }
    
    /* Page break styles pour l'impression */
    @page {
        margin: 2cm;
        size: A4;
    }
    
    .page-break {
        page-break-before: always;
    }
    
    h1 {
        page-break-before: always;
    }
    
    h1:first-child {
        page-break-before: avoid;
    }
</style>
`;

// Créer le document HTML complet
const fullHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TP Node.js/Jenkins : Intégration Continue et Déploiement</title>
    ${cssStyle}
</head>
<body>
    ${htmlContent}
    
    <div style="margin-top: 3em; padding-top: 2em; border-top: 2px solid #ecf0f1; text-align: center; color: #7f8c8d; font-size: 0.9em;">
        <p>Document généré automatiquement à partir du README.md</p>
        <p>Généré le : ${new Date().toLocaleString('fr-FR')}</p>
    </div>
</body>
</html>`;

// Écrire le fichier HTML
fs.writeFileSync(outputHtmlFile, fullHtml, 'utf-8');
console.log(`✅ Fichier HTML généré : ${outputHtmlFile}`);

// Options pour la génération PDF
const options = {
    format: 'A4',
    orientation: 'portrait',
    border: {
        top: '2cm',
        right: '1.5cm',
        bottom: '2cm',
        left: '1.5cm'
    },
    type: 'pdf',
    quality: '75',
    renderDelay: 1000,
    zoomFactor: 0.8
};

// Tenter de générer le PDF
console.log('Tentative de génération du PDF...');
pdf.create(fullHtml, options).toFile(outputPdfFile, function(err, res) {
    if (err) {
        console.log('⚠️  Génération PDF automatique échouée :', err.message);
        console.log('📄 Le fichier HTML a été créé avec succès. Vous pouvez le convertir manuellement :');
        console.log(`   1. Ouvrez ${outputHtmlFile} dans votre navigateur`);
        console.log('   2. Utilisez Ctrl+P (ou Cmd+P sur Mac)');
        console.log('   3. Choisissez "Enregistrer au format PDF"');
        console.log('   4. Sauvegardez comme README.pdf');
    } else {
        console.log(`✅ Fichier PDF généré automatiquement : ${outputPdfFile}`);
        
        // Vérifier la taille des fichiers
        if (fs.existsSync(outputHtmlFile)) {
            const htmlStats = fs.statSync(outputHtmlFile);
            console.log(`📄 Taille du fichier HTML : ${(htmlStats.size / 1024).toFixed(2)} KB`);
        }
        
        if (fs.existsSync(outputPdfFile)) {
            const pdfStats = fs.statSync(outputPdfFile);
            console.log(`📄 Taille du fichier PDF : ${(pdfStats.size / 1024).toFixed(2)} KB`);
        }
    }
});