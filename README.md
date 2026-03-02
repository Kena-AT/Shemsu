# Shemsu 🛍️

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://shemsu.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20PostgreSQL-blue)](#tech-stack)

Shemsu is a modern, comprehensive, and secure B2B/B2C marketplace platform bridging the gap between verified sellers and eager buyers. With built-in seller verifications, real-time metrics, dynamic product listings, and enterprise-grade security, Shemsu offers a premium eCommerce experience.

🚀 **[Visit the Live Application](https://shemsu.vercel.app)**

---

## ✨ Key Features

### For Buyers 🛍️

* **Intuitive Marketplace**: Browse various categories (Electronics, Fashion, Home & Living) with dynamic search and filtering.
* **Detailed Product Views**: High-quality image galleries, product specifications, dynamic ratings, and reviews.
* **Secure Checkout**: Integrated with the **Chapa API** for seamless Ethiopian mobile money and card transactions.
* **Order Tracking**: A dedicated buyer dashboard to track order statuses, viewing comprehensive transaction histories.

### For Sellers 💼

* **Verified Accounts**: Trust is paramount. All sellers go through an automated verification process before selling.
* **Seller Dashboard**: Manage inventory, track live orders, fulfill shipments, and view real-time sales analytics.
* **Rich Product Listings**: Upload product images (powered by Cloudinary), manage stock, and set pricing effortlessly.

### Administrators 🛡️

* **Admin Dashboard**: Moderate products, approve seller verification requests, manage disputes, and oversee global orders.

---

## 🏗️ Architecture & Tech Stack

Shemsu is built with a decoupled architecture, separating a performant React frontend from a robust Express.js REST API.

### Frontend 🎨

* **Core**: React 18, Vite
* **Routing**: React Router DOM (v6)
* **State Management**: Zustand, React Query (@tanstack/react-query)
* **Styling & UI**: Tailwind CSS, Framer Motion (animations), Lucide React (icons), React Hot Toast
* **Testing**: Playwright (E2E)

### Backend ⚙️

* **Core**: Node.js, Express.js
* **Database**: PostgreSQL hosted on **Neon**
* **ORM**: Drizzle ORM
* **Authentication**: JSON Web Tokens (JWT), Argon2 Hash
* **Email Services**: **Resend SDK** for high-deliverability transactional emails
* **Media**: **Cloudinary API** for performant image hosting
* **Payments**: **Chapa API** integration for secure, localized checkouts
* **Security & Monitoring**: Helmet, Express Rate Limit, **Sentry** (Error tracking)

---

## 🚀 Getting Started Locally

### Prerequisites

* Node.js (v18+)
* npm or yarn
* A local PostgreSQL instance or a free Neon.tech database.

### 1. Clone the repository

```bash
git clone https://github.com/Kena-AT/Shemsu.git
cd Shemsu
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Important: Fill out the values in .env with your local PostgreSQL URL, Resend API keys, Cloudinary credentials, and JWT secrets.

# Push the schema to the database (Drizzle ORM)
npx drizzle-kit push:pg

# Start the development server
npm run dev
```

*The backend API will run on `http://localhost:5000`*

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

*The frontend will be available at `http://localhost:3100`*

---

## ☁️ Deployment

* **Frontend**: Deployed seamlessly on [Vercel](https://vercel.com/) leveraging Vite's optimized build process.
* **Backend**: Deployed on [Render](https://render.com/) as a Node Web Service.
* **Database**: Serverless PostgreSQL via [Neon](https://neon.tech/).
