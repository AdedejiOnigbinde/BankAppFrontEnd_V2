# Handle Money — Frontend

A banking web application built with Angular 14. Users can manage accounts, make transfers, deposit checks, apply for loans, and view transaction history.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Angular 14 | Frontend framework |
| Tailwind CSS 3 | Utility-first styling |
| Flowbite | UI component library (tabs, popovers) |
| Bootstrap Icons | Icon library |
| TypeScript 4.7 | Language |
| RxJS 7.5 | Reactive HTTP calls |
| typescript-cookie | JWT token storage in cookies |

---

## Prerequisites

Make sure you have these installed before running the project:

- **Node.js** v16 or higher — [nodejs.org](https://nodejs.org)
- **Angular CLI** v14 — install with:
  ```bash
  npm install -g @angular/cli@14
  ```
- The **backend API** running on `http://localhost:8080` (see backend repo)

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure the API URL

Open `src/environments/environment.ts` and set your backend URL:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/'
};
```

If your backend runs on a different port or host, update `apiUrl` here.

### 3. Run the development server
```bash
npm start
```

The app opens at **http://localhost:4200**.

### 4. Build for production
```bash
npm run build
```

Output goes into the `dist/bank-front-end/` folder.

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── landing-page/         # Public homepage
│   │   ├── login-page/           # Login form
│   │   ├── register-page/        # Registration form
│   │   ├── side-bar/             # Desktop sidebar navigation
│   │   └── client-module/        # All authenticated pages (lazy loaded)
│   │       ├── client-dashboard/ # Account balances & transaction history
│   │       ├── transfer/         # Domestic, international & interbank transfers
│   │       ├── deposit/          # Check deposit requests
│   │       ├── new-account/      # Open a new account
│   │       ├── get-loan/         # Loan application (placeholder)
│   │       └── services/         # API service files (account, deposit, transaction, client)
│   ├── services/
│   │   └── auth-service/         # Login & register API calls
│   ├── request-interceptor.service.ts  # Attaches auth token to every request
│   ├── app-routing.module.ts
│   └── app.module.ts
├── environments/
│   ├── environment.ts            # Development config (API URL)
│   └── environment.prod.ts       # Production config
└── styles.css                    # Global styles (Tailwind directives + Google Fonts)
```

---

## Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/client` | Dashboard | Authenticated |
| `/client/transfer` | Transfers | Authenticated |
| `/client/deposit` | Deposit | Authenticated |
| `/client/newaccount` | Open Account | Authenticated |
| `/client/getloan` | Apply for Loan | Authenticated |

---

## Authentication

- After a successful login the API returns a JWT which is stored in a **browser cookie**.
- The `RequestInterceptorService` automatically attaches it as a `Bearer` header on every outgoing HTTP request.
- The interceptor skips auth endpoints (`/login`, `/register`) so they are never sent a token.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server at localhost:4200 |
| `npm run build` | Production build |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests with Karma |

---

## Theming

Colors and fonts are defined in `tailwind.config.js`. The primary palette uses shades of green (`primaryGreen`, `primaryGreenDark`, etc.) alongside error, success, and warning palettes.

To change the brand color, update `primaryGreen` in `tailwind.config.js` — it cascades throughout the entire app automatically since every component references these custom color names.
