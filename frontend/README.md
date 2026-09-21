# FindMyCrew — Frontend

The client for FindMyCrew: a platform where freelancers who land a project too big to handle solo can post it, hire verified teammates directly, and build a review-based reputation across every job they take.

## What you can do

- **Discover** — browse open projects on the Gigs feed, see payment offers and required skills
- **Post** — advertise your own project with a real payment offer to recruit teammates
- **Hire** — close a project once you've found the right person, recorded against their actual FindMyCrew profile
- **Review** — leave feedback for a hirer or a hired teammate once a project is closed, visible on their public profile
- **Manage** — edit your profile, see reviews about you, view your work history, or delete your account

## Tech stack

- React (Vite)
- React Router for client-side routing
- Plain CSS (no framework)
- Context API for auth state

## Getting started

```bash
git clone <this-repo-url>
cd frontend
npm install
npm run dev
```

By default, the app expects the backend running at `http://localhost:5000`. Update the `API_URL` constant in `src/services/api.js` if your backend runs elsewhere.

## Project structure

src/
├── components/ # Reusable UI (Navbar, DashboardLayout, ProtectedRoute)
├── context/ # Auth state (AuthContext)
├── pages/ # One file per route
├── services/ # All API calls in one place (api.js)
└── styles/ # One CSS file per page/component


## Pages

| Route | Page |
|---|---|
| `/` | Landing |
| `/login` | Login |
| `/register` | Register |
| `/dashboard` | Open projects feed |
| `/dashboard/profile` | Your profile + reviews about you |
| `/dashboard/my-project` | Projects you've posted (hire & close, leave reviews) |
| `/dashboard/worked-on` | Projects you were hired for (review your hirer) |
| `/dashboard/history` | Reviews you've written |
| `/dashboard/manage` | Delete your account |
| `/dashboard/post-project` | Post a new project |
| `/dashboard/projects/:id` | A single project's details |
| `/dashboard/users/:id` | A public profile |

## Notes

- All contact between hirer and candidate happens over email (a `mailto:` link) — this app never stores messages.
- Route access beyond Landing, Login, and Register requires a valid login (enforced via `ProtectedRoute`).