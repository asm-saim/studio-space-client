<h1 style="display: flex; align-items: center; gap: 10px;">
  <img src="./public/icon.png" alt="StudioSpace logo" width="35" />
  StudioSpace
</h1>

**A peer-to-peer marketplace for creative studios.** Hosts list photo studios, sound stages, podcast rooms, music suites and art workshops. Creators discover them, check pricing, and book the hours they need.

<br clear="left" />

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

## 🔗 Live Site

| | |
|---|---|
| **Live site (client)** | https://studio-space-v1.vercel.app |
| **API (server)** | https://studio-space-server-v1.vercel.app |
| **Server repository** | https://github.com/asm-saim/studio-space-server |

## 🔑 Examiner Test Credentials

Log in with either account below, or use **Continue with Google**.

| Role | Email | Password |
|---|---|---|
| **Host** (owns the demo studios, receives booking requests) | `host@studiospace.demo` | `Host1234` |
| **Guest** (books studios) | `guest@studiospace.demo` | `Guest1234` |

You can also register a new account. Passwords need an uppercase letter, a lowercase letter, and at least 6 characters.

## ✨ Features

- **Dynamic home page.** A full-screen Swiper hero slider, the top 6 rated studios fetched live from MongoDB, category cards that open `/studios` with that category pre-selected, a "How Booking Works" section, and a "Host Guarantee" section.
- **Explore and search.** Browse every studio in an equal-height card grid, filter by category, and search by name or location. Empty results show a friendly state with a way back.
- **Full studio CRUD.** Hosts add, update and delete their own listings. A listing has pricing, deposit, capacity, amenity tags, a gallery of images uploaded through imgbb, and a detailed overview. Deleting asks for confirmation in a custom modal first.
- **Studio details and booking.** Each studio has an image-gallery carousel, specifications, amenities, host details and reviews. The "Book Workspace Now" modal shows live pricing for the hours you pick.
- **Booking lifecycle.** New bookings start as **Pending**. Guests can cancel pending bookings, and hosts confirm or decline requests from a dedicated page. Status badges cover Pending, Confirmed, Completed and Cancelled.
- **Personal dashboard.** A summary of your studios, booking requests, bookings and recent activity, with quick actions for pending requests.
- **Authentication.** Email and password sign-up, plus Google sign-in, powered by BetterAuth with the MongoDB adapter. Password rules are checked in the form with inline errors.
- **Polished experience.** Light and dark themes, skeleton loaders and spinners, toast feedback for every action (Sonner), a custom 404 page, and a layout that works on mobile, tablet and desktop.

## 🏆 Challenges Implemented

| Challenge | How it works |
|---|---|
| **1. JWT in HttpOnly cookies** | Logging in sets a signed JWT in an HttpOnly cookie. `POST /api/studios`, `PUT` and `DELETE /api/studios/[id]`, and `POST /api/bookings` return **401 Unauthorized** without a valid token. The Express server verifies the token again independently. |
| **2. Double-booking prevention** | Before saving, the server checks the studio's **Confirmed** bookings for the same date with a MongoDB overlap query (`startMin < newEnd` and `endMin > newStart`). Collisions get a **409** and a clear message such as "That time overlaps a confirmed booking (2:00 PM – 4:00 PM)". The check runs again when a host confirms a request. |
| **3. Theme customization** | A sun/moon toggle in the navbar switches the whole app between light and dark. The choice is remembered, and there is no flash on reload. |

### Quick ways to verify

1. **401 check:** this returns `401 Unauthorized`.
   ```bash
   curl -i -X POST https://studio-space-v1.vercel.app/api/studios -H "Content-Type: application/json" -d "{}"
   ```
   After logging in, open DevTools, then Application, then Cookies, and `studiospace_jwt` is marked **HttpOnly**.
2. **Double-booking check:** log in as the Guest and book a studio. Log in as the Host, open **Booking requests**, and confirm it. Then book the same studio, date and an overlapping time again. The overlap is rejected with a toast.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui (Base UI), Lucide icons, Swiper, Embla Carousel |
| Feedback | Sonner toasts, custom dialogs |
| Authentication | BetterAuth, MongoDB adapter, Google OAuth, JWT (`jose`) |
| Backend | Express 5 (separate repository) |
| Database | MongoDB Atlas |
| Image uploads | imgbb API |
| Hosting | Vercel (client and server) |

## 🧭 Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Hero, featured studios, categories, how it works |
| `/studios` | Public | Explore, search and filter |
| `/studios/[id]` | Public | Studio details and booking |
| `/login`, `/register` | Public | Authentication |
| `/dashboard` | Private | Personal overview |
| `/add-studio` | Private | Create a listing |
| `/my-listings` | Private | Manage your listings |
| `/studios/edit/[id]` | Private | Update a listing |
| `/my-bookings` | Private | Your reservations |
| `/booking-requests` | Private | Confirm or decline requests for your studios |

## 🚀 Local Setup

### Prerequisites

- Node.js **20.9 or newer** and npm
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (allow your IP in Network Access)
- A Google OAuth client ([Google Cloud Console](https://console.cloud.google.com/apis/credentials))
- A free [imgbb API key](https://api.imgbb.com)

### 1. Start the server

```bash
git clone https://github.com/asm-saim/studio-space-server.git
cd studio-space-server
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/studiospace?retryWrites=true&w=majority
JWT_SECRET=a-long-random-string-of-32-or-more-characters
```

Then seed the demo studios and run it:

```bash
npm run seed     # inserts demo studios (use npm run seed:reset to start over)
npm run dev      # http://localhost:5000
```

### 2. Start the client

```bash
git clone https://github.com/asm-saim/studio-space-client.git
cd studio-space-client
npm install
```

Create a `.env.local` file:

```env
API_URL=http://localhost:5000
JWT_SECRET=a-long-random-string-of-32-or-more-characters   # must match the server
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/studiospace?retryWrites=true&w=majority
BETTER_AUTH_SECRET=another-long-random-string
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
IMGBB_API_KEY=your-imgbb-key
```

In Google Cloud Console, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI. Then run:

```bash
npm run dev      # http://localhost:3000
```

### Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint |

## 🏗️ How It Fits Together

```
Browser ──► Next.js client (Vercel) ──► Express API (Vercel) ──► MongoDB Atlas
              │  BetterAuth sessions        │  verifies the JWT
              │  HttpOnly JWT cookie        │  owner checks, overlap checks
              └─ imgbb image uploads
```

The Next.js app handles sign-in and holds the HttpOnly JWT cookie. Every mutation goes through a guarded `/api` route, which forwards the token to the Express server. Express verifies the token again before touching the database.

## 📁 Project Structure

```
src/
├── app/            # Routes: pages, API route handlers, loading and 404 pages
├── components/     # auth, dashboard, home, layout, shared, studios, theme, ui
└── lib/            # auth, JWT, API helpers, data fetching, formatting
```

## 👤 Author

Built by **A S M Saim** for the StudioSpace assignment.