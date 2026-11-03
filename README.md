<h1 style="display: flex; align-items: center; gap: 10px;">
  <img src="./public/icon.png" alt="StudioSpace logo" width="35" />
  StudioSpace
</h1>

**A peer-to-peer marketplace for creative studios.** Hosts list photo studios, sound stages, podcast rooms, music suites and art workshops. Creators discover them, check pricing, and book the hours they need.

<br clear="left" />

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Better Auth](https://img.shields.io/badge/Better_Auth-000000?logo=betterauth&logoColor=white)](https://www.better-auth.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel)](https://vercel.com)

---

## Live Site

| Resource | URL |
|---|---|
| **Live Site (Client)** | [studio-space-v1.vercel.app](https://studio-space-v1.vercel.app) |
| **API (Server)** | [studio-space-server-v1.vercel.app](https://studio-space-server-v1.vercel.app) |
| **Sample Endpoint** | [`/studios`](https://studio-space-server-v1.vercel.app/studios) |
| **Server Repository** | [github.com/asm-saim/studio-space-server](https://github.com/asm-saim/studio-space-server) |

---

## Examiner Test Credentials

Log in with either account below, or use **Continue with Google**.

| Role | Email | Password |
|---|---|---|
| **Host** (owns the demo studios, receives booking requests) | `host@studiospace.demo` | `Host1234` |
| **Guest** (books studios) | `guest@studiospace.demo` | `Guest1234` |


---

## Overview

StudioSpace is a full-stack web application designed to simplify the discovery and booking of creative workspaces. It connects studio owners with creators looking for professional environments to bring their ideas to life.

From photography studios and cinema sound stages to podcast lounges and music recording suites, StudioSpace provides a centralized platform for discovering spaces, managing listings, and handling reservations.

The platform focuses on delivering an intuitive user experience, secure authentication, responsive design, and reliable booking management.

---

## Features

### Home Page & Studio Discovery
- **Dynamic Home Page:** Full-screen Swiper hero slider, top 6 highest-rated studios fetched from MongoDB, category cards with pre-selected filters, and dedicated "How Booking Works" and "Host Guarantee" sections.
- **Explore & Search:** Browse studios in a consistent card grid, filter by category, and search by studio name or location. Includes user-friendly empty states.

### Studio Management
- **Studio CRUD Operations:** Hosts can create, update, and delete their own studio listings, including pricing, deposits, capacity, amenities, image galleries, and detailed descriptions.
- **Image Management:** Studio images are uploaded through ImgBB and displayed in listing galleries.
- **Studio Details:** Dedicated studio pages featuring image carousels, specifications, amenities, host information, and reviews.

### Booking & Reservation Management
- **Booking System:** Submit booking requests through the "Book Workspace Now" modal, with pricing calculated dynamically based on the selected booking duration.
- **Booking Lifecycle:** Bookings begin with a **Pending** status. Guests can cancel pending bookings, while hosts can confirm or decline requests through a dedicated management page.
- **Booking Status Tracking:** Consistent status badges for Pending, Confirmed, Completed, and Cancelled bookings.
- **Double-Booking Prevention:** MongoDB time-overlap queries prevent conflicting confirmed reservations. The server revalidates booking availability when hosts confirm requests and returns HTTP 409 for scheduling conflicts.

### Dashboard & User Management
- **Personalized Dashboard:** Overview of studio listings, booking requests, personal bookings, and recent activity, with quick actions for pending requests.
- **Authentication:** Email/password registration and Google sign-in powered by Better Auth and its MongoDB adapter.
- **Form Validation:** Password requirements and authentication form errors are handled with inline validation.

### Security & Authorization
- **JWT Authentication:** Signed JWTs are stored in HttpOnly cookies for authenticated sessions.
- **Protected API Endpoints:** Studio creation, updates, deletion, and booking requests require valid authentication and return HTTP 401 when unauthorized.
- **Server-Side Authorization:** The Express backend independently verifies authentication tokens before processing protected operations.

### User Experience & Interface
- **Light & Dark Themes:** Theme switching through a sun/moon toggle, with preferences remembered across reloads and no theme flash.
- **Responsive Design:** Optimized layouts for mobile, tablet, and desktop devices.
- **Loading States:** Skeleton loaders and spinners provide visual feedback during data fetching.
- **Notifications:** Sonner toast notifications provide feedback for user actions.
- **Custom Error Handling:** Dedicated 404 page, confirmation modals for destructive actions, and contextual empty states.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui (Base UI), Lucide icons, Swiper, Embla Carousel |
| Feedback | Sonner toasts, custom dialogs |
| Authentication | BetterAuth, MongoDB adapter, Google OAuth, JWT (`jose`) |
| Backend | Express 5 |
| Database | MongoDB Atlas |
| Image uploads | imgBB API |
| Hosting | Vercel|

---

## Routes

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

---

## Local Setup

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
---

## How It Fits Together

```
Browser ──► Next.js client (Vercel) ──► Express API (Vercel) ──► MongoDB Atlas
              │  BetterAuth sessions        │  verifies the JWT
              │  HttpOnly JWT cookie        │  owner checks, overlap checks
              └─ imgbb image uploads
```

The Next.js app handles sign-in and holds the HttpOnly JWT cookie. Every mutation goes through a guarded `/api` route, which forwards the token to the Express server. Express verifies the token again before touching the database.

---

## Application Architecture
 
The project is split into two applications that live side by side:
 
```text
StudioSpace
│
├── studio-space-client              # Next.js app (this repository)
│   ├── src
│   │   ├── app                      # Pages, API route handlers, loading and 404 pages
│   │   ├── components               # auth, dashboard, home, layout, shared, studios, theme, ui
│   │   └── lib                      # Authentication, JWT, API helpers, data fetching, formatting
│   ├── public                       # Logo and static assets
│   └── README.md
│
└── studio-space-server              # Express REST API
    ├── routes                       # studios.js, bookings.js
    ├── middleware                   # auth.js (JWT verification)
    ├── db.js                        # MongoDB connection and collections
    ├── index.js                     # App entry point
    └── seed.js                      # Demo studio data
```
 
---

## Future Improvements

Potential enhancements include:

- Studio wishlist and favorites.
- PDF booking invoice generation.
- Advanced availability calendars.
- Reviews and ratings.
- Online payment integration.
- Enhanced studio recommendation and discovery features.

---

## Author

Built by **A S M Saim** 