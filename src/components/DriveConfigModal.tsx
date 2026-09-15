'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  X,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  FolderTree,
  Key,
} from 'lucide-react';

export default function DriveConfigModal() {
  const { isConfigOpen, setIsConfigOpen, refreshCatalog } = useShop();

  const [apiKey, setApiKey] = useState('');
  const [folderId, setFolderId] = useState('');
  const [testing, setTesting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedEnv, setCopiedEnv] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setApiKey(localStorage.getItem('drive_api_key') || '');
      setFolderId(localStorage.getItem('drive_root_folder_id') || '');
    }
  }, [isConfigOpen]);

  if (!isConfigOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setStatusMsg(null);

    const cleanKey = apiKey.trim();
    const cleanFolder = folderId.trim();

    if (!cleanKey || !cleanFolder) {
      setStatusMsg({
        type: 'error',
        text: 'Inserisci sia la Chiave API che l\'ID della Cartella.',
      });
      setTesting(false);
      return;
    }

    try {
      localStorage.setItem('drive_api_key', cleanKey);
      localStorage.setItem('drive_root_folder_id', cleanFolder);

      await refreshCatalog(cleanKey, cleanFolder);

      setStatusMsg({
        type: 'success',
        text: 'Connessione a Google Drive stabilita con successo! Cartelle e foto sincronizzate.',
      });
    } catch (err: any) {
      setStatusMsg({
        type: 'error',
        text: err.message || 'Errore durante la connessione con Google Drive.',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleResetDemo = async () => {
    localStorage.removeItem('drive_api_key');
    localStorage.removeItem('drive_root_folder_id');
    setApiKey('');
    setFolderId('');
    await refreshCatalog('', '');
    setStatusMsg({
      type: 'success',
      text: 'Ripristinata la modalità dimostrativa con capi di esempio.',
    });
  };

  const envSampleText = `GOOGLE_DRIVE_API_KEY=${apiKey || 'latua_api_key_google'}\nNEXT_PUBLIC_GOOGLE_DRIVE_ROOT_FOLDER_ID=${folderId || 'id_cartella_principale'}`;

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envSampleText);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={() => setIsConfigOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl text-amber-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif">Integrazione Google Drive</h2>
              <p className="text-xs text-neutral-300">
                Collega la tua cartella per trasformare le sottocartelle in menu e le foto in vestiti
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsConfigOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {statusMsg && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <strong>{statusMsg.type === 'success' ? 'Ottimo!' : 'Attenzione:'}</strong>
                <p className="mt-0.5">{statusMsg.text}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleTestAndSave} className="space-y-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-600" />
              <span>Test & Configurazione in Tempo Reale</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Google Cloud API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSyD..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-200 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:outline-hidden font-mono"
              />
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Creabile gratuitamente su Google Cloud con Google Drive API abilitata.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                ID Cartella Principale di Google Drive (Root Folder ID)
              </label>
              <input
                type="text"
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                placeholder="1A2b3C4d5E6fG7h8I9j0..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-200 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:outline-hidden font-mono"
              />
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Stringa alfanumerica nell&apos;URL di Drive dopo: drive.google.com/drive/folders/<strong>ID_QUI</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="submit"
                disabled={testing}
                className="flex-1 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                {testing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifica in corso...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Connetti & Carica Foto</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetDemo}
                className="py-2.5 px-3 border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Ripristina Demo
              </button>
            </div>
          </form>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-amber-600" />
              <span>Come Strutturare la Cartella Google Drive</span>
            </div>

            <div className="bg-amber-50/60 border border-amber-200/70 p-4 rounded-xl text-xs text-amber-950 space-y-2.5 leading-relaxed">
              <p>
                <strong>1. Struttura dei Menu:</strong> Crea una cartella principale (es. &ldquo;Negozio Vestiti&rdquo;) e al suo interno crea le sottocartelle che diventeranno i <strong>menu di navigazione</strong> del sito (es. &ldquo;Abiti&rdquo;, &ldquo;Giacche&rdquo;, &ldquo;Pantaloni&rdquo;).
              </p>
              <p>
                <strong>2. Caricamento Foto:</strong> Trascina le foto dei tuoi capi dentro la rispettiva sottocartella.
              </p>
              <p>
                <strong>3. Prezzi & Nomi Automatici:</strong> Rinomina i file con nome e prezzo (es. <code>Abito Floreale Seta - 79.90.jpg</code> o <code>Giacca Lana_120€.png</code>). Il sito estrae in automatico nome e prezzo!
              </p>
              <p>
                <strong>4. Condivisione:</strong> Tasto destro sulla cartella principale in Drive &rarr; <em>Condividi</em> &rarr; Imposta su <strong>&ldquo;Chiunque abbia il link può visualizzare&rdquo;</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Per il Deploy su Vercel (Environment Variables)
              </span>
              <button
                onClick={handleCopyEnv}
                className="inline-flex items-center gap-1 text-[11px] text-neutral-600 hover:text-neutral-900 underline cursor-pointer"
              >
                {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
                <span>{copiedEnv ? 'Copiato!' : 'Copia blocco'}</span>
              </button>
            </div>
            <pre className="p-3 bg-neutral-900 text-neutral-200 rounded-lg text-[11px] font-mono overflow-x-auto select-all">
              {envSampleText}
            </pre>
            <p className="text-[11px] text-neutral-500">
              Quando colleghi la repository su Vercel, incolla queste variabili in <strong>Settings &gt; Environment Variables</strong>.
            </p>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end">
          <button
            onClick={() => setIsConfigOpen(false)}
            className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
