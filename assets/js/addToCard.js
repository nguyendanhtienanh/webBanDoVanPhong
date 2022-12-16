function CartObject(idCart, quantityCart) {
    this.id = idCart,
        this.quantity = quantityCart
}

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
            notification("Đã thêm sản phẩm vào giỏ");
        }
        else {
            dataCart.map((product) => {
                if (product.id === id && product.quantity < max) {
                    const quantityProduct = product.quantity += 1;
                    notification("Đã thêm sản phẩm vào giỏ");
                    return (quantityProduct)
                }
                if (product.id === id && product.quantity == max) {
                    warningNotification("Sản phẩm đã hết hàng")
                }
            })
        }
    }
    else {
        warningNotification("Sản phẩm đã hết hàng")
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