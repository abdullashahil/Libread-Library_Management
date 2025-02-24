# LIBREAD

A simple library management system with CRUD operations and JWT-based user authentication.

## Deployed Link
### 🔗 [Website](https://libread-library-management.vercel.app/)

### 🔗 [API link (JWT secured)](https://libread-server.vercel.app/)


## Tech Stack
- **Frontend**: Next.js (TypeScript), Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)

## Authentication
- Users can **Sign Up** and **Log In**.
- On success, a **JWT** is returned and stored in the browser.
- Protected routes require the token in the **Authorization** header (`Bearer <token>`).

## CRUD api Features
- **Dashboard**: View pending or issued books by date.
- **Books**: Add, view, search, update, and delete.
- **Members**: Add, view, search, update, and delete.
- **Issuances**: Track books issued to members, with status and due dates.
