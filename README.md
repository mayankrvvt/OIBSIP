# 🍕 PieGo

**PieGo** is a modern real-time pizza ordering web application built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. It provides a seamless user experience with live order tracking, secure Stripe payments, user authentication, and a clean responsive UI.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** EJS templates, Laravel Mix (Webpack), Sass, Noty for notifications
- **Authentication:** Passport.js (Local Strategy)
- **Real-Time:** Socket.IO for live order status updates
- **Payment Gateway:** Stripe (demo mode included)
- **Session Store:** MongoDB (via `connect-mongo`)
- **Styling:** Sass, responsive layout

---

## 🚀 Features

- 🍕 Browse and add pizzas to cart
- 💳 Stripe integration for payment (test mode)
- 🔐 User authentication (login/register)
- 📦 Real-time order status updates (Kitchen → On the Way → Delivered)
- 🧾 Order history for logged-in users
- ⚙️ Admin dashboard to manage and update orders
- 🧠 Session-based cart
- 📱 Mobile-responsive design

---

## 📦 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)
- Stripe test account (for test keys)

### Installation

```bash
git clone https://github.com/mynkrvvt/piego.git
cd piego
npm install
