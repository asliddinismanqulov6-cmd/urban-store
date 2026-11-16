

const productList = document.getElementById("product-list");
async function muhsulotlarniYuklash() {
    const response = await fetch("/api/products");
    const products = await response.json();

    productList.innerHTML = "";

   
products.forEach(function(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    const stock = dacument.createElement("p");
    stock.textContent = "Qoldi: " + product.stock + " dona";
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

    card.append(img, title, price, stock, button);
    productList.appendChild(card);
});
}
function showMessage() {
    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });
}
mahsulotlarniYuklash().catch(console.error)