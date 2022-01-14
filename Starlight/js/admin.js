const URL_API = "https://61bc10c1d8542f0017824531.mockapi.io";

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
var te = 2;

function show() {
    var storage = [];
    console.log(te);

    callAPI("films", "GET", null).then((response) => {
        storage = response.data;
        console.log(te);
        te = 1;
        console.log(te);
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
                    <td>${element.note}</td>
                    <td><button type="button" onclick="editok(${element.id})" class="btn btn-success"><i class="bi bi-gear"></i></button></td>
                    <td><button type="button" onclick="deletesp(${element.id})" class="btn btn-danger"><i class="bi bi-trash"></i></button></td>
                </tr>
                `;
            }
        });
        document.querySelector("#product").innerHTML = row;
    });
}
show();
console.log(te);

function editsp(id) {
    // var menu = JSON.parse(localStorage.getItem("menu")) || [];
    var menu = [];
    callAPI(`products`, "GET", null).then((res) => {
        menu = res.data;
        document.getElementById("ok").style.display = "none";
        document.getElementById("edit").style.display = "block";
        var e = document.getElementById("selectCategory");
        var category = e.options[e.selectedIndex].value;
        for (i in menu) {
            if (menu[i].category == category) {
                for (j in menu[i].list) {
                    if (menu[i].list[j].id == id) {
                        document.getElementById("nameProduct").value = menu[i].list[j].name;
                        document.getElementById("priceProduct").value =
                            menu[i].list[j].price;
                        document.getElementById("noteProduct").value = menu[i].list[j].note;
                        document.getElementById("imgProduct").value = menu[i].list[j].img;
                    }
                }
                document.getElementById(
                    "edit"
                ).innerHTML = `<button type="button" onclick="editok(${menu[i].id},${id})" class="btn btn-success">save</button>`;
            }
        }
    });
}

function editok(id) {
    // var menu = JSON.parse(localStorage.getItem("menu")) || [];
    var menu;
    // callAPI(`products/${id}`, "GET", null).then((res) => {
    //     menu = res.data;
    //     menu.id = idsp;
    //     menu.name = document.getElementById("nameProduct").value;
    //     menu.price = document.getElementById("priceProduct").value;
    //     menu.note = document.getElementById("noteProduct").value;
    //     menu.img = document.getElementById("imgProduct").value;
    // });
    menu = {
        id: id,
        name: "Bố già 1",
        note: "1111",
        img: "https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/review/phim/phim-bo-gia-tran-thanh-viet-nam.jpg",
        category: "comedy",
        time: "1h20",
    };
    callAPI(`films/${id}`, "PUT", menu).then((res) => {
        show();
        // changeCategory();
        // reset();
    });

    // if (document.getElementById("edit").style.display === "block") {
    //     document.getElementById("edit").style.display = "none";
    //     document.getElementById("ok").style.display = "block";
    // } else {
    //     document.getElementById("edit").style.display = "block";
    //     document.getElementById("ok").style.display = "none";
    // }
}

function save1() {
    // var menu = [];
    // callAPI(`users`, "GET", null).then((res) => {
    //     menu = res.data;
    //     id = menu.length;

    // });
    film = {
        id: "",
        name: "Bố già 1",
        note: "1111",
        img: "https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/review/phim/phim-bo-gia-tran-thanh-viet-nam.jpg",
        category: "comedy",
        time: "1h20",
    };
    // console.log(id);
    callAPI(`users`, "POST", film).then((res) => {
        // console.log(film);
        show();
    });
}
// save1();

// function checkPATCH() {
//     callAPI(`products/${20}`, "PATCH", ).then((res) => {
//         console.log(res);
//     });
// }
// checkPATCH();
console.log(11);