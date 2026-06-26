# Cine de Santiago

Réplica visual de una landing de cine (a partir de un handoff de Claude Design), construida como app completa con **Next.js + Tailwind + shadcn/ui + Firebase**. Incluye autenticación (login / registro) y persistencia de usuarios en Firestore.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Firebase**: Auth (email/password) + Firestore + Admin SDK
- **Vitest** + React Testing Library

## Rutas

- `/` — landing (hero/carrusel infinito, cartelera, promociones, socio, dulcería, app, footer)
- `/dulceria` — carta de dulcería
- `/login` · `/registro` — autenticación
- `/cuenta` — detalle de la cuenta (protegida)
- `/api/users` — persiste el perfil del usuario en Firestore (Admin SDK)

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completa con tu config de Firebase
# coloca el service account en ./firebase-service-account.json (gitignored)
npm run dev
```

## Variables de entorno

Ver [`.env.example`](.env.example). Las `NEXT_PUBLIC_FIREBASE_*` son la config web (pública);
la credencial del Admin SDK es **secreta** (archivo local, o `FIREBASE_SERVICE_ACCOUNT_B64` en producción).

## Tests y build

```bash
npm run test
npm run build
```
