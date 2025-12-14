# 🍽️ Restaurant Dish Search Backend

This is a simple backend service built using **Node.js, Express, Prisma, and MySQL**.

The application allows users to search for restaurants by **dish name**, apply a **mandatory price range filter**, and returns the **top 10 restaurants where that dish has been ordered the most**.

<!-- This project is created as part of a **Backend Developer Take-Home Assignment**. -->

---

## 🚀 Features

- Search restaurants by dish name
- Mandatory minimum and maximum price filter
- Returns top 10 restaurants based on order count
- Clean Prisma + MySQL data model
- Seeded database with realistic sample data

---

## 🧱 Tech Stack

- Node.js
- Express.js
- MySQL
- Prisma ORM
- dotenv

---

## 📊 Database Schema

### Restaurant
- id
- name
- city

### MenuItem
- id
- dishName
- price
- restaurantId

### Order
- id
- menuItemId

### Relationships
- One Restaurant → Many MenuItems
- One MenuItem → Many Orders

---

## 🔧 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ranjan095/restaurant_convertcart

cd restaurant_convertcart

```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables
**Create a .env file in the root directory:**

```bash
DATABASE_URL="mysql://username:password@localhost:3306/restaurant_search"
PORT=8080
```
⚠️ Make sure the database restaurant_search already exists in MySQL.

### 4. Initialize Prisma & Run Migrations

```bash
npx prisma migrate dev --name init
```

### This command will:

- Create database tables

- Apply schema changes

- Generate Prisma Client

### 5. Seed the Database with Sample Data

```bash
npx prisma db seed
```
### The seed script will:

- Create 15 restaurants

- Add Chicken Biryani with prices between 100–500

- Insert random order counts for each restaurant

## 6. Start the Server

```bash
npm run start
```
Server will run on:
```bash
http://localhost:8080
```
---

## 🔍 API Documentation
### Endpoint

```bash
GET /search/dishes
```

## Query Parameters (Mandatory)
| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| name      | string | Dish name to search |
| minPrice  | number | Minimum dish price  |
| maxPrice  | number | Maximum dish price  |

### Example Request
```bash
/search/dishes?name=biryani&minPrice=200&maxPrice=500
```

### Example Response

```bash
{
  "restaurants": [
    {
      "restaurantId": 5,
      "restaurantName": "Biryani House 5",
      "city": "Hyderabad",
      "dishName": "Chicken Biryani",
      "dishPrice": 220,
      "orderCount": 96
    }
  ]
}
```
