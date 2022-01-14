const URL_API = "https://61bc10c2d8542f001782453f.mockapi.io";
const PRODUCT_TABLE = "bills";
const URL_APIfilms = "https://61bc10c1d8542f0017824531.mockapi.io";

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function callAPIfilms(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_APIfilms}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function quanlybills() {
    var storage = [];
    callAPI(`bills`, "GET", null).then((response) => {
        storage = response.data;
        var row = "";
        for (var i = 0; i < storage.length; i++) {
            row += `
                <tr>
                    <td>${storage[i].id}</td>
                    <td>${storage[i].id_user}</td>
                    <td>${storage[i].cinema}</td>
                    <td>${storage[i].date}</td>
                    <td>${storage[i].id_film}</td>
                    <td>${storage[i].seat}</td>
                    <td><button type="button" class=".toggle-btn" onclick="xemchitiet(${storage[i].id_film})">Xem Chi Tiết</button></td>
                    <td>${storage[i].total}</td>
                    <td ><button onclick="deleteProduct(${storage[i].id})">xóa</button></td>
                </tr>
            `;
        }
        document.querySelector(".bill").innerHTML = row;
    });
}

quanlybills();

// --------------------------------------
function xemchitiet(id_film) {
    var row = "";
    callAPIfilms(`films/${id_film}`, "GET", null).then((response) => {
        row += `
        <tr>
            <td>${response.data.id}</td>
            <td> <img src="${response.data.img}" alt="" style="width: 80px; height: 80px"></td>
            <td>${response.data.name}</td>
            <td>${response.data.category}</td>
            <td>${response.data.time}</td>

        </tr>
    `;
        document.querySelector(".chitietphim").innerHTML = row;
    });

    document.getElementById("xemchitietmathang").style.display = "block";
}

// -----------------------------------------Quản lý đặt hàng-----------

// function quanlyxemchitiet() {
//     var storage = [];
//     callAPI(`bills`, "GET", null).then((response) => {
//         storage = response.data;
//         var row = "";
//         for (var i = 0; i < storage.length; i++) {
//             row +=
//                 `
//                 <tr>
//                     <td>${storage[i].id}</td>
//                     <td>${storage[i].img}</td>
//                     <td>${storage[i].name}</td>
//                     <td>${storage[i].category}</td>
//                     <td>${storage[i].total}</td>
//                     <td>${storage[i].quantity}</td>
//                     <td>${storage[i].total*quantity}</td>
//                     <td>Xóa</td>
//                 </tr>
//             `;
//         }
//         document.querySelector(".chitietphim").innerHTML = row;
//     })
// }
// quanlyxemchitiet()

function deleteProduct(id) {
    axios.get(`${URL_API}/${PRODUCT_TABLE}/${id}`);
    axios.delete(`${URL_API}/${PRODUCT_TABLE}/${id}`).then(() => {
        location.reload();
    });
}