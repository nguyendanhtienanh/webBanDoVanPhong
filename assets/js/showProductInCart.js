function getListProductById() {
    const dataProducts = dataLocal.getDataProduct();
    const dataCart = dataLocal.getDataCart();
    const listProducts = [];
    if (dataCart != null) {
        dataCart.map((itemCart) => {
            dataProducts.map((itemProduct) => {
                if (itemCart.id === itemProduct.id) {
                    listProducts.push(
                        {
                            id: itemProduct.id,
                            img: itemProduct.img,
                            name: itemProduct.name,
                            price: itemProduct.price,
                            quantity: itemCart.quantity,
                            total: itemProduct.price * itemCart.quantity,
                            max: itemProduct.quantity
                        }
                    )
                }
            })
        })
    }
    return listProducts
}

function handlTotal() {
    const listProducts = getListProductById();
    let total = [];
    listProducts.map((product) => {
        total.push({
            quantity: product.quantity,
            price: product.total
        })
    })

    const totalPrice = total.reduce((total, product) => {
        return total + product.price
    }, 0)

    let showTotal = `
        <div class="total">
            <div class="info-total">
                <h4>Tổng tiền:</h4>
                <p>${totalPrice} đ</p>
            </div>
            <button class="btn-pay" onclick="hanldBtnBuy()">Thanh toán</button>
        </div>
    `
    return showTotal;
}

function btnDeleteItem(id) {
    const check = confirm("Xóa sản phẩm khỏi giỏ hàng?");
    const dataCart = dataLocal.getDataCart()
    let newData = dataCart.filter(product => product.id !== id)
    const html = `
        <i class="ti-shopping-cart-full icon-content-cart"></i>
        <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
    `
    if (check) {
        if(newData.length === 0) {
            notification("Đã xóa sản phẩm")
            dataLocal.deleteDataCart();
            document.querySelector(".list-products").innerHTML = html
        }
        else {
            dataLocal.setDataCart(newData)
            cart();
        }
    }
    quantityProductCart()
}

function btnUpItem(id, max) {
    const dataCart = dataLocal.getDataCart()
    dataCart.map((product) => {
        if (product.id === id && product.quantity < max) {
            product.quantity += 1;
            dataLocal.setDataCart(dataCart)
        }
        else if (product.id === id && product.quantity >= max) {
            dataLocal.setDataCart(dataCart)
            alert("Sản phẩm đã hết hàng!")
        }

    })
    quantityProductCart()
    showProductToCart()
}

function btnDownItem(id) {
    const dataCart = dataLocal.getDataCart();
    dataCart.map((product) => {
        if (product.id === id && product.quantity > 1) {
            product.quantity -= 1;
            dataLocal.setDataCart(dataCart)
        }
    })
    quantityProductCart()
    showProductToCart();
}

function showProductToCart() {
    const listProducts = getListProductById();

    let showProduct = `
            <ul class="title-list-products">
                <li class="title-info-product">Thông tin sản phẩm</li>
                <li class="title-price-product">Đơn giá</li>
                <li class="title-quantity-product">Số lượng</li>
                <li class="title-total-product">Thành tiền</li>
                <li class="title-btn-delete">Xóa</li>
            </ul>
        `;
    listProducts.map((product) => {
        showProduct += `
                <ul class="item-list-products">
                    <li class="info-product">
                        <img src="${product.img}" alt="ảnh sản phẩm">
                        <p>${product.name}</p>
                    </li>
                    <li class="price-product">${product.price}</li>
                    <li class="quantity-product">
                        <div class="handle-quantity">
                            <button onclick="btnDownItem(${product.id})">-</button>
                            <p>${product.quantity}</p>
                            <button onclick="btnUpItem(${product.id}, ${product.max})">+</button>
                        </div>
                    </li>
                    <li class="total-product">${product.total}</li>
                    <li class="btn-delete" onclick="btnDeleteItem(${product.id})">
                        <i class="ti-trash"></i>
                    </li>
                </ul>
            `
    })
    showProduct = showProduct + handlTotal();
    document.querySelector(".list-products").innerHTML = showProduct;
}

function cart() {
    const dataCart = dataLocal.getDataCart();
    const backgroundCartBlock = document.querySelector(".list-products")
    const backgroundCart = `
        <i class="ti-shopping-cart-full icon-content-cart"></i>
        <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
        <a href="./product.html">Mua thêm sản phẩm</a>
    `
    if(dataCart == null || dataCart.length == 0) {
        backgroundCartBlock.innerHTML = backgroundCart;
    } else {
        showProductToCart();
    }
}