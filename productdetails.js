const params = new URLSearchParams(window.location.search);
const category = params.get("category");

let url = "https://kea-alt-del.dk/t7/api/products";

if (category) {
  url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
}

fetch(url)
  .then((response) => response.json())
  .then((data) => showProducts(data));
// 2. Vis produktet
function showProduct(product) {
  document.querySelector(".product_name").textContent =
    product.productdisplayname;

  document.querySelector(".product_brand").textContent =
    "Brand: " + product.brandname;

  document.querySelector(".product_category").textContent =
    "Category: " + product.category;

  const priceContainer = document.querySelector(".product_price");

  if (product.discount > 0) {
    const newPrice = Math.round(
      product.price - (product.price * product.discount) / 100,
    );

    priceContainer.innerHTML = `
      <span class="old_price">DKK ${product.price}</span><br>
      <span class="discount_price">DKK ${newPrice}</span>
    `;
  } else {
    priceContainer.textContent = `DKK ${product.price}`;
  }

  if (product.soldout) {
    document.querySelector(".product_status").textContent = "Sold Out";
  } else {
    document.querySelector(".product_status").textContent = "In stock";
  }

  document.querySelector(".product_image").src =
    `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  document.querySelector(".product_image").alt = product.productdisplayname;
}
