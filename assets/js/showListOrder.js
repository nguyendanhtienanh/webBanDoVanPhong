
function showDetailOrder(id) {
    const detailBlock = document.querySelector(".detail-order-" + id);
    detailBlock.classList.toggle("open")
}

const renderListOrder = async () => {
    const dataListOrder = await hanldApiOrder.getOrderDataAPI();
    let htmls = `
        <ul class="title-list-order">
            <li class="title-info-code">Mã đơn hàng</li>
            <li class="title-info-nameUser">Tên khách hàng</li>
            <li class="title-info-day">Ngày mua</li>
            <li class="title-quantity-product">Số lượng sản phẩm</li>
            <li class="title-total-product">Thành tiền</li>
            <li class="title-btn-delete">Xóa</li>
        </ul>
    `;
    dataListOrder.map((order) => {
        htmls += `
                    <ul class="content-list-order">
                        <li class="content-info-code">
                            <p>${order.info.id}</p>
                            <div class="title-details">
                                <p onclick="showDetailOrder(${order.id})">Chi tiết <i class="ti-angle-down icon-detail"></i></p>
                                <div class="content-details detail-order-${order.id}">
                                    <ul class="title-content-details">
                                        <li class="title-detail-info-product">Thông tin sản phẩm</li>
                                        <li class="title-detail-price-product">Đơn giá</li>
                                        <li class="title-detail-quantity-product">Số lượng</li>
                                        <li class="title-detail-total-product">Thành tiền</li>
                                    </ul>
            `
        order.product.map((product) => {
            htmls += `
                        <ul class="content-detail-order">
                            <li class="content-detail-info-product">
                                <img src="${product.img}" alt="ảnh sản phẩm">
                                <p>${product.nameProduct}</p>
                            </li>
                            <li class="content-detail-price-product">${product.price}</li>
                            <li class="content-detail-quantity-product">${product.quantity}</li>
                            <li class="content-detail-total-product">${product.price * product.quantity}</li>
                        </ul>
                    `
        })
        htmls += `
                        </div>
                    </div>
                </li>
                <li class="content-info-nameUser">${order.info.nameUser}</li>
                <li class="content-info-day">${order.info.time}</li>
                <li class="content-quantity-product">${order.info.totalQuantity}</li>
                <li class="content-total-product">${order.info.totalPrice}</li>
                <li class="content-btn-delete">
                    <i class="ti-trash" onclick="btnDeleteOrder(${order.id})"></i>
                </li>
            </ul>
        `
    })

    document.querySelector(".list-order").innerHTML = htmls;
}

const btnDeleteOrder = async (id) => {
    const checkDeleteOrder = confirm("Xác nhận xóa đơn hàng?")
    if(checkDeleteOrder == true) {
        const dataListOrder = await hanldApiOrder.getOrderDataAPI();
        const dataProducts = dataLocal.getDataProduct();
        dataListOrder.map((order) => {
            order.product.map((productOrder) => {
                dataProducts.map((product) => {
                    if(productOrder.nameProduct === product.name) {
                        product.quantity += productOrder.quantity
                    }
                })
            })
        })
        dataLocal.setDataProducts(dataProducts);
        hanldApiOrder.deleteOrder(id)
    } else {
        return;
    }
}

const showListOrder = async () => {
    const dataListOrder = await hanldApiOrder.getOrderDataAPI();
    const backgroundBlock = document.querySelector(".list-order")
    const backgroundOrder = `
        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png" alt="img-order">
        <p>Không có đơn hàng nào</p>
        <a href="./product.html">Mua thêm sản phẩm</a>
    `
    if(dataListOrder.length == 0) {
        backgroundBlock.innerHTML = backgroundOrder;
    } else {
        renderListOrder();
    }
}

