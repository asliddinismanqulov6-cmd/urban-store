 require("dotenv").config();
const { Pool } = require("pg");
const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
pool.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product TEXT,
    price TEXT,
    name TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)
.then(() => console.log("Orders jadvali tayyor"))
  .catch(err => console.error("Database xatosi:", err));

pool.query("CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL, image TEXT, stock INTEGER NOT NULL DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
  .then(() => console.log("Products jadvali tayyor"))
  .catch(err => console.error("Products xatosi:", err));
  
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/order", async (req, res) => {
    try {
        const { product, price, name, phone, address } = 
        req.body;

        if (!product || !name  || !phone || !address) {
            return res.status(400).json({
             error: "Ma'lumotlar to'liq emas" 
            });
        }

        const message = [
            "YANGI BUYURTMA",
            "Mahsulot: " + product,
            "Narxi: " + price + " so'm",
             "Ismi: " + name,
             "Telefon: " + phone,
           "Manzil: " + address
        ].join("\n");

        const response = await fetch(
            "https://api.telegram.org/bot" + process.env.BOT_TOKEN + 
            "/sendMessage",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: process.env.ADMIN_ID,
                  text: message
                   
                })
            }
        );

        const result = await response.json();

if (!result.ok) {
    console.error("Telegram xatosi:", result);
    throw new Error(result.description);
}

        res.json({ success: true });
} catch (error) {
        console.error(error);
        res.status(500).json({ 
          error: "Buyurtma yuborilmadi" 
        });
      }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("URBAN STORE sayt ishga tushdi: " + PORT);
});