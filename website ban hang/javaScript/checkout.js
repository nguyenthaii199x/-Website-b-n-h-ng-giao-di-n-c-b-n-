var cartData = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-items");

cartData.foreach((sp) => {
  const item = document.createElement("div");
  item.innerHTML = `
  <p><strong>${sp.ten}</strong> - ${
    sp.sl
  } - ${sp.gia.toLocaleString()} VNĐ</p>`;
  cartContainer.appendChild(div);
});
