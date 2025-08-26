# Arisan Realtime — Server

## Menjalankan Lokal
1. Install deps: `npm install`
2. Salin env: `cp .env` lalu sesuaikan `DATABASE_URL`, dll.
3. Migrasi & seed: `npm run migrate && npm run seed`
4. Jalankan dev: `npm run dev` (default port 4000)

## Catatan
- Autentikasi JWT (Bearer) di REST & Socket.IO handshake (`auth.token`).
- Undian adil pakai `crypto.randomInt`, tanpa double-win, persist ke DB.
- Fun Facts AI opsional via Responses API (lihat `.env`).

