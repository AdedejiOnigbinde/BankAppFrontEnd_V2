# Handle Money — Frontend

A full-featured banking web application built with Angular 14. Users can manage accounts, make transfers, deposit checks, apply for loans, view and pay existing loans, and track transaction history — all from a clean, responsive interface.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Angular 14 | Frontend framework |
| Tailwind CSS 3 | Utility-first styling |
| Bootstrap Icons | Icon library |
| TypeScript 4.7 | Language |
| RxJS 7.5 | Reactive HTTP calls |
| typescript-cookie | JWT token storage in cookies |

> Flowbite was removed from all component logic. All accordions, tabs, and interactive patterns are now driven by pure Angular bindings.

---

## Prerequisites

- **Node.js** v16 or higher — [nodejs.org](https://nodejs.org)
- **Angular CLI** v14:
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

Open `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/'
};
```

### 3. Run the development server
```bash
npm start
```

Opens at **http://localhost:4200**.

### 4. Build for production
```bash
npm run build
```

Output: `dist/bank-front-end/`

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── landing-page/         # Public homepage (hero, services, reviews, FAQ, footer)
│   │   ├── login-page/           # Login form with show/hide password
│   │   ├── register-page/        # Registration form with show/hide password
│   │   ├── side-bar/             # Desktop sidebar — Angular accordion, Bootstrap Icons
│   │   └── client-module/        # All authenticated pages (lazy loaded)
│   │       ├── client-dashboard/ # Account balances, transaction history & stats
│   │       ├── transfer/         # Domestic, international & interbank transfers
│   │       ├── deposit/          # Check deposit requests
│   │       ├── new-account/      # Open a new account (2-step form with card selection)
│   │       ├── get-loan/         # 3-step sliding loan application form
│   │       ├── pay-loan/         # Loan list & payment page
│   │       └── services/
│   │           ├── account/      # Account API calls
│   │           ├── client/       # Client profile & beneficiary API calls
│   │           ├── deposit/      # Deposit API calls
│   │           ├── loan/         # Loan API calls (apply, list, pay, sum)
│   │           └── transaction/  # Transfer API calls
│   ├── services/
│   │   └── auth-service/         # Login & register
│   ├── request-interceptor.service.ts  # Adds Bearer token & base URL to every request
│   ├── app-routing.module.ts
│   └── app.module.ts
├── environments/
│   ├── environment.ts            # Dev config
│   └── environment.prod.ts       # Production config
├── favicon.svg                   # Custom Handle Money favicon
└── styles.css                    # Tailwind directives + Google Fonts (Mulish)
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
| `/client/payloan` | My Loans & Payments | Authenticated |

---

## Features

### Public Pages
- **Landing page** — hero section, how-it-works steps, services, user reviews (card grid), FAQ accordion, footer with social links
- **Login / Register** — branded card with green header, icon-prefixed inputs, show/hide password toggle, loading state on submit

### Authenticated App
- **Layout** — fixed sidebar on desktop; fixed bottom navigation bar on mobile (Dashboard, Transfer, Deposit, Account)
- **Dashboard** — live account balance cards, income/expense tab view with filtered transaction list, overview panel with calculated percentages
- **Transfer** — three-tab form (Domestic / International / Interbank) with icon inputs, beneficiary list with one-click auto-fill, per-form loading guards
- **Deposit** — check deposit form with optional split-amount section, deposit history table
- **Open Account** — card-style radio button account type selection, styled agreement checkboxes, success modal
- **Apply for Loan** — 3-step sliding form (Personal Info → Loan Details → Review & Submit) with live repayment calculator, wired to `POST /client/loan`
- **My Loans** — loan summary header, loan cards with status colours and progress bars; clicking an approved loan opens a detail + payment view with quick-fill buttons

---

## Authentication

- JWT returned on login is stored in a **browser cookie** via `typescript-cookie`
- `RequestInterceptorService` prepends the base URL and attaches the `Bearer` token to every outgoing request
- Auth endpoints (`/login`, `/register`, `/register-admin`) are excluded from the interceptor

---

## API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `POST /auth/login` | Login |
| `POST /auth/register` | Register user |
| `GET /account/client` | Get all accounts for the logged-in user |
| `POST /account/create` | Open a new account |
| `GET /account/deposit` | Get deposit history |
| `POST /account/deposit` | Submit a check deposit |
| `GET /transaction/recent` | Get recent transactions |
| `POST /transaction/outer-bank` | Domestic / international transfer |
| `POST /transaction/inner-bank` | Interbank transfer |
| `POST /transaction/loan` | Make a loan payment |
| `GET /client/profile` | Get client profile data |
| `GET /client/beneficiary` | Get beneficiary list |
| `GET /client/loan/sum` | Get total outstanding loan balance |
| `POST /client/loan` | Apply for a loan |
| `GET /client/loan` | Get all loans |
| `GET /client/loan/{id}` | Get a single loan |

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

To rebrand, update `primaryGreen` in `tailwind.config.js` — it cascades to every component automatically.
