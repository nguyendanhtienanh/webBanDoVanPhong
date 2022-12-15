function quantityProductCart() {
    const dataCart = dataLocal.getDataCart();
    let quantityProductCart = 0;
    if(dataCart == null) {
        document.querySelector(".quantityProductCart").innerText = "0"
    } else {
        dataCart.forEach((product) => {
            quantityProductCart += product.quantity;
            document.querySelector(".quantityProductCart").innerText = quantityProductCart
        })
    }
}

const quantityOrder = async () => {
    const dataListOrder = await hanldApiOrder.getOrderDataAPI();
    let quantityOrder = dataListOrder.length
    if(dataListOrder.length == 0) {
        document.querySelector(".quantityOrder").innerText = "0"
    } else document.querySelector(".quantityOrder").innerText = quantityOrder;
}