const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const container = document.querySelector(".product_list_container");

// Hvis ingen kategori valgt
if (!category) {
  container.innerHTML = "<h2>No category selected</h2>";
} else {
  fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
    .then((response) => response.json())
    .then((data) => showProducts(data));
}

function showProducts(products) {
  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
      <article class="product_card ${product.soldout ? "soldout" : ""}">
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
