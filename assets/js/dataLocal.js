const dataLocal = (function(){

    const listData = [
        {
            id: 1,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp15.jpg?v=1629775088000',
            name: 'Sổ tay mini hoạt hình dễ thương',
            price: 38000,
            quantity: 9
        },
        {
            id: 2,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp14.jpg?v=1629774972000',
            name: 'Bút Đánh Dấu Hai Đầu Màu Graffiti',
            price: 43000,
            quantity: 5
        },
        {
            id: 3,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp11.jpg?v=1629774393000',
            name: 'Túi đựng đồ dùng văn phòng phẩm',
            price: 7000,
            quantity: 7
        },
        {
            id: 4,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp10.jpg?v=1629774327000',
            name: 'Vở viết kẻ ngang nhiều hình siêu ngộ nghĩnh',
            price: 41000,
            quantity: 22
        },
        {
            id: 5,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp13.jpg?v=1629774804000',
            name: 'Bút xóa giấy',
            price: 53000,
            quantity: 12
        },
        {
            id: 6,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp12.jpg?v=1629774632000',
            name: 'Túi đựng Mỹ Phẩm, Văn Phòng Phẩm ins Keai Studio',
            price: 17000,
            quantity: 22
        },
        {
            id: 7,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp9.jpg?v=1629774157000',
            name: 'Bìa kẹp tài liệu',
            price: 69000,
            quantity: 32
        },
        {
            id: 8,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp8-3.jpg?v=1629774002000',
            name: 'Hộp đựng văn phòng phẩm bằng nhựa trong suốt tiện dụng',
            price: 25000,
            quantity: 42
        },
        {
            id: 9,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp7.jpg?v=1629773880000',
            name: 'Sổ tay cá nhân tiện dụng văn phòng phẩm',
            price: 28000,
            quantity: 30
        },
        {
            id: 10,
            img:'https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp6.jpg?v=1629773702000',
            name: 'Máy Tính Mini Gấu Bỏ Túi Dễ Thương',
            price: 49000,
            quantity: 22
        }
    ];
    
    const keyLocalStorageListSP = "DANHSACHSP";
    const keyLocalStorageItemCart = "DANHSACHItemCart";

    // localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData))

    return {
        getDataProduct() {
            let data = localStorage.getItem(keyLocalStorageListSP)
            if(typeof data === 'object') {
                return data;
            } 
            else {
                data =  JSON.parse(data);
                return data
            }
        },
        getDataCart() {
            let data = localStorage.getItem(keyLocalStorageItemCart)
            if(typeof data === 'object') {
                return data;
            } 
            else {
                data =  JSON.parse(data);
                return data
            }
        },
        setDataCart (value) {
            localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(value))
        },
        setDataProducts (value) {
            localStorage.setItem(keyLocalStorageListSP, JSON.stringify(value))
        },
        deleteDataCart () {
            localStorage.removeItem(keyLocalStorageItemCart)
        }
    }
})()

const provinceAPI = "https://provinces.open-api.vn/api/";

const hanldAPI = (function() {
    
    return {
        async getDataAPI(api) {
            try {
                let reponse = await fetch(api);
                let data = await reponse.json();
                return data
            } catch (error) {
                alert(error)
            }
        }
    }
})()

const hanldApiOrder = (function() {

    return {
        async postOrder (data) {
            try {
                const reponse = await fetch("http://localhost:3000/listOrder", {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(data)
                });
                let order = reponse.json();
                return order;
            } catch (err) {
                alert(err);
            }
        },
        async deleteOrder (id) {
            try {
                const reponse = await fetch("http://localhost:3000/listOrder" + "/" + id, {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer'
                });
                let order = reponse.json();
                return order;
            } catch (err) {
                alert(err);
            }
        }
    }
})()