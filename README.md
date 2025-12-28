# Paper Haven 📚

Paper Haven is a full‑stack online bookstore built with **React + Node.js + Express + MySQL**.  
Users can browse books, add items to a cart, place orders, and send contact messages. An admin dashboard displays recent orders and messages.

## Features
- Browse books (list, search/filter)
- Cart + checkout (creates **orders** and **order_items** in MySQL)
- Contact form (saves messages to MySQL)
- Authentication (signup/login)
- Admin dashboard (recent orders + messages)

## Tech Stack
- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** MySQL (Railway)
- **Deployment:** Railway (frontend + backend), GitHub

---

## Project Structure (high level)
```
/frontend
  /src
    /pages, /components, /styles
/backend
  server.js
  /routes
  db.js
```

---

## Environment Variables

### Backend (`/backend/.env`)
Create a `.env` file inside the backend folder:

```
# Railway provides DATABASE_URL (or MYSQL_URL depending on setup)
DATABASE_URL=your_railway_mysql_url_here

# Optional (if you use it)
PORT=5000
JWT_SECRET=your_secret_here
```

### Frontend (`/frontend/src/config.js`)
Make sure your frontend points to the backend:

```js
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
```

When deployed, set `REACT_APP_API_URL` in Railway to your backend URL.

---

## Database Tables (summary)

**orders_new**
- id (AUTO_INCREMENT PRIMARY KEY)
- customer_name, customer_email, customer_phone, customer_address
- total_price
- created_at

**order_items**
- id (AUTO_INCREMENT PRIMARY KEY)
- order_id (FK → orders_new.id)
- book_id, title, price, qty, image

**messages_new**
- id (AUTO_INCREMENT PRIMARY KEY)
- name, email, message
- created_at

(You may also have `users` and `books` tables depending on your implementation.)

---

## Run Locally

### 1) Clone
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2) Backend
```bash
cd backend
npm install
npm run start
```

### 3) Frontend
```bash
cd ../frontend
npm install
npm start
```

Open: `http://localhost:3000`

---

## Deployment (Railway)
1. Create a Railway project.
2. Add a MySQL database and copy its connection URL.
3. Deploy the backend service and set `DATABASE_URL` in Railway variables.
4. Deploy the frontend service and set `REACT_APP_API_URL` to your backend public URL.
5. Verify:
   - `GET /api/books` returns books
   - `POST /api/orders` creates orders + items
   - `POST /api/contact` stores messages
   - Admin page loads orders/messages

---

## Author : Rozali Kaiss