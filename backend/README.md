# Express + TypeScript REST API (v5)

A minimal, production-ready REST API scaffold using **Express 5**, **TypeScript 5.9**, **ESLint (flat)** and **Prettier 3.7**.

## Quick Start

```bash
# Node 24 LTS recommended
node -v

npm install
npm run dev          # loads .env via Node's native --env-file
npm run lint         # zero warnings baseline
npm run typecheck
npm run build && npm run start
```

### Endpoints

- `GET /healthz` – health check
- `GET /api/v1/status` – app name, version, environment

### Best Practices included

- Strict TypeScript compiler options
- Centralized error handling via `ErrorRequestHandler`
- Security headers with `helmet`, permissive CORS (tune for prod)
- Native env loading (no dotenv)
