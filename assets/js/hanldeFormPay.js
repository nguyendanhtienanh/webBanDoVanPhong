function showFormPay() {
    document.querySelector(".modal").classList.add("open")
}

function hanldBtnExitBuy() {
    const name = document.querySelector(".name");
    const mail = document.querySelector(".mail");
    const phone = document.querySelector(".phone");
    const address = document.querySelector(".address-detail");
    let province = document.querySelector(".province");
    let district = document.querySelector(".district");
    let ward = document.querySelector(".ward");
    const note = document.querySelector(".note");
    
    name.value = "";
    mail.value = "";
    phone.value = "";
    address.value = "";
    province.value = "";
    district.value = "";
    ward.value = "";

    document.querySelector(".warning-name").classList.remove("open");
    document.querySelector(".warning-mail").classList.remove("open");
    document.querySelector(".warning-phone").classList.remove("open");
    document.querySelector(".warning-address").classList.remove("open");
    document.querySelector(".warning-province").classList.remove("open");
    document.querySelector(".warning-district").classList.remove("open");
    document.querySelector(".warning-ward").classList.remove("open");
    document.querySelector(".note").classList.remove("open");

    document.querySelector(".modal").classList.remove("open")
}

function renderDataAddress(data, id, name) {
    let addOption = `<option value=''>Chọn ${name}</option>`;
    if(data == []) {
        return addOption
    }
    else {
        data.map((item) => {
            addOption += `
                <option value="${item.code}">${item.name}</option>
            `
        })
    }
    document.querySelector("." + id).innerHTML = addOption;
}

const getDataProvince = async () => {
    let data = await hanldAPI.getDataAPI(provinceAPI);
    const none = [];
    renderDataAddress(data, "province", "Tỉnh")
    renderDataAddress(none, "district", "Huyện")    
    renderDataAddress(none,"ward", "Xã")
}

const getDistrictsByProvinceID = async () => {
    const codeProvince = document.querySelector(".province").value
    let dataWard = [];
    if(codeProvince == "") {
        renderDataAddress(dataWard, "district", "Huyện")    
        renderDataAddress(dataWard, "ward", "Xã")
    }
    else {
        const APIDistricts = provinceAPI + "p/" + codeProvince + "?depth=2";
        let data = await hanldAPI.getDataAPI(APIDistricts);
        let dataDistricts = [];
        dataDistricts = data.districts; 
        renderDataAddress(dataDistricts, "district", "Huyện");
        renderDataAddress(dataWard, "ward", "Xã")
    }
}

const getWardsByDistrictsID = async () => {
    const codeDistrict = document.querySelector(".district").value;
    const datanull = [];
    if(codeDistrict == "") {   
        renderDataAddress(datanull, "ward", "Xã")
    }
    else {
        const APIWard = provinceAPI + "d/" + codeDistrict + "?depth=2";
        let data = await hanldAPI.getDataAPI(APIWard);
        let dataWard = [];
        dataWard = data.wards;
        renderDataAddress(dataWard, "ward", "Xã")
    }
}
