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

function handlTotalProduct() {
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
            <button class="btn-pay" onclick="showFormPay()">Thanh toán</button>
        </div>
    `
    return showTotal;
}

function btnDeleteItem(id) {
    const check = confirm("Xóa sản phẩm khỏi giỏ hàng?");
    const dataCart = dataLocal.getDataCart()
    let newData = dataCart.filter(product => product.id !== id)
    if (check) {
        if(newData.length === 0) {
            dataLocal.deleteDataCart();
            cart();
            notification("Đã xóa sản phẩm")
        }
        else {
            dataLocal.setDataCart(newData)
            cart();
            notification("Đã xóa sản phẩm")
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
            notification("Đã tăng số lượng sản phẩm")
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
            notification("Đã giảm số lượng sản phẩm")
        }
    })
    quantityProductCart()
    showProductToCart();
}

function FormPay() {
    const formPay = `
        <div class="modal">
            <div class="form-buy">
                
                <div class="title-form-buy">
                    <p>Thông tin người mua</p>
                    <i class="ti-close" onclick="hanldBtnExitBuy()"></i>
                </div>

                <div class="content-form-buy">

                    <div class="form-buy-name">
                        <label for="#">Họ và tên</label>
                        <input type="text" class="name" placeholder="Họ và Tên" onclick="changeName()">
                        <p class="warning warning-name">Nhập họ và tên của bạn!</p>
                    </div>

                    <div class="form-buy-email">
                        <label for="#">Email</label>
                        <input type="email" class="mail" placeholder="Email" onclick="changeMail()">
                        <p class="warning warning-mail">Nhập email của bạn!</p>
                    </div>

                    <div class="form-buy-phone">
                        <label for="#">Số điện thoại</label>
                        <input type="tel" class="phone" placeholder="Số điện thoại" onclick="changePhone()">
                        <p class="warning warning-phone">Nhập số điện thoại của bạn!</p>
                    </div>

                    <div class="form-buy-address">
                        <label for="#">Địa chỉ</label>
                        <div class="address-PDW">
                            <div class="address-province">
                                <select class="province" onchange="getDistrictsByProvinceID(), changeProvinceDistrictWard()">
                                    
                                </select>
                                <p class="warning warning-province">Chọn Tỉnh của bạn!</p>
                            </div>
                            <div class="address-district">
                                <select class="district" onchange="getWardsByDistrictsID(), changeProvinceDistrictWard()">
                                    
                                </select>
                                <p class="warning warning-district">Chọn Huyện của bạn!</p>
                            </div>
                            <div class="address-ward">
                                <select class="ward" onchange="changeProvinceDistrictWard()">
                                    
                                </select>
                                <p class="warning warning-ward">Chọn Xã của bạn!</p>
                            </div>
                        </div>
                        <input type="text" class="address-detail" placeholder="Số nhà" onclick="changeAddress()">
                        <p class="warning warning-address">Nhập địa chỉ của bạn!</p>
                    </div>

                    <div class="form-buy-note">
                        <label for="">Lời nhắn</label>
                        <textarea name="" id="" placeholder="Lời nhắn" class="note"></textarea>
                    </div>

                    <div class="btn-form-buy">
                        <button class="btn-form-buy-exit" onclick="hanldBtnExitBuy()">Hủy</button>
                        <button class="btn-form-buy-summit" onclick="confirmOrder()">Xác nhận</button>
                    </div>

                </div>
            </div>
        </div>
    `
    return formPay;
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
    showProduct = showProduct + FormPay() + handlTotalProduct();
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