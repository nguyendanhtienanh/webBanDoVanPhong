
function hanldBtnBuy() {
    document.querySelector(".modal").classList.add("open");
    getDataProvince();
}

function hanldBtnExitBuy() {
    document.querySelector(".modal").classList.remove("open")
}

function renderDataProvince(data, id, name) {
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
    renderDataProvince(data, "province", "Tỉnh")
    renderDataProvince(none, "district", "Huyện")    
    renderDataProvince(none,"ward", "Xã")
}

const getDistrictsByProvinceID = async () => {
    const codeProvince = document.querySelector(".province").value
    let dataWard = [];
    if(codeProvince == "") {
        renderDataProvince(dataWard, "district", "Huyện")    
        renderDataProvince(dataWard, "ward", "Xã")
    }
    else {
        const APIDistricts = provinceAPI + "p/" + codeProvince + "?depth=2";
        let data = await hanldAPI.getDataAPI(APIDistricts);
        let dataDistricts = [];
        dataDistricts = data.districts; 
        renderDataProvince(dataDistricts, "district", "Huyện");
        renderDataProvince(dataWard, "ward", "Xã")
    }
}

const getWardsByDistrictsID = async () => {
    const codeDistrict = document.querySelector(".district").value;
    const datanull = [];
    if(codeDistrict == "") {   
        renderDataProvince(datanull, "ward", "Xã")
    }
    else {
        const APIWard = provinceAPI + "d/" + codeDistrict + "?depth=2";
        let data = await hanldAPI.getDataAPI(APIWard);
        let dataWard = [];
        dataWard = data.wards;
        renderDataProvince(dataWard, "ward", "Xã")
    }
}
