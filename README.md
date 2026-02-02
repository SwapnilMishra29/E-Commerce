🛒 Full‑Stack E‑Commerce Application

A modern, full‑stack E‑Commerce web application built using the MERN stack, featuring secure authentication, Stripe payment integration, order management, and a dedicated admin dashboard.

🌐 Live Demo
🧑‍💻 User (Customer) Application

👉 Frontend:
🔗 https://e-commerce-frontend-one-rho.vercel.app

🛠️ Admin Dashboard

👉 Admin Panel:
🔗 https://e-commerce-admin-gilt-nine.vercel.app

💳 Test Payment Details (Stripe)

Use the following dummy card details to test Stripe payments:

Card Number: 4242 4242 4242 4242

Expiry: Any future date (e.g. 12/30)

CVC: Any 3 digits (e.g. 123)

ZIP: Any valid ZIP code

🚀 Features
👤 User Features

User authentication (JWT-based)

Product browsing and filtering

Add to cart with size/quantity support

Cash on Delivery (COD)

Stripe online payment integration

Secure checkout flow

Order history and tracking

Responsive and modern UI

🧑‍💼 Admin Features

Admin authentication

View all orders

Update order status

Product & order management dashboard

Secure admin-only routes

🏗️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router

React Toastify

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Stripe API

Deployment

Frontend: Vercel

Admin Panel: Vercel

Backend: Vercel

Database: MongoDB Atlas

🔐 Authentication & Security

JWT-based authentication for users and admins

Protected routes (frontend & backend)

Secure order verification for Stripe payments

Backend-side payment validation (no frontend trust)

🔄 Payment Flow (Stripe)

User selects Stripe as payment method

Backend creates Stripe Checkout Session

User completes payment on Stripe

Stripe redirects to /verify

Backend verifies payment

Order status updated

Cart cleared securely

📁 Project Structure (Simplified)
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── vercel.json
│
├── admin/
│   ├── src/
│   └── dashboard components
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js

⚙️ Environment Variables
Backend (.env)
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

🧠 Key Learnings

End‑to‑end payment flow implementation

SPA routing with Vercel rewrites

Secure backend verification of payments

Clean separation of user & admin roles

Scalable project architecture

🛠️ Future Enhancements

Razorpay integration (India‑specific payments)

Product reviews & ratings

Wishlist functionality

Admin product CRUD

Email notifications

Invoice generation

👨‍💻 Author

Swapnil Mishra
🎓 B.Tech CSE (Data Science)
💡 Passionate about full‑stack development & system design
