
function checkEmail() {
    const mail = document.querySelector(".mail");
    const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const checkEmail = regexEmail.test(mail.value);
    if(mail.value === "") {
        document.querySelector(".warning-mail").classList.add("open");
        return false;
    }
    else if(!checkEmail) {
        document.querySelector(".warning-mail").classList.add("open");
        document.querySelector(".warning-mail").textContent = "Địa chỉ email không hợp lệ!";
        return false;
    } else document.querySelector(".warning-mail").classList.remove("open");
    return true
}

function checkPhone() {
    const phone = document.querySelector(".phone");
    const regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    const checkPhone = regexPhone.test(phone.value);
    if(phone.value ==="") {
        document.querySelector(".warning-phone").classList.add("open");
        return false;
    }
    else if(!checkPhone) {
        document.querySelector(".warning-phone").classList.add("open");
        document.querySelector(".warning-phone").textContent = "Số điện thoại của bạn không đúng!";
        return false
    } else document.querySelector(".warning-phone").classList.remove("open");
    return true
}

function checkAddress() {
    const address = document.querySelector(".address-detail");
    if(address.value ==="") {
        document.querySelector(".warning-address").classList.add("open");
        return false;   
    } else document.querySelector(".warning-address").classList.remove("open");
    return true
}

function checkProvinceDistrictWard() {
    let province = document.querySelector(".province")
    let district = document.querySelector(".district")
    let ward = document.querySelector(".ward")

    if(province.value === "" && district.value === "" && ward.value === "") {
        document.querySelector(".warning-province").classList.add("open");
        document.querySelector(".warning-district").classList.add("open");
        document.querySelector(".warning-ward").classList.add("open");
        return false;
    }
    
    else if(district.value === "" && ward.value === "") {
        document.querySelector(".warning-district").classList.add("open");
        document.querySelector(".warning-ward").classList.add("open");
        return false;
    }

    else if(ward.value === "") {
        document.querySelector(".warning-ward").classList.add("open");
        return false;
    }
    return true
}

function checkName() {
    const name = document.querySelector(".name");
    const regexName = /^[^\d!@#$%^&*()_+=-`/<>{}|]*$/
    const nameToLower = name.value.toLowerCase();
    const checkName = regexName.test(nameToLower)

    if(name.value === "") {
        document.querySelector(".warning-name").classList.add("open");
        return false
    } 
    if (!checkName) {
        document.querySelector(".warning-name").classList.add("open");
        document.querySelector(".warning-name").textContent = "Họ không hợp lệ!";
        return false
    } else document.querySelector(".warning-name").classList.remove("open");
    return true;
}

function changeName() {
    const warningName = document.querySelector(".warning-name")
    warningName.classList.remove("open");
}

function changeMail() {
    const warningName = document.querySelector(".warning-mail")
    warningName.classList.remove("open");
}

function changePhone() {
    const warningName = document.querySelector(".warning-phone")
    warningName.classList.remove("open");
}

function changeAddress() {
    const warningName = document.querySelector(".warning-address")
    warningName.classList.remove("open");
}

function changeProvinceDistrictWard() {
    let province = document.querySelector(".province").value
    let district = document.querySelector(".district").value
    let ward = document.querySelector(".ward").value

    if(province != [] ) {
        document.querySelector(".warning-province").classList.remove("open");
    } 
    if(district != []) {
        document.querySelector(".warning-district").classList.remove("open");
    }
    if(ward != []) {
        document.querySelector(".warning-ward").classList.remove("open");
    }
}

function validate() {
    checkName();
    checkEmail();
    checkPhone();
    checkProvinceDistrictWard();
    checkAddress();
    if((checkName() && checkEmail() && checkPhone() && checkProvinceDistrictWard() && checkAddress()) == true) {
        return true;
    } else {
        return false;
    }
}
