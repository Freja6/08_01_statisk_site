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
      <article class="product_card">
        <a href="productdetails.html?id=${product.id}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="">
          <h3>${product.productdisplayname}</h3>
          <p>${product.brandname} | ${product.category}</p>
          <p>DKK ${product.price}</p>
        </a>
      </article>
    `;
  });
}
