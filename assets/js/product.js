function CartObject(idCart, quantityCart) {
    this.id = idCart,
        this.quantity = quantityCart
}

function getListProducts() {
    const data = dataLocal.getDataProduct();
    let listProducts = "";
    data.map((product) => {
        listProducts += `
            <div class="col product-item" id="${product.id}">
                <div class="product-img">
                    <img src="${product.img}" alt="img-product">
                </div>
                <div class="product-info">
                    <p>${product.name}</p>
                    <div class="product-subinfo">
                        <span class="price-product">${product.price} đ</span>
                        <span class="quantity-product">Số lượng: ${product.quantity}</span>
                    </div>
                </div>
                <button class="btn-add-to-cart-product" onClick="addToCart(${product.id}, 1, ${product.quantity})">
                    <i class="ti-shopping-cart"></i>
                    <span>Thêm vào giỏ</span>
                </button>
            </div>
        `
    });
    document.querySelector(".row").innerHTML = listProducts;
}

getListProducts()

function addProduct(id, quantity, max) {
    let dataCart = dataLocal.getDataCart();

    let quantityTotal
    const dataProducts = dataLocal.getDataProduct();
    dataProducts.find((product) => {
        if (product.id === id) {
            quantityTotal = product.quantity;
        }
    })

    const checkId = dataCart.find((product) => product.id === id)

    if (quantityTotal != 0) {
        if (!checkId) {
            dataCart.push(new CartObject(id, quantity));
            alert("Đã thêm sản phẩm vào giỏ hàng!");
        }
        else {
            dataCart.map((product) => {
                if (product.id === id && product.quantity < max) {
                    const quantityProduct = product.quantity += 1;
                    alert("Đã thêm sản phẩm vào giỏ hàng!");
                    return (quantityProduct)
                }
                if (product.id === id && product.quantity == max) {
                    alert("Sản phẩm đã hết hàng!")
                }
            })
        }
    }
    else {
        alert("Sản phẩm đã hết hàng!")
    }

    dataLocal.setDataCart(dataCart);
    quantityProductCart();
}

function addToCart(id, quantity, max) {
    const dataCart = dataLocal.getDataCart();
    if(dataCart == null) {
        dataLocal.setDataCart([]);
        addProduct(id, quantity, max);
    }
    else {
        addProduct(id, quantity, max);
    }
}

function quantityProductCart() {
    const dataCart = dataLocal.getDataCart();
    let quantityProductCart = 0;
    dataCart.forEach((product) => {
        quantityProductCart += product.quantity;
        return quantityProductCart;
    })

    document.querySelector(".quantityProductCart").innerText = quantityProductCart
}
