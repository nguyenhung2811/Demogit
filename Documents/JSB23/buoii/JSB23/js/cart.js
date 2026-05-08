import {
   getFirestore,
   setDoc,
   doc,
   getDoc,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getCurrentUser } from "./auth.js";
import { app } from "./firebase.js";

export async function addToCart(productId) {
  const user = getCurrentUser();

  // 1. Kiem tra dang nhap
  if (!user) {
    alert("Vui long dang nhap de tiep tuc");
    window.location.href = "login.html";
  }

  const uid = user.uid;
  const cartRef = doc(db, "carts", uid);

        
    try {
// lay gio hang hien tai cua user thong qua dia chi gio hang (cartRef)
const docSnap = await getDoc(cartRef);

// 2. neu chua co gio hang -> tao moiws luon
if (!docSnap.exists()) {
    // tao gio hang moi voi san pham dau tien 
    const newCart = {
        item: [
            {
                productId: productId,
                quantity: 1,
            },
        ],
    };
    await setDoc(cartRef, newCart);
    alert("da tao gio hang va them san pham!");
    return;
}

// 3. neu da co gio hang 
let items = docSnap.data().items || [];

//4. ktra san pham da co chua 
const index = items.findIndex((item) => item.productId === productId);

if (index !== -1) {
    // => da co -> tangw so luong
    item[index].quantity += -1;
} else {
    // => chua co -> them moi
    items.push({
        productId: productId,
        quantity: 1,
    });
}

// 5. cap nhat lai firestore
await setDoc(cartRef, { items });
alert("da cap nhat gio hang");

    } catch (error) {
        console.error("loi them gio hang:", error);
        alert("co loi xay ra!");
    }
}

