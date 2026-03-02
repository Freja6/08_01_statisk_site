fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => showCategories(data));

function showCategories(categories) {
  const container = document.querySelector(".category_container");

  categories.forEach((category) => {
    container.innerHTML += `
      <article class="category_card">
        <a href="productlist.html?category=${category.category}">
          <h2>${category.category}</h2>
        </a>
      </article>
    `;
  });
}
