# FindMyCrew — Backend

The API powering FindMyCrew: a platform where freelancers who land a project too big to handle solo can post it, hire verified teammates directly, and build a review-based reputation across every job they take.

## What this API handles

- **Auth** — registration with email OTP verification, login, JWT-based sessions
- **Profile** — view, edit, and delete your own account
- **Projects** — post a project with a payment offer, browse open projects, close a project once you've hired someone, view your own posted projects and the ones you've been hired for
- **Reviews** — leave a review for someone once a project is closed (hirer → hired, or hired → hirer), view reviews you've written and reviews about you
- **Public profiles** — view any verified member's profile and their review history

## Tech stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication, bcrypt for password hashing
- Nodemailer (Gmail) for OTP verification emails

## Getting started

```bash
git clone <this-repo-url>
cd backend
npm install
```

Create a `.env` file in the root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password


Run it:

```bash
npm run dev
```

## API overview

| Method | Route | Description | Auth required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in | No |
| POST | `/api/auth/verify-email` | Verify email with OTP | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/profile` | Update profile | Yes |
| DELETE | `/api/profile` | Delete account | Yes |
| POST | `/api/projects` | Post a new project | Yes |
| GET | `/api/projects` | List all open projects | Yes |
| GET | `/api/projects/mine` | List projects you've posted | Yes |
| GET | `/api/projects/worked-on` | List projects you were hired for | Yes |
| GET | `/api/projects/:id` | Get one project's details | Yes |
| PUT | `/api/projects/:id/close` | Close a project and record who was hired | Yes |
| POST | `/api/reviews` | Leave a review (only on closed projects) | Yes |
| GET | `/api/reviews/written-by-me` | Reviews you've written | Yes |
| GET | `/api/reviews/about-me` | Reviews written about you | Yes |
| GET | `/api/users/:id` | View a public profile + their reviews | Yes |

## Notes

- Contact between hirer and candidate happens outside the platform (email) — this API only stores who was hired, not messages.
- A review can only be submitted once its project is marked `closed`.
