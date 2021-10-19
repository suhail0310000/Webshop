// //GOOOOGLE STARTER HERIFRAAAAA----------------------------
var users = [];
var logged_in = null;
var h_row1 = null;

function web(data){
    console.log("foran for løkke");
    console.log(data);
    for (var i = 0; i < data.length; i++){
        console.log("hjemme");
        console.log(`Rendering element ${data[i]}\n\n`);
        console.log(logged_in);
        console.log(email);
        console.log(logged_in.getEmail());
        // NOTE: This is very brittle - objects with named keys are better
        console.log(data);
        [id, n, email, access] = data[i];
        console.log(id,n,email,access);
        /*  Add information from the google profile if this is
            the logged in user */
        console.log("her");
        console.log(logged_in);
        console.log(email);
        console.log(logged_in.getEmail());
        if (logged_in && email == logged_in.getEmail()){
            console.log("jeg er her");
            n = logged_in.getName();
            console.log(logged_in.getEmail());

            //img = logged_in.getImageUrl();
            // Google has a nice API for resizing images
            // from https://developers.google.com/people/image-sizing
            //img = img.split("=")[0]+"=s300";
        }

}
}


function load_users(){
    console.log("inne load users");
    users = []
    fetch("/users")
        .then(response => response.json())
        .then(data => {
            users = data;

            //console.log(users);
            //console.log(data);
            web(data);
        });

    console.log("Fetch in progress");
}

load_users();


var id_token = null;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

   //have Better storage? local storage funker for flere tab
    id_token = googleUser.getAuthResponse().id_token;
    console.log(`ID Token to pass to server: ${id_token}`)

    logged_in = profile;
    
    //image = profile.getImageUrl().split("=")[0]
} 

function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        logged_in = null;
        //remove_users();
        //load_users();
    });
    id_token = null;
}

function danger_return(data){
    console.log("Authenticated request returned");
    console.log(data);
    web(data);

    //window.location.assign("test.html");
    //location.replace(test);
    //remove_users();
    //render_users(data);

}




function danger(){
    console.log("Danger!");
    if(id_token == null){
        alert("ILLEGAL ACCESS ATTEMPT REGISTERED");
        return;
}




    fetch(`${window.origin}/users`,{
                headers: {
                'Authorization' : id_token
            }}).then(function(response){
                response.json().then(function(json){
                    danger_return(json);
                });
    });
}
//GOOOOOGLE SLUTTER HERR

// dU KAN BRUKE DENNE SOM INSPIRASJON    1
// fetch(`${window.origin}/users`,{
//         headers: {
//             'Authorization' : id_token  
//         }
//         }).then(response => response.json())
//         .then(data => danger_return(data));
//     })
//SLUTTER   1

   




  

   
   


//FUNGERER
// function getAllUsers(){
//     fetch(`${window.origin}/productss`).then(function(response) {
//         response.json().then(function(json) {
//             console.log(json);
//             document.getElementById("output").innerHTML = '<h4>helloworld</h4>';
//         });
//     });
// }


//STARTER HERIFRA
//bRUK DENNNEEEEE
// var myProducts = []
// displayAllProducts(myProducts);
// getAllProducts();




// //Fetch the data from DB- FUNGERERRRRRRRRRRRRRRRRRRRR
// function getAllProducts(){
//     fetch(`${window.origin}/products`).then(function(response) {
//         response.json().then(function(json) {
//             myProducts = json;
//             displayAllProducts(myProducts);
            
//             // console.log(json);
//             // json.forEach(function(val){
//             //     console.log("productID");
//             //     console.log(val.productID);
//             //     console.log((val.productID).length);
                
//             //     console.log(val.productID);
//             //     if (val.productID == 1){
//             //         document.getElementById("output").innerHTML = '<h4>helloworld</h4>';
//             //         //iterer
//             //         //
//             //     }
        
            
//         });
//     });
// }




// function getAllProducts(){
//     fetch(`${window.origin}/products`).then(function(response) {
//         response.json().then(function(json) {
//             myProducts = json;
//             json.forEach(function(val){
//                 console.log("før løkke");
//                 var nyProdukt = document.getElementById("containerProducts");
//                 for(var i = 0; i<val.productID.length; i++){
//                     console.log("inni løkke");
//                     var row = ` <div class="col-md-4 col-sm-12 col-12">
//                     <img src="${data[i].image}" width="150px" height="150px">
//                     <br>
//                     ${data[i].name} - <strong>${data[i].price}</strong>
//                     <br>
//                     <button class="btn btn-danger my-cart-btn add-cart add1" data-id="1" data-name="product 1" data-summary="summary 1" data-price="10" data-quantity="1" data-image="static/card1.jpg">Add to Cart</button>
//                     <a href="#" class="btn btn-info" data-toggle="modal" data-target="#Modal1">Details</a>
//                     </div>`
//                     nyProdukt.innerHTML += row;
//                 }
//             //     console.log(val.productID);
//             //     if (val.productID == 1){
//             //         document.getElementById("output").innerHTML = '<h4>helloworld</h4>';
//             //         //iterer
//             //         //
//             //     }
//             })
            
//         });
//     });
// }

//STOPPER HER




//DENNE FUNGERERRRRRRRRRRRRRRRRRRRRRR
// let html = "";
// function displayAllProducts(data){
//     var nyProdukt = document.getElementById("containerProducts");
//     console.log("før");
//     console.log(data);
//     console.log("data");
//     console.log(data);
//     for(var i = 0; i<data.length; i++){
//         console.log(data.length);
//         console.log("Etter");
//         console.log(data);
//         html = ` <div class="col-md-4 col-sm-12 col-12">
//         <img src="${data[i].image}" width="150px" height="150px">
//         <br>
//         ${data[i].name} - <strong>${data[i].price}</strong>
//         <br>
//         <button class="btn btn-danger my-cart-btn add-cart add1" data-id="1" data-name="product 1" data-summary="summary 1" data-price="10" data-quantity="1" data-image="static/card1.jpg">Add to Cart</button>
//         <a href="#" class="btn btn-info" data-toggle="modal" data-target="#Modal1">Details</a>
//         </div>`
//         nyProdukt.innerHTML += html;
//         //html += nyProdukt.innerHTML;
//     }
// }

// function displayCartButtons(data){
//     var nyKnapp = document.getElementById("containerProducts");
//     console.log("før")
//     console.log(data)
//     for(var i = 0; i<data.length; i++){
//         console.log(data.length);
//         console.log("Etter")
//         console.log(data)
//         html = ` <button class="btn btn-danger my-cart-btn add-cart add1" data-id="1" data-name="product 1" data-summary="summary 1" data-price="10" data-quantity="1" data-image="static/card1.jpg">Add to Cart</button>
//         <a href="#" class="btn btn-info" data-toggle="modal" data-target="#Modal1">Details</a>
//         </div>`
//         nyProdukt.innerHTML += html;
//         //html += nyProdukt.innerHTML;
//     }
// }


// let knapper = document.querySelectorAll('.add-cart');
// console.log(knapper);
// function addToCart(data){
//     for(i=0; i<data.length; i++){

//     }
// }



//Alt fungerer her!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// var myProducts = []
// displayAllProducts(myProducts);
// getAllProducts();

// function getAllProducts(){
//     fetch(`${window.origin}/products`).then(function(response) {
//         response.json().then(function(json) {
//             myProducts = json;
//             displayAllProducts(myProducts);    
//         });
//     });
// }

// let html = "";
// function displayAllProducts(data){
//     var nyProdukt = document.getElementById("containerProducts");
//     console.log("før");
//     console.log(data);
//     console.log("data");
//     console.log(data);
//     for(var i = 0; i<data.length; i++){
//         console.log(data.length);
//         console.log("Etter");
//         console.log(data);
//         html = ` <div class="col-md-4 col-sm-12 col-12">
//         <img src="${data[i].image}" width="150px" height="150px">
//         <br>
//         ${data[i].name} - <strong>${data[i].price}</strong>
//         <br>
//         <button class="btn btn-danger my-cart-btn add-cart add${data[i].productID}" data-id="1" data-name="product 1" data-summary="summary 1" data-price="10" data-quantity="1" data-image="static/card1.jpg">Add to Cart</button>
//         <a href="#" class="btn btn-info" data-toggle="modal" data-target="#Modal1">Details</a>
//         </div>`
//         nyProdukt.innerHTML += html;
//         //html += nyProdukt.innerHTML;
//     }
// }
//ALT FUNGERER OVER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! (du kan bruke hvis du vil)



// function getAllProducts(){
//     fetch(`${window.origin}/products`).then(function(response) {
//         response.json().then(function(json) {
//             myProducts = json;
//             displayAllProducts(myProducts);    
//         });
//     });
// }

//Loads automatically
//pågående ----------------------------------------------------------------------
var myProducts = [];
var localData = localStorage.getItem('myProducts');
console.log("localData");
console.log(localData);
window.addEventListener('DOMContentLoaded', () => {
    console.log("loading here----------");
    if(localData){
        myProducts = JSON.parse(localStorage.getItem('myProducts'));
        console.log("myProducts localData");
        console.log(myProducts);
        iterateProducts();
    }
    else{
        fetch(`${window.origin}/products`).then(function(response) {
            console.log("JSON");
            response.json().then(function(json) {
                myProducts = json;
                iterateProducts();
                localStorage.setItem('myProducts',JSON.stringify(myProducts));
            });
            console.log(myProducts);
        });
    }
    
});

function iterateProducts(){
    myProducts.forEach(element => {
        displayAllProducts(element);
    });  
}


function displayAllProducts(product){
    var nyProdukt = document.getElementById("containerProducts");
    nyProdukt.innerHTML += ` <div class="col-md-4 col-sm-12 col-12">
            <img src="${product.image}" width="150px" height="150px">
            <br>
            ${product.name} - <strong>${product.price}</strong></div
            <br><button class="btn btn-danger my-cart-btn add-cart add" data-id="1" data-name="product 1" data-summary="summary 1" data-price="10" data-quantity="1" data-image="static/card1.jpg">Add to Cart</button>
            <a href="#" class="btn btn-info" data-toggle="modal" data-target="#Modal1">Details</a>
            `;
}

var knapper1 = document.querySelectorAll('.add-cart');
console.log(knapper1);

for(let i = 0; i < knapper1.length; i++){
    console.log("my loop");
    // knapper[i].addEventListener('click', () => {
        
    // })
}

//siste sjansen

//GET ALL PRODUCTS!


// window.addEventListener('DOMContentLoaded', () => {
//     console.log("loading here----------");
//     fetch(`${window.origin}/products`)
//     .then(response => response.json())
//     .then(productsContainer => getAllProducts(productsContainer))
    
// });

// function getAllProducts(productsContainer){
//     productsContainer.forEach(product => getOneProduct(product))
// }

// //PRINT OUT PRODUCTS IN CART
// var nyProdukt = document.getElementById("containerProducts");
// function getOneProduct(product){
//     var addProduct = document.createElement("div");
//     nyProdukt.className = "content";
//     nyProdukt.innerHTML = `
//             <div class="col-md-4 col-sm-12 col-12">
//             <img src="${product.image}" width="150px" height="150px">
//             <br>
//             ${product.name} - <strong>${product.price}</strong>
//             <br>
//             <button onclick="myFunction()">Add to Cart</button>
//             <a href="#" class="btn btn-info" data-toggle="modal" data-target="#Modal1">Details</a>
//             </div>`
    
//     nyProdukt.append(addProduct);
//     // //GET ALL PRODUCTS IN CART
    
//     //alternativ 2
//     //inCartProducts(cartContainer)
// }

// fetch(`${window.origin}/cartProducts`)
//     .then(response => response.json())
//     .then(cartContainer => {
//         console.log(cartContainer);
//         cartArray = cartContainer; //----------------------------------------------------------Bør dette være med?
//         inCartProducts(cartArray)}


    

// function inCartProducts(cartContainer){
//     cartContainer.forEach(product => oneCartItem(product))
// }


// // //PRINT OUT PRODUCTS IN CART
// var useListItems = document.querySelector('.list-of-items')
// function oneCartItem(product){
//     var newInCart = document.createElement("li");
//     newInCart.innerHTML = `
//             <tr class="product">
//                 <td>
//                     <ion-icon name="basket"></ion-icon>
//                     <img src="${product.image}" style="width:40px; height=40px;">
//                     <span>$${product.name} </span>
//                 </td>
//                 <td class="price">${product.price},00 kr</td>
//                 <td class="quantity">skal skrive inn noe her</td>
//                 <td class="total">skal skrive inn noe herkr </td>
//                 <button class="btnDelete"><span>remove</span></button>
//             </tr> `

//     useListItems.append(newInCart);
// }   
// //Insert the product in the cart

// // var btnAddProduct = document.getElementById("addToCart");
// // btnAddProduct.onclick = function()

// function myFunction(){
//     console.log("inne i addeventlistener");
//     var entry = {
//         customerID : 2, //Må finne egen customerID
//         productID : 2
//     };
//     fetch(`${window.origin}/cartProductss/create-order`,{
//         method: "POST",
//         headers: {   
//             "Content-Type": "application/json",
//             // "Accept": "application/json"
//         },
//         body: JSON.stringify(entry)
//     .then(response => response.json())
//     .then(nyttProdukt =>{
//         cartArray.push(nyttProdukt);
//         inCartProducts(cartArray);
//     })
// })




//     // .then(function (response){
//     //     if(response.status !== 200){
//     //         console.log(`Response status was not 200: ${response.status}`);
//     //         return;
//     //     }
//     //     response.json().then(function(data){
//     //         console.log(data)
//     //         inCartProducts(cartArray);
//     //     })
//     // })    
    
// }
    









