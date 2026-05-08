import {
   collection,
   getDocs,
   getFirestore,
   query,
   where,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { app } from "./firebase.js";

// =======================
// Hàm lấy dữ liệu từ Firestore
// =======================
export async function fetchData(collectionName) {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, collectionName));

  let products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}

// =======================
// Hàm render danh sách sản phẩm
// =======================
export async function renderProducts(containerId) {
  let productContainer = document.getElementById(containerId);
  let productHtml = ""; // ✅ khai báo trước khi dùng
  const products = await fetchData("product");

  if (products.length === 0) {
    productHtml = "Không tìm thấy sản phẩm";
    productContainer.innerHTML = productHtml;
    return;
  }

  products.forEach((p) => {
    productHtml += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" />
        <a href="product.html?id=${p.id}"><h3>${p.name}</h3></a>
        <p class="price">${p.price}</p>
        <button onclick="addToCart('${p.id}')">Add to Cart</button>
      </div>
    `;
  });

  productContainer.innerHTML = productHtml;
  // gắn sự kiện cho nút
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    let id = btn.getAttribute("data-id");
    let product = products.find(p => p.id === id);
    addToCart(product);
  });
});
}

// =======================
// Hàm render chi tiết sản phẩm
// =======================
export async function renderProductsDetails(containerId) {
  let productContainer = document.getElementById(containerId);
  let product_id = new URLSearchParams(window.location.search).get("id");
  let productHtml = "<div><p>Không tìm thấy sản phẩm.</p></div>";

  const products = await fetchData("product");
  let product = products.find((p) => p.id == product_id);

  if (product) {
    productHtml = `
      <div class="detail-gallery">
        <img src="${product.image}" alt="Chi tiết sản phẩm" />
      </div>

      <div class="detail-info">
        <span class="product-category">Tea</span>
        <h1>${product.name}</h1>
        <span class="detail-price">${product.price}đ</span>

        <p class="detail-desc">${product.description}</p>

        <div class="actions">
          <div class="quantity-selector">
            <button>-</button>
            <input type="text" value="1" readonly />
            <button>+</button>
          </div>
          <button class="btn btn-primary" style="flex: 1">
            Thêm vào giỏ hàng
          </button>
        </div>

        <button class="btn btn-outline" style="width: 100%">Mua ngay</button>

        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
          <p>🚚 <strong>Miễn phí vận chuyển</strong> cho đơn từ 500k</p>
          <p style="margin-top: 10px">🛡️ <strong>Bảo hành 1 đổi 1</strong> trong 30 ngày</p>
        </div>
      </div>
    `;
  }

  productContainer.innerHTML = productHtml;
}

// =======================
// Hàm tìm kiếm sản phẩm
// =======================
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

async function searchProducts() {
  let searchText = searchInput.value.trim();
  if (searchText !== "") {
    const db = getFirestore(app);
    const q = query(
      collection(db, "product"),
      where("name", ">=", searchText),
      where("name", "<=", searchText + "\uf8ff"),
    );

    const querySnapshot = await getDocs(q);

    let products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    console.log(products);
    renderSearchedProducts(products); // ✅ dùng đúng biến
  }
}

searchBtn.addEventListener("click", searchProducts);
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // kiểm tra nếu sản phẩm đã có trong giỏ
  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng!");
}
