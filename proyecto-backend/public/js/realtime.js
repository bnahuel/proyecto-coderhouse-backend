const socket = io();

socket.on("updateProducts", products => {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    list.innerHTML += `
      <li>
        ${p.title} - $${p.price}
        <button onclick="deleteProduct(${p.id})">Eliminar</button>
      </li>`;
  });
});

document.getElementById("productForm").addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    title: e.target.title.value,
    price: e.target.price.value,
  };

  socket.emit("newProduct", data);
  e.target.reset();
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}