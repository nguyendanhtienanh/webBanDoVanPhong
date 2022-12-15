
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