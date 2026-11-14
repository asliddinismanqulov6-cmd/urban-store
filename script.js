const products = [
    {
        name: "Oversize futbolka",
        price: 140000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        name: "Erkaklar kurtkasi",
        price: 280000,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },
    {
        name: "Sport oyoq kiyimi",
        price: 350000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    }
];

const productList = document.getElementById("product-list");

products.forEach(function(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = product.price.toLocaleString("uz-UZ") + " so'm";

    const button = document.createElement("button");
    button.textContent = "Buyurtma berish";

   button.onclick = async function() {
    const name = prompt("Ismingizni kiriting:");
    if (!name) return;

    const phone = prompt("Telefon raqamingizni kiriting:");
    if (!phone) return;

    const address = prompt("Yetkazib berish manzili:");
    if (!address) return;

    try {
        const response = await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product: product.name,
                price: product.price,
                name,
                phone,
                address
            })
        });

        if (!response.ok) throw new Error();

        alert("Buyurtmangiz yuborildi!");
    } catch {
        alert("Xatolik! Buyurtma yuborilmadi.");
    }
};

    card.append(img, title, price, button);
    productList.appendChild(card);
});

function showMessage() {
    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });
}