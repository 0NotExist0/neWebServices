# 👗 NotExistShoppingPlace - by 0Not_Exist0

E-Commerce esclusivo di abbigliamento per **NotExistShoppingPlace** curato da **0Not_Exist0**, sincronizzato in automatico con **Google Drive**, pronto per il deploy su **GitHub** e l'hosting su **Vercel**.

Il sito è collegato direttamente a **Google Drive** tramite API Key:
- **Menu Categorie Automatici**: ogni sottocartella su Google Drive diventa automaticamente una voce di menu/categoria navigabile con conteggio dei capi!
- **Caricamento Foto Istantaneo**: ti basta caricare o trascinare le foto nella rispettiva cartella per vederle comparire sul sito.
- **Parsing Intelligente di Nomi e Prezzi**: se nomini il file indicando il prezzo (es. `Abito_Seta_Floreale_79.90€.jpg` o `Giacca Sartoriale - 120.png`), il sito estrae il titolo pulito e imposta il prezzo corrispondente!

---

## ✨ Funzionalità Incluse

1. **Menu di Navigazione Dinamico**:
   - Menu desktop e mobile (drawer responsive) generato dalle cartelle di Google Drive.
   - Filtri a pillola con conteggio dei prodotti disponibili per ogni categoria.
2. **Vetrina Prodotti e Schede Capi**:
   - Griglia responsive con animazioni fluide.
   - Badge automatici (Saldi, Novità, Cartella Drive).
   - Selettore rapido delle taglie (XS, S, M, L, XL) direttamente sulla card o nel modal.
   - **Quick View Modal** con anteprima dettagliata ad alta risoluzione e zoom.
3. **Carrello & Checkout Intelligente**:
   - Carrello a comparsa laterale (drawer) con calcolo subtotale e soglia spedizione gratuita.
   - **Ordine rapido via WhatsApp**: genera e invia direttamente un messaggio con il riepilogo del carrello, taglie scelte e dati di spedizione.
   - Modulo di spedizione con conferma immediata.
4. **Pannello di Configurazione & Test Live**:
   - Un comodo assistente integrato nella barra superiore permette di testare la propria API Key e l'ID della cartella Google Drive in tempo reale direttamente nel browser.
   - Fallback elegante in modalità dimostrativa con vestiti d'esempio nel caso non sia ancora inserita una chiave.

---

## 🚀 Come Configurare Google Drive in 4 Semplici Passaggi

### 1. Crea la Cartella su Google Drive
1. Vai su [Google Drive](https://drive.google.com/) e crea una cartella principale (es. `Negozio Vestiti`).
2. All'interno crea le sottocartelle che faranno da **Menu** sul sito:
   - `Abiti & Vestiti`
   - `Giacche & Cappotti`
   - `Camicie & Top`
   - `Pantaloni & Denim`
   - `Borse & Accessori`
3. Trascina le foto dei tuoi capi all'interno della rispettiva cartella.
4. **Convenzione Nomi File (Facoltativa ma Consigliata)**:
   - `Nome Del Capo - 59.90.jpg` &rarr; Il sito estrarrà **Nome Del Capo** con prezzo **59,90 €**
   - `Abito Lungo Seta 89€.png` &rarr; Il sito estrarrà **Abito Lungo Seta** con prezzo **89,00 €**
   - Se non indichi il prezzo nel nome, verrà applicato un prezzo predefinito.

### 2. Condividi la Cartella come Pubblica
1. Clicca con il tasto destro sulla cartella principale &rarr; **Condividi** &rarr; **Condividi**.
2. Sotto *Accesso generale*, seleziona **"Chiunque abbia il link"** con ruolo **"Visualizzatore"**.
3. Copia l'ID della cartella dall'URL nel browser:
   - Nell'URL `https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ`
   - L'ID è: `1aBcDeFgHiJkLmNoPqRsTuVwXyZ`

### 3. Ottieni una Google Cloud API Key (Gratuita)
1. Vai su [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un nuovo progetto (es. `Boutique Drive`).
3. Vai nel menu a sinistra &rarr; **API e servizi** &rarr; **Libreria**.
4. Cerca **Google Drive API** e clicca su **Abilita**.
5. Vai su **API e servizi** &rarr; **Credenziali** &rarr; **Crea credenziali** &rarr; **Chiave API**.
6. Copia la chiave generata (es. `AIzaSyD...`).

### 4. Imposta le Variabili d'Ambiente
Crea o modifica il file `.env.local`:
```env
GOOGLE_DRIVE_API_KEY="AIzaSyD..."
NEXT_PUBLIC_GOOGLE_DRIVE_ROOT_FOLDER_ID="1aBcDeFgHiJkLmNoPqRsTuVwXyZ"

# Configurazione Negozio
NEXT_PUBLIC_STORE_NAME="Atelier Boutique"
NEXT_PUBLIC_WHATSAPP_NUMBER="+393400000000"
```

---

## 💻 Esecuzione in Locale

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri `http://localhost:3000` nel browser per vedere il sito.

---

## 🌐 Pubblicazione su GitHub e Vercel

### 1. Invia il progetto su GitHub
```bash
git add .
git commit -m "Inizializzazione Atelier Boutique con Google Drive sync"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/NOME_REPOSITORY.git
git push -u origin main
```

### 2. Collega a Vercel
1. Vai su [Vercel](https://vercel.com/) ed effettua il login (anche con account GitHub).
2. Clicca su **Add New...** &rarr; **Project**.
3. Seleziona la repository GitHub appena creata.
4. Nella sezione **Environment Variables**, aggiungi le due variabili:
   - `GOOGLE_DRIVE_API_KEY`: la tua chiave Google Cloud
   - `NEXT_PUBLIC_GOOGLE_DRIVE_ROOT_FOLDER_ID`: l'ID della tua cartella principale su Drive
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: il tuo numero di telefono con prefisso internazionale per ricevere gli ordini
5. Clicca su **Deploy**.
6. In meno di un minuto il tuo sito sarà online con dominio gratuito `.vercel.app` e certificato SSL HTTPS attivo!

---

## 🛠️ Stack Tecnologico
- **Next.js 16 (App Router)** - Framework React all'avanguardia con Server Components e API routes.
- **Tailwind CSS v4** - Stili moderni, reattivi e leggeri per una resa grafica luxury.
- **Google Drive API v3** - Sincronizzazione automatica ad alte prestazioni con cache e CDN Google.
- **Lucide React** - Set completo di icone vettoriali.
- **WhatsApp Direct Order API** - Conversione immediata con checkout WhatsApp precompilato.
