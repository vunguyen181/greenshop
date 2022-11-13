var scrollEventHandler = function()
{
  window.scroll(0, window.pageYOffset)
}

window.addEventListener("scroll", scrollEventHandler, false);
/*--- HAMBURGER MENU ---*/ 
var hamburgerBtn = document.querySelector('.hamburger-btn-frame');
var hamburgerCloseBtn = document.querySelector('.hamburger-close-btn');
var hamburgerBackground = document.querySelector('.hamburger-background');
var bodyScrollbar = document.querySelector('body');
var toastWarning = document.querySelector('.toasts');
var hamburgerLoginBtn = document.querySelector('.hamburger-login-btn');
var loginBackground = document.querySelector('.login-background');

/* login/register btns */
hamburgerLoginBtn.addEventListener('click',function(){
    hamburgerBackground.style.display = 'none';
    loginBackground.setAttribute('style','display:flex;');
})

/* close effects */
hamburgerCloseBtn.addEventListener('click',function(){
    hamburgerBackground.style.display = 'none'
})
hamburgerBtn.addEventListener('click',function(){
    hamburgerBackground.style.display = 'block';
})
hamburgerBackground.addEventListener('click', function(e){
    if(e.target === e.currentTarget){
        hamburgerBackground.style.display = 'none';
    }
});
/*--- END OF HAMBURGER MENU ---*/ 

/*--- LOGIN ---*/
//--- password show/hide ---:
var passwordShowHide = document.querySelectorAll('.showHidePassword');
var passwordFields = document.querySelectorAll('#password');

passwordShowHide.forEach(function(eyeIcon){    
    eyeIcon.addEventListener('click', function(){
        passwordFields.forEach(function(passwordField){
            if(passwordField.type === 'password'){
                passwordField.type = 'text';

                passwordShowHide.forEach(function(icon){
                    icon.classList.replace('fa-eye-slash','fa-eye');
                })
            }else{
                passwordField.type = 'password';

                passwordShowHide.forEach(function(icon){
                    icon.classList.replace('fa-eye','fa-eye-slash');
                })
            }
        })
    })
})
//--- show & hide effect ---:
var loginBtn = document.querySelector('.navbar-login-btn');
var loginBackground = document.querySelector('.login-background');
var closeLoginBtn = document.querySelector('.login-close-btn');
var closeSignupBtn = document.querySelector('.signup-close-btn');
var signUpLink = document.querySelector('.signup-text');
var logInLink = document.querySelector('.login-text');
var registerCard = document.querySelector('.form-signup');
var loginCard = document.querySelector('.form-login');

loginBtn.addEventListener('mousedown', function(){
    if(loginBackground.style.display === 'none'){
        loginBackground.setAttribute('style','display:flex;');
    }   
});
closeLoginBtn.addEventListener('click',function(){
    loginBackground.setAttribute('style','display:none');
});
closeSignupBtn.addEventListener('click',function(){
    loginBackground.setAttribute('style','display:none');
});
loginBackground.addEventListener('click', function(e){
    if(e.target === e.currentTarget){
        loginBackground.setAttribute('style','display:none');
    }
});
signUpLink.addEventListener('click',function(){
    if(registerCard.style.display === 'none'){
        loginCard.setAttribute('style','display:none');
        registerCard.style.display = 'block'
    }
})
logInLink.addEventListener('click',function(){
    if(loginCard.style.display === 'none'){
        registerCard.setAttribute('style','display:none');
        loginCard.style.display = 'block'
    }
})
//--- validator ---:
//--- login ---:
var loginInput = document.querySelector('.login-input-field');
var passwordInput = document.querySelector('.password-input-field');
var loginErrorText = document.querySelector('.login-error-text');
var passwordErrorText = document.querySelector('.password-error-text');
var submitBtn = document.querySelector

loginInput.addEventListener('blur', function(e){
    if(e.target.value === ''){
        loginErrorText.parentElement.classList.add('invalid1');
        loginErrorText.innerText = '*required';
    } 
})
passwordInput.addEventListener('blur', function(e){
    if(e.target.value === ''){
        passwordErrorText.parentElement.classList.add('invalid2');
        passwordErrorText.innerText = '*required';
    } 
})
loginInput.addEventListener('input', function(e){
    if(e.target.value){
        loginErrorText.parentElement.classList.remove('invalid1');
        loginErrorText.innerText = '';
    } 
})
passwordInput.addEventListener('input', function(e){
    if(e.target.value){
        passwordErrorText.parentElement.classList.remove('invalid2');
        passwordErrorText.innerText = '';
    } 
})

//--- signup ---:
//--- rules ---:
Validator.isRequired = function(selector,errMessage){
    return {
        selector: selector,
        test: function(value){
            return value ? undefined : errMessage;
        }
    }
}
Validator.isEmail = function(selector,errMessage){
    return {
        selector: selector,
        test: function(value){
            var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return emailRegex.test(value) ? undefined : errMessage;
        }
    }
}
Validator.minLength = function(selector,min){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : `*It must be more than ${min} characters`;
        }
    }
}
Validator.isPasswordConfirmation = function(selector,passwordValue,errMessage){
    return {
        selector: selector,
        test: function(value){
            return value === passwordValue() ? undefined : errMessage;
        }
    }
}
//--- process ---:
function Validator(options){
    var formElement = document.querySelector(options.form2);
    function getElement(element,selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules = {};

    function validate(inputElement,rule){
        var rules = selectorRules[rule.selector];
        var errorMessage;
        var errorElement = getElement(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
        
        for(var i = 0; i <rules.length; ++i){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }
        if(errorMessage){
            errorElement.innerText = errorMessage;
            getElement(inputElement,options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getElement(inputElement,options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }

    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);

                if(!isValid){
                    isFormValid = false;
                }
            });

            if(isFormValid){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function(values, input){
                        values[input.name] = input.value;
                        return values;
                    },{});
                    options.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
            }
        }
        options.rules.forEach(function(rule){
            //save all rules to selectorRules object:
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            
            // onblur & oninput:
            var inputElement = formElement.querySelector(rule.selector);            
            var errorElement = getElement(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
            
            if(inputElement){
                inputElement.onblur =function(){
                    validate(inputElement, rule);
                }

                inputElement.oninput = function(){
                    errorElement.innerText = '';
                    getElement(inputElement,options.formGroupSelector).classList.remove('invalid');
                }
            }            
        })
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                
                if(!isValid){
                    isFormValid = false;
                }
            });
            if(isFormValid){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function(values, input){
                        switch(input.type){
                            case 'radio':
                            case 'checkbox':
                                if (input.checked) {
                                    values[input.name] = input.value;
                                }
                                else {
                                    values[input.name] = input.value && values[input.name];
                                }
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    },{});
                    options.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
            } 
        }
    }
}
/* END OF LOGIN */

/* GALLERY */
$(document).ready(function(){
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: true,
        prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
    });
  });
/* END OF GALLERY */

/* HERO DROPDOWN */

/* HERO DROPDOWN */

/* SHOPPING CART */
/* shopping cart background */
var cartBackground = document.querySelector('.shopping-cart-background');
var cartInnercard = document.querySelector('.shopping-cart-innercard');
var cartCloseBtn = document.querySelector('#cart-close-btn');
var shoppingCartBtn = document.querySelector('#shopping-cart-btn');
var continueBtn = document.querySelector('.continue-btn');
continueBtn.addEventListener('click',function(){
    cartBackground.style.display = 'none';
    bodyScrollbar.classList.remove('active');
})
cartCloseBtn.addEventListener('click',function(){
    cartBackground.style.display = 'none';
    bodyScrollbar.classList.remove('active');
})
shoppingCartBtn.addEventListener('click',function(){
    cartBackground.style.display = 'block';
    bodyScrollbar.classList.add('active');
})
cartBackground.addEventListener('click', function(e){
    if(e.target === e.currentTarget){
        cartBackground.style.display = 'none';
        bodyScrollbar.classList.remove('active');
    }
});

/* shopping cart product's addition */
function getElement(element,selector){
    while(element.parentElement){
        if(element.parentElement.matches(selector)){
            return element.parentElement;
        }
        element = element.parentElement;
    }
}


var addProductBtns = document.querySelectorAll('.add-product-btn');
addProductBtns.forEach(function(addProductButton){
    addProductButton.addEventListener('click',function(event){
        cartBackground.style.display = 'block';
        var itemBtn = event.target 
        var productPrice = itemBtn.parentElement.innerText.replace('€','');
        var itemProduct = getElement(itemBtn,'.product');
        var productImg = itemProduct.querySelector('img').src;
        var productName = itemProduct.querySelector('h1').innerText;
        var productHeight = itemProduct.querySelector('h4').innerText;
        addCart(productPrice,productImg,productName,productHeight);
        
        
        if(cartBackground.style.display == 'block'){
            bodyScrollbar.classList.add('active');
        } 

        lastTotalCost();

        /* thử cartnumber */
        function itemCartNumber(){
            var itemProductArray = []
            var cartItemNumber = document.querySelector('.navbar-cart-item');
            var productInformations = document.querySelectorAll('.cart-quantity');
            var itemQuantity = document.querySelector('.item-quantity');
            for (var i = 0; i < productInformations.length; i++){
                itemProductArray.push(parseFloat(productInformations[i].innerHTML))
            }
            
            var totalItems = itemProductArray.reduce(function(accumulator,item){
                return accumulator + item;
            },0)
            cartItemNumber.innerText = totalItems;
            itemQuantity.innerText = totalItems;
        }
        itemCartNumber()
        /* end thử cartnumber */
    })
    function addCart(productPrice,productImg,productName,productHeight){
        /* product checking in cart  */
        var productTitle = document.querySelectorAll('.product-name');
        for(var i = 0; i < productTitle.length; i++){
            if(productTitle[i].innerText === productName){
                toastWarning.classList.add('active');
                cartBackground.setAttribute('style','display:none');
                var okayBtn = document.querySelector('.ok-btn');

                okayBtn.addEventListener('click',function(){
                    bodyScrollbar.classList.add('active');
                    toastWarning.classList.remove('active');
                    cartBackground.setAttribute('style','display:block');
                })
                return;
            }
        }
        /* product adding to the cart */
        var allProducts = document.querySelector('.all-products');
        var productInformation = document.createElement('div');
                                 productInformation.classList.add('product-information');
        allProducts.append(productInformation);
        productInformation.innerHTML = `<div class="product-item">
                                            <input type="hidden" id="product__id" value="1">
                                            <div class="pic-and-text">
                                                <img src="${productImg}" alt="">
                                                <div class="cart-product-text">
                                                    <div class="cart-product-text-top">
                                                        <div class="cart-product-status">
                                                            <div class="green-circle"></div>
                                                            <p>available</p>
                                                        </div>
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </div>
                                                    <p class="product-name">${productName} </p>
                                                    <div class="product-size-colour">
                                                        <div class="product-size">
                                                            <i class="fa-solid fa-text-height"></i>
                                                            ${productHeight}                               
                                                        </div>
                                                        <div class="product-colour">
                                                            <i class="fa-solid fa-droplet"></i>
                                                            green
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="cart-total-price">
                                                <div class="single-price">
                                                    <h1>Single price </h1>
                                                    <h2 class="cart-single-product-price">${productPrice} €</h2> 
                                                </div>
                                                <div class="product-quantity">
                                                    <i class="fa-solid fa-circle-minus"></i>
                                                    <p class="cart-quantity">1</p>
                                                    <i class="fa-solid fa-circle-plus"></i>
                                                </div>
                                                <div class="product-total-price">
                                                    <h1>Total</h1>
                                                    <div class="single-product-totalprice-card">
                                                    <h2 class="cart-single-total-price">${productPrice}</h2> &nbsp <h2>€</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
        
        
        /* shopping cart product remove */
        if(productInformation){
            var cartRemoveBtns = productInformation.querySelectorAll('.fa-trash-can');
            cartRemoveBtns.forEach(function(cartRemoveBtn){
                cartRemoveBtn.addEventListener('click',function(){
                    getElement(cartRemoveBtn,'.product-information').remove();;
                    
                    lastTotalCost();

                    /* thử cartnumber */
                    var productInfor = document.querySelector('.product-information');
                    if(productInfor){
                        var itemQuantity = document.querySelector('.item-quantity');
                        var cartItemNumber = document.querySelector('.navbar-cart-item');
                        var cartItemNNumber = parseFloat(cartItemNumber.innerHTML);
                        var afterRemoveArray = [];
                        console.log(afterRemoveArray);
                        console.log(cartItemNNumber)
                        var productArray = document.querySelectorAll('.product-information');
                        productArray.forEach(function(singleProduct){
                            var priceCard = singleProduct.querySelector('.cart-total-price');
                            var quantityCard = priceCard.querySelector('.product-quantity');
                            var quantityNumber = quantityCard.querySelector('.cart-quantity');
                            var quantityNNumber =  parseFloat(quantityNumber.innerHTML)
                            afterRemoveArray.push(quantityNNumber);
                            var afterRemoveTotalItems = afterRemoveArray.reduce(function(acc,item){
                                return acc + item;
                            },0)
                            itemQuantity.innerText = afterRemoveTotalItems;
                            cartItemNumber.innerText = afterRemoveTotalItems;
                        })
                    } 
                    if(!productInfor){
                        var itemQuantity = document.querySelector('.item-quantity');
                        var cartItemNumber = document.querySelector('.navbar-cart-item');
                        itemQuantity.innerText = 0;
                        cartItemNumber.innerText = 0;
                    }
                    /* end thử cartnumber */
                });
            })
        }
         
        quantityChange();
    }
}) 

function quantityChange () {
    var productArray = document.querySelectorAll('.product-information');
    productArray.forEach(function(singleProduct){
        var priceCard = singleProduct.querySelector('.cart-total-price');
        var quantityCard = priceCard.querySelector('.product-quantity');
        var plusBtn = quantityCard.querySelector('.fa-circle-plus');
        var minusBtn = quantityCard.querySelector('.fa-circle-minus')
        var quantityNumber = quantityCard.querySelector('.cart-quantity');
        var singlePriceCard = singleProduct.querySelector('.single-price');
        var singlePriceProduct = singlePriceCard.querySelector('.cart-single-product-price').innerText;
        var productTotalPrice = priceCard.querySelector('.product-total-price');
        var cartSingleTotalPrice = productTotalPrice.querySelector('.cart-single-total-price');

        /* items quantity */
        if(parseInt(quantityNumber.innerText) < 2){
            minusBtn.classList.add('blur');
        } else {
            minusBtn.classList.remove('blur');
        }
        plusBtn.onclick = function(){
            /* thử cartnumber */
            var cartItemNumber = document.querySelector('.navbar-cart-item');
            var cartItemNNumber = parseFloat(cartItemNumber.innerHTML);
            var itemQuantity = document.querySelector('.item-quantity');
            cartItemNNumber += 1;
            cartItemNumber.innerText = cartItemNNumber;
            itemQuantity.innerText = cartItemNNumber;
            /* end thử cartnumber */

            quantityNumber.innerText = parseInt(quantityNumber.innerText) + 1;
            if(parseInt(quantityNumber.innerText) > 1){
                minusBtn.classList.remove('blur');
            } 
            totalProductPrice();
            lastTotalCost();
        }
        
        minusBtn.onclick = function(){
            /* thử cartnumber */
            var cartItemNumber = document.querySelector('.navbar-cart-item');
            var cartItemNNumber = parseFloat(cartItemNumber.innerHTML);
            var quantityNumber = quantityCard.querySelector('.cart-quantity');
            var itemQuantity = document.querySelector('.item-quantity');
            if(parseFloat(quantityNumber.innerHTML) > 1){
                cartItemNNumber -= 1;
                cartItemNumber.innerText = cartItemNNumber;
                itemQuantity.innerText = cartItemNNumber;
            }
            /* end thử cartnumber */

            if(parseInt(quantityNumber.innerText) > 1){
                quantityNumber.innerText = parseInt(quantityNumber.innerText) - 1;
            }
            if(parseInt(quantityNumber.innerText) < 2){
                minusBtn.classList.add('blur');
            } 
            totalProductPrice();
            lastTotalCost();
        }

        function totalProductPrice(){
            var productSinglePrice = parseFloat(singlePriceProduct.replace(',','.')) * parseInt(quantityNumber.innerText);
            cartSingleTotalPrice.innerText =  productSinglePrice.toFixed(2).replace('.',',');
            lastTotalCost();
        }
    })
}


function lastTotalCost(){
    var cartTotalCost = document.querySelector('.cart-total-cost');

    var pricesArray = [];
    var allPrices = document.querySelectorAll('.cart-single-total-price');
    allPrices.forEach(function(loopSinglePrice){
        pricesArray.push(loopSinglePrice.innerText.replace(',','.'))
    })
    var myPrice = pricesArray.reduce(function(accumulator,currentIndex){
        return accumulator + parseFloat(currentIndex);
    },0)
    cartTotalCost.innerText = myPrice.toFixed(2).replace('.',',') + ' €';
}
/* END OF SHOPPING CART */

/* CATEGORIES */
var heroProducts = document.querySelector('.hero-products');
var allPoductsSelector = heroProducts.querySelectorAll('.product');
var productObject = {};
var productsArray = [];

allPoductsSelector.forEach(function(singleProductSelector){
    var plantsType = singleProductSelector.querySelector('h2').innerText;
    var plantsPrice = parseFloat(singleProductSelector.querySelector('h3').innerText.replace('€','').replace(',','.'));
    var plantsSize = parseFloat(singleProductSelector.querySelector('h4').innerText.replace('cm','').replace('+/-',''));

    var newAllProducts = Object.assign({},productObject, {name:plantsType}, {price: plantsPrice}, {size:plantsSize});
    productsArray.push(newAllProducts);
})

//--- small size
var smallSize = productsArray.filter(function(product){
    if(product.size < 36){
        return product.name;
    }
})
var productSmallSize = document.querySelector('.hero-size-small');
productSmallSize.innerText = `(${smallSize.length})`;

var smallSizeBtn = document.querySelector('.small-size')
smallSizeBtn.onclick = function(){
    var row = getElement(smallSizeBtn,'.row');
    var categorySingleProducts = row.querySelector('.col-9').querySelectorAll('.product');

    categorySingleProducts.forEach(function(categorySingleProduct){
        var categorySingleProductSize = categorySingleProduct.querySelector('h4')
        if(parseFloat(categorySingleProductSize.innerText.replace('cm','').replace('+/-','')) > 36){
            getElement(categorySingleProductSize,'.product').classList.add('active');
        } else {
            getElement(categorySingleProductSize,'.product').classList.remove('active');
        }
    })
} 

//--- medium size
var mediumSize = productsArray.filter(function(product){
    if(product.size < 69 && product.size > 36){
        return product.name;
    }
})

var mediumSizeBtn = document.querySelector('.medium-size');

mediumSizeBtn.onclick = function(){
    var row = getElement(mediumSizeBtn,'.row');
    var categorySingleProducts = row.querySelector('.col-9').querySelectorAll('.product');
    
    categorySingleProducts.forEach(function(categorySingleProduct){
        var categorySingleProductSize = categorySingleProduct.querySelector('h4');
        if((parseFloat(categorySingleProductSize.innerText.replace('cm','').replace('+/-','')) < 36) || (parseFloat(categorySingleProductSize.innerText.replace('cm','').replace('+/-','')) > 69)){
            getElement(categorySingleProductSize,'.product').classList.add('active');
        } else {
            getElement(categorySingleProductSize,'.product').classList.remove('active');
        }
    })
} 

//--- large size
var productMediumSize = document.querySelector('.hero-size-medium');
productMediumSize.innerText = `(${mediumSize.length})`;

var largeSize = productsArray.filter(function(product){
    if(product.size > 69){
        return product.name;
    }
})
var productLargeSize = document.querySelector('.hero-size-large');
productLargeSize.innerText = `(${mediumSize.length})`;

var largeSizeBtn = document.querySelector('.large-size');

largeSizeBtn.onclick = function(){
    var row = getElement(largeSizeBtn,'.row');
    var categorySingleProducts = row.querySelector('.col-9').querySelectorAll('.product');
    
    categorySingleProducts.forEach(function(categorySingleProduct){
        var categorySingleProductSize = categorySingleProduct.querySelector('h4');
        
        if(parseFloat(categorySingleProductSize.innerText.replace('cm','').replace('+/-','')) < 69){
            getElement(categorySingleProductSize,'.product').classList.add('active');
        } else {
            getElement(categorySingleProductSize,'.product').classList.remove('active');
        }
    })
} 

//--- all products
var allSize = productsArray.filter(function(product){
    if(product.size > 0){
        return product.name;
    }
})
var productsAllSize = document.querySelector('.hero-size-all');
productsAllSize.innerText = `(${allSize.length})`;

var allSizeBtn = document.querySelector('.all-size');

allSizeBtn.onclick = function(){
    var row = getElement(largeSizeBtn,'.row');
    var categorySingleProducts = row.querySelector('.col-9').querySelectorAll('.product');
    
    categorySingleProducts.forEach(function(categorySingleProduct){
        var categorySingleProductSize = categorySingleProduct.querySelector('h4');
        
        if(parseFloat(categorySingleProductSize.innerText.replace('cm','').replace('+/-','')) > 0){
            getElement(categorySingleProductSize,'.product').classList.remove('active');
        } 
    })
}

//--- price range
function priceRange(){
    var priceRange = document.querySelector('.price-range');
    var priceRangeValue = priceRange.querySelector('.price-range-number-value');
    var priceRangeValueInput = priceRange.querySelector('.price-range-input');
    
    
    priceRangeValueInput.oninput = function(){
        var rangeValue = priceRangeValueInput.value;
        priceRangeValue.innerText = rangeValue + "€";
        priceRangeValue.style.left = rangeValue + "%";
        
        var row = getElement(priceRangeValueInput,'.row');
        var categorySingleProducts = row.querySelector('.col-9').querySelectorAll('.product');
        categorySingleProducts.forEach(function(categorySingleProduct){
            var categorySingleProductPrice = categorySingleProduct.querySelector('h3');
            

            if(parseFloat(categorySingleProductPrice.innerText.replace(',','.').replace('€','')) > parseFloat(priceRangeValue.innerText)){
                getElement(categorySingleProductPrice,'.product').classList.add('active');
            } else {
                getElement(categorySingleProductPrice,'.product').classList.remove('active');
            }
        })
    }
}

priceRange();

var allProducts = document.querySelector('.hero-products');
var singleProductArray = Array.from(allProducts.children);
var heroNotify = document.querySelector('.hero-notify');
var productPriceArray = [];
var productHeightArray = [];

for(var i of singleProductArray){
    /* price */
    var priceAndKorb = i.lastElementChild;
    var singleProductPrice = parseFloat(priceAndKorb.firstElementChild.innerHTML.replace('€','').replace(',','.'))
    i.setAttribute('data-price',singleProductPrice);
    productPriceArray.push(i);

    /* height */
    var singleProductHeight = parseFloat(i.querySelector('h4').innerText.replace('+/-','').replace('cm',''));
    i.setAttribute('data-height',singleProductHeight);
    productHeightArray.push(i);
}

heroNotify.onchange = sortingValue;
function sortingValue(){
    if(this.value === 'default'){
        while(allProducts.firstChild){
            allProducts.removeChild(allProducts.firstChild);
        }
        allProducts.append(...productPriceArray)
    }
    if(this.value === 'priceup'){
        sortPriceElement(allProducts,singleProductArray,true);
    }
    if(this.value === 'pricedown'){
        sortPriceElement(allProducts,singleProductArray,false);
    }
    if(this.value === 'heightup'){
        sortHeightElement(allProducts,singleProductArray,true);
    }
    if(this.value === 'heightdown'){
        sortHeightElement(allProducts,singleProductArray,false);
    }
}

function sortPriceElement(allProducts,singleProductArray,asc){
    var sortPriceList;
    var dm;
    dm = asc ? 1 : -1;

    sortPriceList = singleProductArray.sort(function(a,b){
        var ax = a.getAttribute('data-price');
        var bx = b.getAttribute('data-price');
        
        return ax > bx ? (1*dm) : (-1*dm);
    })
    while(allProducts.firstChild){
        allProducts.removeChild(allProducts.firstChild);
    }
    allProducts.append(...sortPriceList)
}
function sortHeightElement(allProducts,singleProductArray,asc){
    var sortHeightList;
    var am;
    am = asc ? 1 : -1;

    sortPriceList = singleProductArray.sort(function(a,b){
        var ax = a.getAttribute('data-height');
        var bx = b.getAttribute('data-height');
        
        return ax > bx ? (1*am) : (-1*am);
    })
    while(allProducts.firstChild){
        allProducts.removeChild(allProducts.firstChild);
    }
    allProducts.append(...sortHeightList)
}

/* END OF SORT BY */

/* END OF CATEGORIES */

/* SCROLL */


/* END OF SCROLL */