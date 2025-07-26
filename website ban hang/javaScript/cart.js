document.addEventListener("DOMContentLoaded", function () {
  var giohang = JSON.parse(localStorage.getItem("giohang")) || [];

  var html = "";

  for (var i = 0; i < giohang.length; i++) {
    var sp = giohang[i];
    html += `
    <div class="card mb-3" id="sp-${sp.id}">
      <div class="row g-0 align-items-center">
        <div class="col-md-2 d-flex flex-column">
          <img src="${
            sp.anh
          }" class="img-fluid rounded-start w-100 object-fit-cover" alt="sp">
        </div>
        <div class="col-md-4">
          <div class="card-body">
            <h5 class="card-title">${sp.ten}</h5>
            <p class="card-text text-muted">Giá: ${sp.gia.toLocaleString()} VND</p>
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center justify-content-around">
          <button class="btn btn-outline-secondary btn-sm" onclick="giamSL(${
            sp.id
          })">−</button>
          <span id="soluong-${sp.id}">${sp.sl}</span>
          <button class="btn btn-outline-secondary btn-sm" onclick="tangSL(${
            sp.id
          })">+</button>

          <p id="tong-${sp.id}"><strong>${(
      sp.sl * sp.gia
    ).toLocaleString()} VND</strong></p>
          
          <button class="btn btn-danger btn-sm" onclick="xoaSP(${sp.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>`;
  }

  var container = document.getElementById("cart-container");
  if (container) {
    container.innerHTML = html;
  }

  window.tangSL = function (id) {
    for (var i = 0; i < giohang.length; i++) {
      if (giohang[i].id === id) {
        giohang[i].sl = giohang[i].sl + 1;
        capNhatGiaoDien(giohang[i]);
        break;
      }
    }
  };

  window.giamSL = function (id) {
    for (var i = 0; i < giohang.length; i++) {
      if (giohang[i].id === id) {
        if (giohang[i].sl > 1) {
          giohang[i].sl = giohang[i].sl - 1;
          capNhatGiaoDien(giohang[i]);
        }
        break;
      }
    }
  };

  window.xoaSP = function (id) {
    var giohangMoi = [];
    for (var i = 0; i < giohang.length; i++) {
      if (giohang[i].id !== id) {
        giohangMoi.push(giohang[i]);
      }
    }
    giohang = giohangMoi;
    localStorage.setItem("giohang", JSON.stringify(giohang));

    var element = document.getElementById("sp-" + id);
    if (element) {
      element.remove();
    }

    capNhatTongCong();
  };

  function capNhatGiaoDien(sp) {
    var slEl = document.getElementById("soluong-" + sp.id);
    if (slEl) {
      slEl.textContent = sp.sl;
    }

    var tongEl = document.getElementById("tong-" + sp.id);
    if (tongEl) {
      tongEl.innerHTML =
        "<strong>" + (sp.sl * sp.gia).toLocaleString() + " VND</strong>";
    }

    localStorage.setItem("giohang", JSON.stringify(giohang));
    capNhatTongCong();
  }

  function capNhatTongCong() {
    var tong = 0;
    for (var i = 0; i < giohang.length; i++) {
      tong += giohang[i].sl * giohang[i].gia;
    }

    var tongText = document.querySelector(".text-danger");
    if (tongText) {
      tongText.textContent = tong.toLocaleString() + " VND";
    }
  }

  capNhatTongCong();
});
function thanhtoan() {
  localStorage.setItem("cart", JSON.stringify(giohang));
  window.location.href = "checkout.html";
  thanhtoan();
}
