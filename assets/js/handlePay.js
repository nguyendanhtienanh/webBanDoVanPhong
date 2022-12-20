
function InfoUser (id, name, time, address, quantity, price) {
    this.id = id,
    this.nameUser = name, 
    this.time = time,
    this.addressUser = address,
    this.totalQuantity = quantity,
    this.totalPrice = price
}

function InfoProductUser (img, nameProduct, price, quantity, total) {
    this.img = img,
    this.nameProduct = nameProduct,
    this.price = price,
    this.quantity = quantity,
    this.total = total
}

function Order(info, product) {
    this.info = info, 
    this.product = product
}

function createRandomId() {
    let random = Math.random()* 10000000000
    function numberRandom () {
        let number = Math.round(random);
        return number;
    }
    return numberRandom();
}

function getToday() {
    const time = new Date();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const today = `${day}/${month}/${year}`
    return today;
}

function getInfoUserOrder() {
    const getNameUser = document.querySelector(".name").value
    let nameUser = `${getNameUser}`

    const address = document.querySelector(".address-detail").value
    const listProvince = document.querySelector(".province");
    const province = listProvince.options[listProvince.selectedIndex].text;
    const listDistrict = document.querySelector(".district");
    const district = listDistrict.options[listDistrict.selectedIndex].text;
    const listWard = document.querySelector(".ward");
    const ward = listWard.options[listWard.selectedIndex].text;

    const dataCart = dataLocal.getDataCart();
    const dataProducts = dataLocal.getDataProduct();
    let totalQuantity = 0;
    let totalPrice = 0;
    dataCart.map((productCart) => {
        dataProducts.map((product) => {
            if(productCart.id === product.id) {
                    totalQuantity += productCart.quantity;
                    totalPrice += (product.price *  productCart.quantity)
            }
        })
    })

    let id = createRandomId();
    let time = getToday();

    let addressUser = `${address}, ${ward}, ${district}, ${province}`

    let info = new InfoUser(id, nameUser, time, addressUser, totalQuantity, totalPrice)
    console.log(info)
    return info;
}

function getInfoProduct() {
    const dataCart = dataLocal.getDataCart();
    const dataProducts = dataLocal.getDataProduct();
    let infoProduct = [];
    dataCart.map((productCart) => {
        dataProducts.map((product) => {
            if(productCart.id === product.id) {
                const img =  product.img
                const nameProduct = product.name
                const price = product.price
                const quantity = productCart.quantity
                const total = product.price * productCart.quantity
                infoProduct.push(
                    new InfoProductUser(img, nameProduct, price, quantity, total)
                )
            }
        })
    })
    console.log(infoProduct)
    return infoProduct;
}

function updateListProduct() {
    const dataCart = dataLocal.getDataCart();
    const dataProducts = dataLocal.getDataProduct();
    dataCart.map((productCart) => {
        dataProducts.map((product) => {
            if(productCart.id === product.id) {
                product.quantity = product.quantity - productCart.quantity;
            }
        })
    })
    console.log(dataProducts)
    dataLocal.setDataProducts(dataProducts)
}

function getInfoOrder() {
    const infoUserOrder = getInfoUserOrder();
    const infoProduct = getInfoProduct();
    let infoOrder = [];
    infoOrder = new Order(infoUserOrder, infoProduct)
    console.log(infoOrder)
    if(confirm("Xác nhận đặt hàng?") === true) {
        hanldApiOrder.postOrder(infoOrder);
        updateListProduct();
        dataLocal.deleteDataCart();
        notification("Đặt hàng thành công");
    }
}

function confirmOrder() {
    if(validate() == true) {
        getInfoOrder();
    } else return;
}