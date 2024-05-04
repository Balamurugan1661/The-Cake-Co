let iconCart = document.querySelector(".iconcart");
let closeCart = document.querySelector(".close");
let checkCart = document.querySelector(".checkOut");
let closeCheckCart = document.querySelector(".closeOrder");

let body = document.querySelector("body");
let listProductsHtml = document.querySelector(".listProduct");
let listCartHtml = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".iconcart span");
let tAmt= document.querySelector('.tAmt');
let dAmt= document.querySelector('.dAmt');
let gstAmt= document.querySelector('.gstAmt');
let GtAmt= document.querySelector('.GtAmt');

let LC1Html = document.querySelector(".LC1");

let tp = document.querySelector(".Tp");

let listProducts = [];
let carts = [];

checkCart.addEventListener("click", (event) => {
  if (carts.length > 0) {
    alert(messages)
    body.classList.toggle("show");
    body.classList.toggle("show1");
  } else {
    // alert(carts.length)
    alert("Please Select Atlest One Product To View Check Cart ");
  }
});
closeCheckCart.addEventListener("click", (event) => {
  body.classList.toggle("show1");
});
iconCart.addEventListener("click", () => {
  body.classList.toggle("show");
});

closeCart.addEventListener("click", () => {
  body.classList.toggle("show");
});
const addDataToHtml = () => {
  listProductsHtml.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `<img
            src="${product.image}"
            class="card-img-top"
            alt="Choco truffle"
          />
          <br> <br> <br> 
          
            <h2 class="card-title">${product.name}</h2> <br>
           <div class="price">&#8377;${product.price}</div> <br>
            <button class="addCart">Add To Cart</button>
            `;

      listProductsHtml.appendChild(newProduct);
    });
  }
};

listProductsHtml.addEventListener("click", (event) => {
  let postionClick = event.target;
  if (postionClick.classList.contains("addCart")) {
    let productId = postionClick.parentElement.dataset.id;
    addToCart(productId);
  }
});
const addToCart = (productId) => {
  let productPosition = carts.findIndex(
    (value) => value.productId == productId
  );

  if (carts.length <= 0) {
    carts = [
      {
        productId: productId,
        quantity: 1,
      },
    ];
  } else if (productPosition < 0) {
    carts.push({
      productId: productId,
      quantity: 1,
    });
  } else {
    carts[productPosition].quantity = carts[productPosition].quantity + 1;
  }

  addCartToHtml();
  addToMemory();
};

const addToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHtml = () => {
  messages="";
  listCartHtml.innerHTML = "";
  LC1Html.innerHTML = "";
  let totalQuantity = 0;
  let TPrice = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      let newCart = document.createElement("div");
      totalQuantity += cart.quantity;
      newCart.classList.add("item");
      newCart.dataset.id = cart.productId;
      let postionProduct = listProducts.findIndex(
        (value) => value.id == cart.productId
      );
      let info = listProducts[postionProduct];
      newCart.innerHTML = `
            <div class="image">
              <img src="${info.image}" alt="">
            </div>
              <div class="name">${info.name}</div>
            <div class="totalPrice">&#8377; ${info.price * cart.quantity}</div>
            <div class="quantity">
              <span class="minus"><</span>
              <span>${cart.quantity}</span>
              <span class="plus">></span>
            </div>
          `;
      let newCart1 = document.createElement("div");
      newCart1.classList.add("item1");
      newCart1.innerHTML = `
            <div class="image">
            <img src="${info.image}" alt="">
          </div>
            <div class="name">${info.name}</div>
          <div class="totalPrice">&#8377; ${info.price * cart.quantity}</div>
          <div class="quantity">
            <span class="minus">qty  :</span>
            <span>${cart.quantity}</span>
                     </div>`;
      messages += info.name+"   Qty : "+cart.quantity+"\n";
      TPrice += info.price * cart.quantity;
      listCartHtml.appendChild(newCart);
      LC1Html.appendChild(newCart1);
    });
  }
  tAmt.innerText=TPrice;
  gstAmt.innerText=TPrice*0.18;
  GtAmt.innerText=TPrice+100+(TPrice*0.18);
  iconCartSpan.innerText = totalQuantity;
  tp.innerText = TPrice;
};

listCartHtml.addEventListener("click", (event) => {
  let postionClick = event.target;
  if (
    postionClick.classList.contains("minus") ||
    postionClick.classList.contains("plus")
  ) {
    let product_Id = postionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (postionClick.classList.contains("plus")) {
      type = "plus";
    }

    changeQuantity(product_Id, type);
  }
});

const changeQuantity = (product_Id, type) => {
  let postionInCart = carts.findIndex((value) => value.productId == product_Id);
  if (postionInCart >= 0) {
    switch (type) {
      case "plus":
        carts[postionInCart].quantity += 1;

        break;

      default:
        let valuechange = carts[postionInCart].quantity - 1;
        if (valuechange > 0) {
          carts[postionInCart].quantity = valuechange;
        } else {
          carts.splice(postionInCart, 1);
        }
        break;
    }
  }

  addToMemory();
  addCartToHtml();
};


const initApp = () => {
  fetch("Js/cakes.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      console.log(listProducts);
      addDataToHtml();

      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHtml();
      }
    });
};
function clearForm()
{
  document.getElementById('CustomerName').value="";
  document.getElementById('CustomerName').value="";
  document.getElementById('mail').value="";
  document.getElementById('mobileNumber').value="";
  document.getElementById('Address').value="";
    //Cust_Address:document.getElementById('Address').value,
  document.getElementById('Cash').checked=false;
  document.getElementById('Upi').checked=false;

}
let messages='';

function sendMail(){
  if(  document.getElementById('CustomerName').value !="" 
    && document.getElementById('mail').value !=""
    && document.getElementById('mobileNumber').value!=""
    && document.getElementById('Address').value!=""
    &&(document.getElementById('Cash').checked==true ||document.getElementById('Upi').checked==true) )
  {
    document.getElementById("placeOrder").disabled = true;
    let pt;
  if(document.getElementById('Cash').checked)
  {
    pt=document.getElementById('Cash').value;
  }
    
  else if(document.getElementById('Upi').checked)
  {
    pt=document.getElementById('Upi').value;
  }
  let name = document.getElementById('CustomerName').value;
  let email = document.getElementById('mail').value;
  let mobileNo = document.getElementById('mobileNumber').value;
  let address = document.getElementById('Address').value;
  let paymentType= pt;
  let messageUsed = messages;
  let totalPriceForEmail = document.querySelector('.tAmt').textContent;
  let GstAmountForEmail = document.getElementById('gstAmt').textContent;
  let GrandTotalForEmail= document.getElementById('GtAmt').textContent;

   console.log(name+"\n"+email+"\n"+mobileNo+"\n"+address+"\n"+paymentType+"\n"+messageUsed+"\n"+totalPriceForEmail+"\n"+GstAmountForEmail+"\n"+GrandTotalForEmail);

  var templateParams={
      Cust_name: name,
      Cust_email: email,
      Cust_MobileNumber: mobileNo,
      Cust_Address: address,
      payment: paymentType,
      message: messageUsed,
      total_price: totalPriceForEmail,
      Gst_price:  GstAmountForEmail,
      Gt_total: GrandTotalForEmail,
      };
      emailjs.send('service_gxlkll1', 'template_okp531t', templateParams)
      .then(function(response) {
        clearForm();
         console.log('SUCCESS!', response.status, response.text);
         window.alert("Thanks For Ordering Your Order Will Be Processed\nThank You!...");
         while(carts.length)
         {
           carts.pop();
         }
         
          addToMemory();
          addCartToHtml();
          body.classList.toggle("show1");
   
        //  window.alert("Sent successfully!");
         
      });
  
  // alert("Thanks For Ordering Your Order Will Be Processed\nThank You!...");
  //     clearForm();
  //     while(carts.length)
  //     {
  //       carts.pop();
  //     }
      
  // addToMemory();
  // addCartToHtml();
  // body.classList.toggle("show1");
  document.getElementById("placeOrder").disabled = false;

  }
  else{
    alert("Please Fill All The Field");
  }
  // alert("Step One");
  
}
initApp();

