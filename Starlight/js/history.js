// ---------------------------------------------------------------LỊCH SỬ NGƯỜI DÙNG----
const URL_API_Bills = "https://61bc10c2d8542f001782453f.mockapi.io";
const URL_API = "https://61bc10c1d8542f0017824531.mockapi.io";

const URL_API_films = "https://61bc10c1d8542f0017824531.mockapi.io";

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_API_Bills}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
//
function callAPI_Users(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
//
function callAPI_films(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_API_films}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function historyUser() {
    var product = JSON.parse(localStorage.getItem("user"));
    var store = [];
    callAPI(`bills`, "GET", null).then((response) => {
        store = response.data;
        console.log(store.length);
        let row = "";
        for (var i = 0; i < store.length; i++) {
            if (product == store[i].id_user) {
                row += `
                <tr>             
                    <td><button type="button" class="toggle-btn" onclick="xemchitiet(${store[i].id_film})">Xem Chi Tiết</button></td>
                    <td>${store[i].cinema}</td>
                    <td>${store[i].seat}</td>
                    <td>${store[i].date}</td>
                    <td>${store[i].total}</td>
                </tr>
                `;
            }
        }
        document.querySelector("#khachhang").innerHTML += row;
    });
}
// ------------------------------------

function show() {
    var product = localStorage.getItem("user");
    callAPI_Users(`users/${product}`, "GET", null).then((response) => {
        console.log(response.data.name);
        document.querySelector("title").innerHTML =
            "Lịch sử " + response.data.name + " | Starlight";
        document.querySelector("#name").innerHTML =
            "Khách hàng " + response.data.name + "   ";
    });
}
show();
historyUser();
// -----------------------------------------
// --------------------------------------
function xemchitiet(id) {
    var row = "";
    callAPI_films(`films/${id}`, "GET", null).then((response) => {
        row += `
        <tr>
            <td> <img src="${response.data.img}" alt=""></td>
            <td>${response.data.name}</td>
            <td>${response.data.category}</td>
            <td>${response.data.actor}</td>
            <td>${response.data.director}</td>

            <td>${response.data.time}</td>

        </tr>
    `;
        document.querySelector(".chitietphim").innerHTML = row;
    });

    document.getElementById("xemchitietphim").style.display = "block";
}