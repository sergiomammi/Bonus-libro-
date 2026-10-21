# Landing bonus: The Jar & Plan Printables

Il link del bonus (PDF su Drive) non e mai nel codice della pagina: lo restituisce la funzione `api/submit.js` solo dopo che il lead e stato scritto nel foglio.

Il tuo foglio: https://docs.google.com/spreadsheets/d/1J_kvbrTg8s0JXKpowIkEHf-o3OlwWbfcZzpc4sIBmM8/edit
(Se contiene gia dati in altre schede non vengono toccati: lo script scrive solo nella scheda "Lead".)

## 1. Google Sheet + Apps Script
1. Apri il tuo foglio. Menu Estensioni > Apps Script.
2. Cancella il codice di default e incolla tutto `apps-script/Code.gs` cosi com'e (nessuna modifica). Salva.
3. Deploy > Nuovo deployment > icona ingranaggio > "Applicazione web". Esegui come: Me. Chi ha accesso: Chiunque. Deploy.
4. Autorizza l'accesso. Se compare "Google non ha verificato questa app" e normale (e uno script tuo): Avanzate > "Vai al progetto (non sicuro)" > Consenti.
5. Copia l'URL che finisce in `/exec`.

## 2. GitHub
Decomprimi lo zip, crea un repository nuovo su GitHub e carica tutto il contenuto della cartella (file nascosti come `.gitignore` e `.env.example` inclusi). Va bene il caricamento dal sito web ("Add file > Upload files").

## 3. Vercel
1. Su vercel.com: Add New > Project > importa il repository.
2. PRIMA di cliccare Deploy apri "Environment Variables" e inserisci i valori di `.env.example`:
   - GOOGLE_SCRIPT_URL = l'URL `/exec` del punto 1
   - APPS_SCRIPT_SECRET = il valore gia scritto in `.env.example` (copialo identico)
   - BONUS_DRIVE_URL = gia compilato col tuo PDF
   - BOOK_TITLE = gia compilato
3. Deploy. Se aggiungi o cambi variabili dopo un deploy, devi fare "Redeploy" (Deployments > ... > Redeploy), altrimenti la funzione non le legge.

## 4. Verifica
Apri l'URL pubblicato, invia un dato di prova: il link deve comparire solo dopo l'invio, e una riga deve apparire nel foglio nella scheda **"Lead"** (non nella prima scheda che si apre). Se non la vedi, guarda i Runtime Logs della funzione su Vercel (non i log di build).

## 5. Se modifichi Code.gs
Deploy > Gestisci deployment > matita > Versione: "Nuova versione". Non creare un "Nuovo deployment": cambierebbe l'URL `/exec`.

## Importante
- Il PDF su Drive deve essere condiviso come "Chiunque abbia il link: Visualizzatore", altrimenti i lettori non lo aprono.
- Nel PDF puoi poi inserire il QR code che porta a questa landing (pagina 115 del manoscritto).
- Il form raccoglie solo nome, cognome, email, con nota sul trattamento dei dati. Se vuoi invii di newsletter, controlla le regole privacy (GDPR) applicabili.
