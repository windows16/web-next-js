This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuración de autenticación

Copia `.env.example` a `.env.local` y configura:

- `NEXT_PUBLIC_API_URL`: URL de NestJS con el prefijo `/api`.

El inicio de sesión se realiza mediante `POST /v1/auth/login` de la API NestJS.
La web guarda el `access_token` devuelto en una cookie y el middleware protege
las rutas privadas. El cliente `apiFetch` envía ese token como
`Authorization: Bearer <access_token>` a los endpoints protegidos. La web no
necesita una URL ni una `anon key` de Supabase.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
