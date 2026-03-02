// 1. Hent kategorier fra API
fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => showCategories(data));

// 2. Vis kategorierne
function showCategories(categories) {
  const container = document.querySelector(".category_container");

  container.innerHTML = "";

  categories.forEach((category) => {
    container.innerHTML += `
      <article class="category_card">
        <a href="productlist.html?category=${category.category}">
          <h3>${category.category}</h3>
        </a>
      </article>
    `;
  });
}
