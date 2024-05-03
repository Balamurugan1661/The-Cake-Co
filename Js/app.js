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
window.onclick = function (event) {
  if (event.target == cartTab) {
    body.classList.toggle("show");
  }
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
function SendEmail(){
  // alert("Step One");
  // let pt;
  // if(document.getElementById('Cash').checked)
  // {
  //   pt=document.getElementById('Cash').value;
  // }
    
  // else if(document.getElementById('Upi').checked)
  // {
  //   pt=document.getElementById('Upi').value;
  // }
  // alert(document.getElementById('CustomerName').value+"/n"+document.getElementById('mail').value+"\n"+document.getElementById('mobileNumber').value+"\n"+document.getElementById('Address').value+"\n")
  // var templateParams={
  //   from_name:document.getElementById('CustomerName').value,
  //   Cust_name:document.getElementById('CustomerName').value,
  //   Cust_email:document.getElementById('mail').value,
  //   Cust_MoblieNumber:document.getElementById('mobileNumber').value,
  //   Cust_Address:document.getElementById('Address').value,
  //   //Cust_Address:document.getElementById('Address').value,
  //   Payment:pt,
  //   total_price:TPrice,
  //   Gst_price:TPrice*0.18,
  //   Gttotal:(TPrice+100+(TPrice*0.18)),
  //   message:messages,

  // };
  
  // const serviceID= "service_gxlkll1";
  // const templateID ="template_iywbvbp";
  // // emailjs
  // // .send(serviceId,templatId,params).then((res)=>{
  // //   //clearForm();
  // //   alert("Your Order Is Sucessfully Placed");
  // //   })
  // // .catch((err)=>alert(err));
  
  // emailjs.send("service_gxlkll1","template_iywbvbp",{
  //   Cust_name: "Ram",
  //   Cust_email: "rprasath683@gmail.com",
  //   Cust_MobileNumber: "08608920760",
  //   Cust_Address: "3, vip nagar road, thavalakuppam, puducherry-07",
  //   message: "Black Forest qty:1",
  //   total_price: "500",
  //   Gst_price: "80",
  //   Gt_total: "680",
  //   }).then((response)=>console.log(response.s));

}

function sendMail(){
  if(  document.getElementById('CustomerName').value !="" 
    && document.getElementById('mail').value !=""
    && document.getElementById('mobileNumber').value!=""
    && document.getElementById('Address').value!=""
    &&(document.getElementById('Cash').checked==true ||document.getElementById('Upi').checked==true) )
  {
    let pt;
  if(document.getElementById('Cash').checked)
  {
    pt=document.getElementById('Cash').value;
  }
    
  else if(document.getElementById('Upi').checked)
  {
    pt=document.getElementById('Upi').value;
  }
  //alert(pt);
  // var params={
  //   Cust_name :document.getElementById('CustomerName').value,
  //   Cust_email :document.getElementById('mail').value,
  //   Cust_MobileNumber:document.getElementById('mobileNumber').value,
  //   Cust_Address:document.getElementById('Address').value,
  //   message:messages.toString(),
  //   total_price:TPrice.toString(),
  //   Gst_price:(TPrice*0.18).toString(),
  //   from_name:document.getElementById('CustomerName').value,
  //   payment: pt.toString()
  // // }
  // alert("Step 2")
  //   emailjs.send("service_gxlkll1","template_iywbvbp",{
  //     Cust_name :document.getElementById('CustomerName').value,
  //     Cust_email :document.getElementById('mail').value,
  //     Cust_MobileNumber:document.getElementById('mobileNumber').value,
  //     Cust_Address:document.getElementById('Address').value,
  //     message:messages.toString(),
  //     total_price:TPrice.toString(),
  //     Gst_price:(TPrice*0.18).toString(),
  //     payment: pt.toString()
  //   });
  //     alert("Step 3");
  alert("Thanks For Ordering Your Order Will Be Processed\nThank You!...");
      clearForm();
      while(carts.length)
      {
        carts.pop();
      }
      
  addToMemory();
  addCartToHtml();
  body.classList.toggle("show1");


  }
  else{
    alert("Please Fill All The Field");
  }
  // alert("Step One");
  
}
initApp();

// emailjs.send("service_gxlkll1","template_iywbvbp",{
//   Cust_name: "Ram",
//   Cust_email: "rprasath683@gmail.com",
//   Cust_MobileNumber: "08608920760",
//   Cust_Address: "3, vip nagar road, thavalakuppam, puducherry-07",
//   message: "Black Forest qty:1",
//   total_price: "500",
//   Gst_price: "80",
//   Gt_total: "680",
//   from_name: "Ram",
//   payment: "Cash",
//   });