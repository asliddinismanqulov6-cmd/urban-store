const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/order", async (req, res) => {
    try {
        const { product, price, name, phone, address } = req.body;

        if (!product || !name  || !phone || !address) {
            return res.status(400).json({ error: "Ma'lumotlar to'liq emas" });
        }

        const message =
            " YANGI BUYURTMA\n\n" +
           " Mahsulot: ${product}\n" +
           "Narxi: ${price} so'm\n" +
            "Ismi: ${name}\n" +
            "Telefon: ${phone}\n" +
           " Manzil: ${address}";

        const response = await fetch(
            "https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage",
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
        res.status(500).json({ error: "Buyurtma yuborilmadi" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("URBAN STORE sayt ishga tushdi: " + PORT);
});