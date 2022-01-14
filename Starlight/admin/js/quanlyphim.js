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
// ------------------------------Nguyệt
var id;

function save() {
    var nameFilm = document.getElementById("nameFilm").value;
    var timeFilm = document.getElementById("timeFilm").value;
    var actor = document.getElementById("actor").value;
    var imgFilm = document.getElementById("imgFilm").value;
    var director = document.getElementById("director").value;
    var noteFilm = document.getElementById("noteFilm").value;
    var CategoryFilm = document.getElementById("selectCategoryFilm").value;
    var oneFilm = {
        name: nameFilm,
        time: timeFilm,
        img: imgFilm,
        note: noteFilm,
        actor: actor,
        director: director,
        category: CategoryFilm,
    };

    callAPI("films", "POST", oneFilm).then((res) => {
        console.log(res);
        alert("bạn đã thêm thành công " + oneFilm.name);
        reset();
        location.reload();
    });
}
// ----------------

function show() {
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
                    <td>
                        <button type="button" onclick="editsp(${element.id})" class="btn btn-success"><i class="bi bi-gear"></i></button>
                    </td>
                    <td>
                        <button type="button" onclick="deleteProduct(${element.id})" class="btn btn-danger"><i class="bi bi-trash"></i></button></td>
                </tr>
                `;
            }
        });
        document.querySelector("#product").innerHTML = row;
    });
}
show();
// ----------------------
// EDIT VƯ
var id;

function editsp(id) {
    var menu;
    callAPI(`films/${id}`, "GET", null).then((res) => {
        menu = res.data;
        document.getElementById("ok").style.display = "none";
        document.getElementById("edit").style.display = "block";
        // var e = document.getElementById("selectCategory");
        // var category = e.options[e.selectedIndex].value;
        document.getElementById("nameFilm").value = menu.name;
        document.getElementById("imgFilm").value = menu.img;
        document.getElementById("timeFilm").value = menu.time;
        document.getElementById("noteFilm").value = menu.note;
        document.getElementById("actor").value = menu.actor;
        document.getElementById("director").value = menu.director;
        document.getElementById("selectCategoryFilm").value = menu.category;
        document.getElementById(
            "edit"
        ).innerHTML = `<button type="button" onclick="editok(${menu.id})" class="btn btn-success data-toggle="modal" data-target="#exampleModal"">save</button>`;
    });
}

function editok(id) {
    var name = document.getElementById("nameFilm").value;
    var img = document.getElementById("imgFilm").value;
    var time = document.getElementById("timeFilm").value;
    var note = document.getElementById("noteFilm").value;
    var actor = document.getElementById("actor").value;
    var director = document.getElementById("director").value;
    var category = document.getElementById("selectCategoryFilm").value;
    var menu = {
        name: name,
        time: time,
        img: img,
        note: note,
        id: id,
        actor: actor,
        director: director,
        category: category,
    };
    callAPI(`films/${id}`, "PUT", menu).then((res) => {
        show();
        reset();
        console.log(id);
    });

    if (document.getElementById("edit").style.display === "block") {
        document.getElementById("edit").style.display = "none";
        document.getElementById("ok").style.display = "block";
    } else {
        document.getElementById("edit").style.display = "block";
        document.getElementById("ok").style.display = "none";
    }
}

function reset() {
    document.getElementById("nameFilm").value = "";
    document.getElementById("imgFilm").value = "";
    document.getElementById("timeFilm").value = "";
    document.getElementById("noteFilm").value = "";
    document.getElementById("actor").value = "";
    document.getElementById("director").value = "";
}
// --------------------------------------------------delete-HUY--------
const deleteProduct = (id) => {
    axios
        .delete(`${URL_API}/${PRODUCT_TABLE}/${id}`)
        .then((res) => {
            console.log(res.data);
            window.location.assign("./quanlyphim.html");
        })
        .catch((err) => console.log(err));
};

//
// số lượng phim
// var menu = [];
// function countt() {
//     var count = 0;
//     callAPI(films, "GET", null).then((response) => {
//         menu = response.data;
//         // console.log(menu)
//         for (var i = 0; i < menu.length; i++) {
//             count++;
//         }
//         document.getElementById("qty2").innerHTML = count;
//     })
// }
// countt()