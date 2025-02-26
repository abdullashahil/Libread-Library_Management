
# LIBREAD

  

A simple library management system with CRUD operations and JWT-based user authentication.

  

## Deployed Link

### 🔗 [Website](https://libread-library-management.vercel.app/)

### 🔗 [API link (JWT secured)](http://localhost:3000/)


## Tech Stack

-  **Frontend**: Next.js (TypeScript), Tailwind CSS
-  **Backend**: Node.js, Express
-  **Database**: PostgreSQL hosted on Aiven
-  **Authentication**: JSON Web Tokens (JWT)

  

## Authentication

- Users can **Sign Up** and **Log In**.
- On success, a **JWT** is returned and stored in the browser.
- Protected routes require the token in the **Authorization** header (`Bearer <token>`).

  

## CRUD api Features

-  **Dashboard**: View pending or issued books by date.
-  **Books**: Add, view, search, update, and delete.
-  **Members**: Add, view, search, update, and delete.
-  **Issuances**: Track books issued to members, with status and due dates.

  

## All endpoints

  

### Authentication

  

| Endpoint | Method | Description |
| ------------- | ----- | ------------------------------------- |
| `/users/signup` | **POST** | Create a new user (returns JWT) |
| `/users/login` | **POST** | Log in existing user (returns JWT) |

---
  

### Books

| Endpoint | Method | Description |
| ------------- | --------- | --------------------- |
| `/books` | **GET** | Get all books |
| `/books` | **POST** | Add a new book |
| `/books/:id` | **PUT** | Update a book |
| `/books/:id` | **DELETE**| Delete a book |

---

  

### Members

| Endpoint | Method | Description |
| --------------- | --------- | ------------------------- |
| `/members` | **GET** | Get all members |
| `/members` | **POST** | Add a new member |
| `/members/:id` | **PUT** | Update a member |
| `/members/:id` | **DELETE**| Delete a member |

  

---

  

### Issuances

  

| Endpoint | Method | Description |
| --------------- | --------- | ------------------------------------------ |
| `/issuances` | **GET** | Get all issuances (filter by status) |
| `/issuances` | **POST** | Issue a book to a member |
| `/issuances/:id` | **PUT** | Update issuance status (e.g., returned) |

> **Note**: Most routes require a JWT token in the `Authorization` header: > ``` > Authorization: Bearer <token> > ```

  

## Server Setup

### Steps to Run the Server

| **Navigate to Server Directory** | `cd Server` |

| **Install Dependencies** | `npm install` |

| **Create .env File** | Add database credentials & JWT secret (See below) |

| **Start Server** | `npm run dev` (Runs on `http://localhost:3000`) |

  

### `.env` File Example

```ini
PG_HOST=YOUR_AIVEN_HOST
PG_USER=YOUR_AIVEN_USER
PG_PASSWORD=YOUR_AIVEN_PASSWORD
PG_DATABASE=YOUR_AIVEN_DATABASE
PG_PORT=YOUR_AIVEN_PORT
JWT_SECRET=some_super_secret_key
```

*(Optional: If Aiven requires SSL)*

```ini
PG_SSL_CERT="-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----"
```