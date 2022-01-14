const URL_API = "https://61bc10c1d8542f0017824531.mockapi.io";
const PRODUCT_TABLE = "users";

function deleteProduct(id) {
    axios.get(`${URL_API}/${PRODUCT_TABLE}/${id}`);
    axios.delete(`${URL_API}/${PRODUCT_TABLE}/${id}`).then(() => {
        location.reload();
    });
}

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function quanlynguoidung() {
    var storage = [];
    callAPI(`users`, "GET", null).then((response) => {
        storage = response.data;
        var row = "";
        for (var i = 0; i < storage.length; i++) {
            row += `
                <tr>
                    <td>${storage[i].id}</td>
                    <td>${storage[i].name}</td>
                    <td>${storage[i].email}</td>
                    <td>${storage[i].address}</td>
                    <td>${storage[i].account}</td>
                    <td>${storage[i].Id_card}</td>
                    <td>${storage[i].password}</td>
                    <td>${storage[i].date_of_birth}</td>
                    <td>${storage[i].phone_number}</td>
                    <td><button onclick="deleteProduct(${storage[i].id})">Xóa</button></td>
                </tr>
            `;
        }
        document.querySelector(".khachhang").innerHTML = row;
    });
}
quanlynguoidung();
// xóa khách hàng
// function deleteProduct(id) {
//     axios.get(${API_URL}/${id})
//     axios.delete(${API_URL}/${id}).then(() => { location.reload() })
// }