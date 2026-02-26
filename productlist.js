// 1. Hent alle produkter
fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => showProducts(data));

// 2. Vis produkterne
function showProducts(products) {
  const container = document.querySelector(".product_list_container");

  products.forEach((product) => {
    container.innerHTML += `
      <article class="product_card ${product.soldout ? "soldout" : ""}">
        
        ${product.discount > 0 ? `<span class="discount_badge">-${product.discount}%</span>` : ""}

        <a href="productdetails.html?id=${product.id}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          
          <h3>${product.productdisplayname}</h3>
          
          <p>${product.brandname} | ${product.category}</p>

          ${
            product.discount > 0
              ? `
                <p>
                  <span class="old_price">DKK ${product.price}</span><br>
                  <span class="discount_price">
                    DKK ${Math.round(product.price - (product.price * product.discount) / 100)}
                  </span>
                </p>
              `
              : `<p class="price">DKK ${product.price}</p>`
          }
        </a>
      </article>
    `;
  });
}
