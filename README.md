# 📚 Bookstore REST API

A Node.js Express application that allows users to register/login and manage a bookstore with file-based persistence using JSON files. Authentication is handled via JWT tokens.

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/bookstore-api.git
cd book-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root directory

```env
PORT=5000
JWT_SECRET="nodejs-task"
```

### 4. Run the server

```bash
npm start
```

> Server runs on http://localhost:5000 by default.

---

## 🧪 Testing the Endpoints

You can test the endpoints using Postman or curl.

---

## 🔐 Auth Routes

### ➕ Register

```bash
POST /user/registerUser
```

**Body:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 🔓 Login

```bash
POST /user/loginUser
```

**Body:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

## 📘 Book Routes

> All book routes require Authorization: Bearer `<token>`

---

### ➕ Create Book

```bash
POST /book
```

**Body:**

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "publishedYear": 2024
}
```

---

### 🔁 Update Book

```bash
PUT /book/:id
```

**Body:** (any fields to update)

---

### ❌ Delete Book

```bash
DELETE /book/:id
```

---

### 📙 Get All Books

```bash
GET /book
```

---

### 🔍 Get Book by ID

```bash
GET /book/:id
```

---

### 🔎 Search Books by Genre

```bash
GET /book/search/genre?genre=Fiction
```

---

### 📄 Paginated Books

```bash
GET /book/paginated/books?page=1&limit=5
```

---

## 📁 Folder Structure

```
.
├── controllers/
│   ├── bookController.js
│   └── userControllers.js
├── middleware/
│   ├── authMiddleware.js
│   └── logger.js
├── models/
│   ├── books.json
│   └── users.json
├── routes/
│   ├── bookRoutes.js
│   └── userRoutes.js
├── utils/
│   └── fileService.js
├── .env
├── server.js
└── README.md
```

---

## 📌 Features

- ✅ JWT-based user authentication  
- ✅ File-based data persistence (no DB)  
- ✅ CRUD operations for books  
- ✅ Genre search and pagination  

---