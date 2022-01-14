var link = "https://61cfb80065c32600170c7fa8.mockapi.io/seat/";
const URL_API = "https://61bc10c1d8542f0017824531.mockapi.io";
const PRODUCT_TABLE = "films";

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
var current = new Date();
var day = current.getDate();
var month = current.getMonth();
var year = current.getFullYear();
current = `${day}/${month + 1}/${year}`;

var cinema = document.querySelector("#cinema_name").value;
show = (index) => {
    axios.get(`${link}${index}`).then((res) => {
        console.log(res.data);
        let row = "";
        for (i = 0; i < 3; i++) {
            row += `<tr>`;
            for (j = 0; j < 3; j++) {
                if (j == 1) {
                    row += `<td id="id${i}${j}"><input type="number"></td>`;
                } else {
                    row += `<td id="id${i}${j}"><button onclick="change_film(${i})">thay đổi</button> <button  onclick="cancal(${i})">xóa</button></td>`;
                }
            }
            row += "</tr>";
        }
        document.querySelector(".slot").innerHTML = row;
        document.querySelector("#id01 input").value = res.data.film1;
        document.querySelector("#id11 input").value = res.data.film2;
        document.querySelector("#id21 input").value = res.data.film3;

        document.querySelector("#id00").innerHTML = "9h00";
        document.querySelector("#id10").innerHTML = "13h40";
        document.querySelector("#id20").innerHTML = "17h20";
    });
};
show(1);
var change = document.querySelector("#cinema_name");
change.addEventListener("change", function() {
    show(document.querySelector("#cinema_name").value);
});

function change_film(a) {
    let film = document.querySelector(`#id${a}1 input`).value;
    if (a == 0) {
        axios
            .put(`${link}${document.querySelector("#cinema_name").value}`, {
                film1: film,
            })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            });
    } else if (a == 1) {
        axios
            .put(`${link}${document.querySelector("#cinema_name").value}`, {
                film2: film,
            })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            });
    } else {
        axios
            .put(`${link}${document.querySelector("#cinema_name").value}`, {
                film3: film,
            })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            });
    }
}

function cancal(a) {
    document.querySelector(`#id${a}1 input`).value = "";
    if (a == 0) {
        axios
            .put(`${link}${document.querySelector("#cinema_name").value}`, {
                film1: "",
            })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            });
    } else if (a == 1) {
        axios
            .put(`${link}${document.querySelector("#cinema_name").value}`, {
                film2: "",
            })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            });
    } else {
        axios
            .put(`${link}${document.querySelector("#cinema_name").value}`, {
                film3: "",
            })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            });
    }
}

function show_film() {
    var storage = [];
    callAPI("films", "GET", null).then((response) => {
        storage = response.data;
        var select = document.querySelector("#selectCategory").value;
        let row = "";
        storage.forEach((element) => {
            if (select == element.category) {
                row += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td> <img src="${element.img}" alt="" style="width: 80px; height: 80px"></td>
                    <td>${element.time}</td>
                    <td>${element.category}</td>
                    <td>${element.director}</td>
                    <td>${element.actor}</td>
                
                </tr>
                `;
            }
        });
        document.querySelector("#product").innerHTML = row;
    });
}

show_film();