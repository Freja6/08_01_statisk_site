const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  document.querySelector("main").innerHTML = "<h2>No product selected</h2>";
} else {
  fetchProduct();
}
// 2. Byg API URL
const productURL = `https://kea-alt-del.dk/t7/api/products/${id}`;

// 3. Fetch data
fetch(productURL)
  .then((response) => response.json())
  .then((data) => showProduct(data));

// 4. Vis produktet
function showProduct(product) {
  document.querySelector(".product_name").textContent =
    product.productdisplayname;

  document.querySelector(".product_brand").textContent =
    "Brand: " + product.brandname;

  document.querySelector(".product_category").textContent =
    "Category: " + product.category;

  // Pris
  const priceContainer = document.querySelector(".product_price");

  if (product.discount > 0) {
    const newPrice = product.price - (product.price * product.discount) / 100;

    priceContainer.innerHTML = `
      <span style="text-decoration: line-through;">
        DKK ${product.price}
      </span>
      <br>
      <span style="color:red; font-weight:bold;">
        DKK ${newPrice}
      </span>
    `;
  } else {
    priceContainer.textContent = `DKK ${product.price}`;
  }

  // Lagerstatus
  if (product.soldout) {
    document.querySelector(".product_status").textContent = "Sold Out";
  } else {
    document.querySelector(".product_status").textContent = "In stock";
  }

  // Billede
  document.querySelector(".product_image").src =
    `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  document.querySelector(".product_image").alt = product.productdisplayname;
}
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
