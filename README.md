# Food Delivery Web Application

A full-stack food ordering project with separate **customer**, **admin**, and **backend API** applications. The repository demonstrates React interfaces connected to an Express and MongoDB backend.

## Features

**Customer application**
- Browse available food items
- Manage a shopping cart
- Sign in and place orders
- Access order history and order-verification screens

**Admin application**
- Add and list menu items
- Review and manage orders
- Dedicated admin navigation and notifications

**Backend**
- REST routes for food, users, carts, and orders
- MongoDB persistence with Mongoose
- Authentication-related functionality using JWT and password hashing
- Image uploads and Stripe integration in the order flow

## Tech stack

| Part | Technologies |
| --- | --- |
| Customer | React 19, Vite, React Router, Axios |
| Admin | React 19, Vite, React Router, React Toastify |
| API | Node.js, Express 5, MongoDB, Mongoose |
| Other | JWT, Multer, Stripe integration |

## Project structure

```text
food-delivery-app/
  frontend/    Customer-facing React app
  admin/       Admin React app
  backend/     Express API, database models and uploads
```

## Getting started

**Prerequisites:** Node.js, npm, MongoDB, and credentials for any payment integrations you intend to test.

```bash
git clone https://github.com/AjaniyaSri/food-delivery-app.git
cd food-delivery-app
```

Create `backend/.env` locally with your own values, and **never commit real credentials**:

```dotenv
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
STRIPE_SECRET_KEY=your_stripe_test_secret_key
```

Start each application in its **own terminal**.

**API** — defaults to [http://localhost:4000](http://localhost:4000):

```bash
cd backend
npm install
node server.js
```

**Customer frontend** — Vite usually serves on port 5173:

```bash
cd frontend
npm install
npm run dev
```

**Admin dashboard** — Vite will use another available port if 5173 is occupied:

```bash
cd admin
npm install
npm run dev
```

The admin frontend currently points to `http://localhost:4000` in its application code. Verify API URLs, database connectivity, and CORS settings for your environment.

## Backend route groups

| Base route | Responsibility |
| --- | --- |
| `/api/food` | Food catalogue and management |
| `/api/user` | User-related actions |
| `/api/cart` | Shopping cart |
| `/api/order` | Orders and payments |
| `/images` | Uploaded images |

## Project status and security

This is a learning/portfolio project, not a production-ready commerce platform. Use Stripe **test** credentials for development. Before any real deployment, review authentication, error handling, image uploads, payment webhooks, and secrets management. Keep `.env`, dependency folders, and generated files out of version control.

## Author

**Ajaniya Sri** — [GitHub](https://github.com/AjaniyaSri) · [Portfolio](https://sris-portfolio-six.vercel.app)
