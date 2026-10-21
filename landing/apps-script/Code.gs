// Incolla questo file cosi com'e in Apps Script (nessuna modifica richiesta).
var SHARED_SECRET = "xaNEZeC68cFMXOk1_rV17vOqMFrZq6C_";
var SHEET_NAME = "Lead";

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (!d || d.secret !== SHARED_SECRET) return out_({ok:false, error:"unauthorized"});
    var email = String(d.email || "").trim().toLowerCase();
    if (!email) return out_({ok:false, error:"email"});
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(["Data","Nome","Cognome","Email","Libro"]);
      sh.setFrozenRows(1);
    }
    var row = [d.timestamp || new Date().toISOString(), d.nome, d.cognome, email, d.libro || ""];
    var last = sh.getLastRow();
    var found = 0;
    if (last > 1) {
      var emails = sh.getRange(2, 4, last - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).toLowerCase() === email) { found = i + 2; break; }
      }
    }
    if (found) sh.getRange(found, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
    return out_({ok:true});
  } catch (err) {
    return out_({ok:false, error:String(err)});
  }
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
