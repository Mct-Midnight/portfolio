/**
 * ==============================================================================
 * Synchronisation du Formulaire de Contact du Portfolio vers Google Sheets
 * Auteur : Quentin Machu — BTS SIO SLAM
 * Feuille cible : Portfolio - Contact (ID : 10U7mfGcpBCaryHHloKL2jQQGXNTbDlKqNy_dQFP407Y)
 * ==============================================================================
 */

// Nom exact de l'onglet cible dans le Google Sheet
var SHEET_NAME = "Portfolio - Contact";

/**
 * Fonction appelée automatiquement lors de la réception d'une requête HTTP POST depuis le portfolio
 * @param {Object} e - Événement contenant les données envoyées par le formulaire (JSON ou FormData)
 * @returns {TextOutput} Réponse HTTP au format JSON
 */
function doPost(e) {
  // Verrou de concurrence pour éviter tout conflit d'écriture si plusieurs messages arrivent en même temps
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // 1. Récupération et normalisation des données envoyées par le portfolio
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (errParse) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Extraction et nettoyage des champs du formulaire
    var name = (data.name || data.nom || "Anonyme").toString().trim();
    var email = (data.email || data.mail || "Non renseigné").toString().trim();
    var subject = (data.subject || data.Objet || data["Objet de la démarche"] || "Contact Portfolio").toString().trim();
    var message = (data.message || "").toString().trim();

    // 2. Accès à la feuille de calcul cible
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      // Secours si le script est exécuté en autonome via son identifiant de document
      ss = SpreadsheetApp.openById("10U7mfGcpBCaryHHloKL2jQQGXNTbDlKqNy_dQFP407Y");
    }

    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getActiveSheet();
    }

    // 3. Préparation des valeurs à insérer dans le tableau
    // Horodatage au format français : JJ/MM/AAAA HH:mm
    var formattedDate = Utilities.formatDate(new Date(), "Europe/Paris", "dd/MM/yyyy HH:mm");

    // Statut initial dans le pipeline de suivi (mini-CRM)
    var initialStatus = "Nouveau";

    // Formatage soigné de la description du besoin avec l'objet sélectionné
    var fullDescription = subject ? "[" + subject + "]\n" + message : message;

    // 4. Détection de la prochaine ligne disponible (à partir de la ligne 3, la ligne 2 contenant les en-têtes)
    var lastRow = sheet.getLastRow();
    var nextRow = Math.max(lastRow + 1, 3);

    // Vérification de la première cellule vide dans la colonne B (Date)
    var colBValues = sheet.getRange(1, 2, Math.max(lastRow, 2), 1).getValues();
    for (var r = 2; r < colBValues.length; r++) { // r=2 correspond à la ligne 3 (indexation 1 dans Sheets)
      var val = colBValues[r][0];
      if (!val || val.toString().trim() === "") {
        nextRow = r + 1;
        break;
      }
    }

    // 5. Inscription des données dans les colonnes B à F :
    // - Colonne B (2) : Date
    // - Colonne C (3) : Statut
    // - Colonne D (4) : Nom complet
    // - Colonne E (5) : Email
    // - Colonne F (6) : Description du besoin
    // Note : La colonne A reste vide (marge esthétique), la colonne G reste libre pour vos notes internes.
    sheet.getRange(nextRow, 2, 1, 5).setValues([[
      formattedDate,
      initialStatus,
      name,
      email,
      fullDescription
    ]]);

    // Log de confirmation dans la console Google Apps Script
    console.log("Nouveau contact enregistré à la ligne " + nextRow + " : " + name + " (" + email + ")");

    // 6. Réponse de confirmation au format JSON
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Contact enregistré avec succès dans Google Sheets",
        row: nextRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Journalisation détaillée de l'erreur dans la console Google Apps Script
    console.error("Erreur critique lors de l'enregistrement dans Google Sheets : " + error.toString());

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    // Libération systématique du verrou de concurrence
    lock.releaseLock();
  }
}

/**
 * Fonction de test pour valider l'enregistrement directement depuis l'éditeur Apps Script
 */
function testAjoutLigne() {
  var fauxEvenement = {
    postData: {
      contents: JSON.stringify({
        name: "Test Recruteur",
        email: "recruteur@entreprise-tech.fr",
        subject: "Proposition de stage 2027 (SLAM)",
        message: "Ceci est un test automatique pour valider la synchronisation Google Sheets."
      })
    }
  };
  var resultat = doPost(fauxEvenement);
  Logger.log("Résultat du test : " + resultat.getContent());
}
