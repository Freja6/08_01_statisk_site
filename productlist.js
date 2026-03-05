let allProducts = [];
fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;

    showProducts(data);
  });
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// 1. Hent alle produkter
let url = "https://kea-alt-del.dk/t7/api/products";

if (category) {
  url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
}

fetch(url)
  .then((response) => response.json())
  .then((data) => showProducts(data));

// 2. Vis produkterne
function showProducts(products) {
  const container = document.querySelector(".product_list_container");
  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
      <article class="product_card ${product.soldout ? "soldout" : ""}">

        ${product.discount > 0 ? `<span class="discount_badge">-${product.discount}%</span>` : ""}

        <a href="productdetails.html?id=${product.id}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp">

          <h3>${product.productdisplayname}</h3>

          <p>${product.brandname}</p>

          <p>DKK ${product.price}</p>

        </a>

      </article>
    `;
  });
}

document.getElementById("allBtn").addEventListener("click", () => {
  showProducts(allProducts);
});

document.getElementById("saleBtn").addEventListener("click", () => {
  const filtered = allProducts.filter((product) => product.discount > 0);

  showProducts(filtered);
});

document.getElementById("stockBtn").addEventListener("click", () => {
  const filtered = allProducts.filter((product) => !product.soldout);

  showProducts(filtered);
});

document.getElementById("sortSelect").addEventListener("change", (event) => {
  let sorted = [...allProducts];

  if (event.target.value === "priceAsc") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (event.target.value === "priceDesc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  showProducts(sorted);
});
