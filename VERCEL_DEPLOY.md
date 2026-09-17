# 🚀 Guida al Deploy su Vercel - NotExistShoppingPlace

Questo progetto è configurato e ottimizzato al **100% per Vercel** con:
- **Next.js 16 (App Router)** e Node.js 20+ LTS
- **Vercel Edge CDN Caching (SWR)** per le API
- **Vercel Image Optimization** con supporto AVIF/WebP per foto eBay e Google Drive
- **File di configurazione `vercel.json`** con security headers (HSTS, CSP, no-sniff)
- **Sitemap (`/sitemap.xml`) e Robots (`/robots.txt`)** automatici per la SEO
- **Zero-Config Ready**: funziona anche senza variabili d'ambiente grazie al catalogo eBay verificato integrato!

---

## 🌟 Metodo 1: Deploy Rapido via Browser (Consigliato)

1. Vai su **[vercel.com](https://vercel.com/)** ed effettua l'accesso con il tuo account **GitHub**.
2. Clicca sul pulsante **"Add New..."** in alto a destra &rarr; **"Project"**.
3. Seleziona il repository: **`0NotExist0/neWebServices`** e clicca **"Import"**.
4. **Configurazione Progetto**:
   - **Framework Preset**: *Next.js* (rilevato automaticamente).
   - **Root Directory**: `./` (predefinito).
   - **Build Command**: `npm run build` (predefinito).
   - **Output Directory**: `.next` (predefinito).
5. *(Opzionale)* **Environment Variables**:
   Se desideri sincronizzare anche la tua cartella Google Drive personale:
   - `GOOGLE_DRIVE_API_KEY`: la tua chiave Google Cloud API (es. `AIzaSyB...`)
   - `NEXT_PUBLIC_GOOGLE_DRIVE_ROOT_FOLDER_ID`: l'ID della tua cartella Google Drive (`1PR1I8P0EgYuBkRkzl4dMcAKOPNCaBozV`)
   - `NEXT_PUBLIC_EBAY_USERNAME`: `newebservices`
   - `NEXT_PUBLIC_STORE_NAME`: `NotExistShoppingPlace`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `coming soon` (o il tuo numero quando attivo)
6. Clicca su **"Deploy"**.
7. In meno di 60 secondi il tuo sito sarà online con dominio gratuito `https://newebservices.vercel.app` (e certificato SSL HTTPS attivo)!

---

## ⚡ Metodo 2: Deploy da Terminale con Vercel CLI

Se preferisci effettuare il deploy direttamente da riga di comando:

```bash
# 1. Installa la CLI di Vercel (se non l'hai già)
npm install -g vercel

# 2. Effettua il login
vercel login

# 3. Lancia il deploy di produzione
vercel --prod
```
