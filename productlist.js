// 1. Læs category fra URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// 2. Container
const container = document.querySelector(".product_list_container");

// 3. Hent produkter fra API
fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((response) => response.json())
  .then((data) => showProducts(data));

// 4. Vis produkterne
function showProducts(products) {
  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
      <article class="product_card">

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
