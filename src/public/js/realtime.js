const socket = io();

socket.on("updateProducts", (products) => {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.title} - $${p.price}`;
    list.appendChild(li);
  });
});