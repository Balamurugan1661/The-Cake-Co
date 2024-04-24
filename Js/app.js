let iconCart =document.querySelector('.iconcart');
let closeCart = document.querySelector('.close');

let body = document.querySelector('body');
let listProductsHtml = document.querySelector('.listProduct');
let listCartHtml= document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.iconcart span');

let listProducts=[];
let carts =[];

window.addEventListener('click',(event)=>{
    if(event.target==cartTab)
    {
        body.classList.toggle('show');
    }
})

iconCart.addEventListener('click',()=>{
    body.classList.toggle('show')
})

closeCart.addEventListener('click',()=>{
    body.classList.toggle('show')
})
const addDataToHtml =()=>{
    listProductsHtml.innerHTML='';
    if(listProducts.length>0){
        listProducts.forEach(product =>{

            let newProduct = document.createElement('div')
            newProduct.classList.add('item');
            newProduct.dataset.id=product.id;
            newProduct.innerHTML=`<img
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
        })
    }
}

listProductsHtml.addEventListener('click',(event)=>{

    let postionClick = event.target;
    if(postionClick.classList.contains('addCart'))
    {
        let productId = postionClick.parentElement.dataset.id;
        addToCart(productId)
    }
})
const addToCart=(productId)=>{
    

    let productPosition = carts.findIndex((value)=> value.productId==productId);

    if(carts.length<=0){
        carts =[{
            productId:productId,
            quantity:1

        }]
    }
    else if(productPosition<0){
        carts.push({
            productId:productId,
            quantity:1
        })
    }
    else{
        carts[productPosition].quantity= carts[productPosition].quantity+1;
    }
    
    addCartToHtml();
    addToMemory();
    

}

const addToMemory = () =>{
    localStorage.setItem('cart',JSON.stringify(carts));
}

const addCartToHtml=()=>{

    listCartHtml.innerHTML='';
    let totalQuantity =0;
    if(carts.length>0)
    {
        carts.forEach(cart=>{

            let newCart = document.createElement('div');
            totalQuantity += cart.quantity ;
            newCart.classList.add('item');
            newCart.dataset.id=cart.productId;
            let postionProduct = listProducts.findIndex((value)=> value.id==cart.productId);
            let info = listProducts[postionProduct];
            newCart.innerHTML=`
            <div class="image">
              <img src="${info.image}" alt="">
            </div>
              <div class="name">${info.name}</div>
            <div class="totalPrice">&#8377; ${info.price*cart.quantity}</div>
            <div class="quantity">
              <span class="minus"><</span>
              <span>${cart.quantity}</span>
              <span class="plus">></span>
            </div>
          `;

          listCartHtml.appendChild(newCart);


        })
    }
    iconCartSpan.innerText=totalQuantity;
}

listCartHtml.addEventListener('click',(event)=>{

    let postionClick = event.target;
    if(postionClick.classList.contains('minus')||postionClick.classList.contains('plus'))
    {
        let product_Id = postionClick.parentElement.parentElement.dataset.id;
        let type ='minus';
        if(postionClick.classList.contains('plus'))
        {
            type='plus';
        }

        changeQuantity(product_Id,type);

    }
})

const changeQuantity =(product_Id,type) =>{

    let postionInCart = carts.findIndex((value)=>value.productId==product_Id);
    if(postionInCart>=0)
    {
        switch (type) {
            case 'plus':
                carts[postionInCart].quantity+=1;
                
                break;
        
            default:


                let valuechange=carts[postionInCart].quantity-1;
                if(valuechange>0)
                {
                    carts[postionInCart].quantity=valuechange;
                }
                else{
                    carts.splice(postionInCart,1);
                
                }
                break;
        }
    }

    addToMemory();
    addCartToHtml();
    

}
window.onclick = function(event)
{
    if(event.target==cartTab)
    {
        body.classList.toggle('show')
    }
}

const initApp=()=>{
    fetch('Js/cakes.json')
    .then(response=>response.json())
    .then(data =>{
        listProducts=data;
        console.log(listProducts);
        addDataToHtml();

        if(localStorage.getItem('cart'))
        {
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHtml();
        }
    })
}
initApp();

