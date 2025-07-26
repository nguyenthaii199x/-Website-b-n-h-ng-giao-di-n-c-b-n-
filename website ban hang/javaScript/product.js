function themgiohang(button) {
  var card = button.closest(".card");
  var ten = card.querySelector(".card-title").innerText;
  var gia = parseFloat(
    card.querySelector(".card-text").innerText.replace(/[^\d]/g, "")
  );
  var anh = card.querySelector("img").src;
  var id = Date.now(); // hoặc dùng ID cố định nếu sản phẩm có ID

  var giohang = JSON.parse(localStorage.getItem("giohang")) || [];

  var tonTai = false;
  for (var i = 0; i < giohang.length; i++) {
    if (giohang[i].id === id) {
      giohang[i].sl++;
      tonTai = true;
      break;
    }
  }

  if (!tonTai) {
    giohang.push({
      id: id,
      ten: ten,
      gia: gia,
      anh: anh,
      sl: 1,
    });
  }

  localStorage.setItem("giohang", JSON.stringify(giohang));
  alert("Đã thêm vào giỏ hàng");
}

// Tìm kiếm sản phẩm

function timkiem(sanpham) {
  const input = document.querySelector("#input").value.toLowerCase().trim();
  const dssp = document.querySelectorAll(".product-card");

  dssp.forEach(function (sp) {
    const name = sp.getAttribute("data-name").toLowerCase();
    if (input === "" || name.includes(input)) {
      sp.style.display = "block";
    } else {
      sp.style.display = "none";
    }
  });
}
