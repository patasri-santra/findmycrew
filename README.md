# FindMyCrew

A MERN platform for freelancers who land a project too big to handle solo. Post the project with a real payment offer, get emails from verified candidates, hire the right person, and build a review-based reputation that follows you across every job — all without a single group chat.

## How it works

1. **Register** as a verified member (email OTP verification required)
2. **Post a project** — title, description, required skills, and a real payment offer
3. Interested freelancers **browse open projects** and email you directly to apply
4. You **hire** whoever fits, closing the project against their real FindMyCrew profile
5. Once closed, **either side can leave a review** — hirer reviews hired, or hired reviews hirer
6. Every review builds a **public, verifiable work history** on that person's profile

Real interviewing, contracts, and payment all happen outside the platform (over email) — FindMyCrew only handles discovery, verification, and reputation.

## Project structure

findmycrew/
├── backend/ # Express + MongoDB API — see backend/README.md
└── frontend/ # React (Vite) client — see frontend/README.md


## Tech stack

- **Frontend:** React (Vite), React Router, Context API, plain CSS
- **Backend:** Node.js, Express, MongoDB + Mongoose, JWT, bcrypt, Nodemailer

## Running locally

**Backend:**
```bash
cd backend
npm install
# create a .env file — see backend/README.md for required variables
npm run dev
```

**Frontend** (in a separate terminal):
```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend running at `http://localhost:5000` by default.

## What's deliberately not built (yet)

- A weekly reminder email nudging hirers to close stale open posts
- Automatic archiving/deletion of old closed projects

Both were scoped out to prioritize a complete, working core loop over nice-to-have polish.

## Full documentation

- [Backend README](./backend/README.md) — API routes, auth flow, environment setup
- [Frontend README](./frontend/README.md) — pages, project structure, routing
