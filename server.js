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
  async function boshlangichMahsulotlar() {}
    const bor = await pool.query("SELECT COUNT(*) FROM products");

    if (Number(bor.rows[0].count) === 0) {
        
            for (const m of [
  ["Oversize futbolka", 140000, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", 10],
  ["Erkaklar kurtkasi", 280000, "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", 10],
  ["Sport oyoq kiyimi", 350000, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", 10]
]) {
  await pool.query(
    "INSERT INTO products (name, price, image, stock) VALUES ($1, $2, $3, $4)",
    m
  );
}
}

boshlangichMahsulotlar().catch(console.error);
app.use(express.json());
app.use(express.static(__dirname));
app.get("/api/products", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM products ORDER BY id DESC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Mahsulotlarni olishda xato" });
    }
});
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