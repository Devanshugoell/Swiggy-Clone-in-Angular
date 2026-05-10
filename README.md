# Swiggy Clone Angular

A Swiggy-inspired food ordering frontend built with Angular standalone components, Tailwind CSS, and route guarding. The app includes authentication, restaurant discovery, menu browsing, cart management, and order confirmation flows.

## Demo Features

- Sign in and register pages integrated with EscuelaJS auth APIs
- Protected application layout using child-route guard
- Home page with banners and top restaurant listing
- Search page with popular cuisines and restaurant filtering
- Restaurant menu page with categorized item sections
- Persistent cart with add, remove, quantity controls, and totals
- Toast notifications for cart and order actions

## Tech Stack

- Angular 18 (standalone components)
- Angular Router
- Angular HttpClient
- RxJS
- Tailwind CSS + PostCSS
- LocalStorage persistence for auth token and cart items

## Route Map

Public routes:

- `/` -> Sign in
- `/register` -> Register

Guarded routes (requires authentication):

- `/restaurant` -> Home page
- `/search` -> Search page
- `/cart` -> Cart page
- `/thankyou` -> Thank you page
- `/restaurants/:resId` -> Restaurant menu page

## APIs Used

Authentication:

- `POST https://api.escuelajs.co/api/v1/auth/login`
- `POST https://api.escuelajs.co/api/v1/users`

Restaurant and menu data:

- `GET https://foodfire.onrender.com/api/restaurants?...`
- `GET https://foodfire.onrender.com/api/menu?...&restaurantId={id}`
- `GET https://www.swiggy.com/dapi/landing/PRE_SEARCH?...`

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm start
```

The app runs with Angular dev server (usually at `http://localhost:4200`).

## Available Scripts

- `npm start` -> Starts Angular dev server
- `npm run dev` -> Alias for dev server
- `npm run build` -> Production build
- `npm run watch` -> Development watch build

## Build Output

- Angular output path: `dist/swiggy-clone-angular`

## Deployment (Netlify)

This repository includes:

- `netlify.toml` with SPA redirect rules
- `public/_redirects` fallback support

Build command:

```bash
npm run build
```

Publish directory configured in `netlify.toml`:

```toml
dist
```

If your deployment expects the Angular app output folder directly, use `dist/swiggy-clone-angular` as the publish directory.

## Project Structure

```text
src/
  app/
    components/       Reusable UI pieces (header, footer, cards, banner, etc.)
    guards/           Route guards
    models/           Shared TypeScript interfaces
    pages/            Route-level pages
    services/         Auth, cart, notification, and restaurant data services
```

## Notes

- Auth token is persisted in LocalStorage key: `token`
- Cart items are persisted in LocalStorage key: `cartItems`
