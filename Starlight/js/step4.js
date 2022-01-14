const API_URL = "https://61bc10c2d8542f001782453f.mockapi.io";
const API_user = "https://61bc10c1d8542f0017824531.mockapi.io";
const link = "https://61cfb80065c32600170c7fa8.mockapi.io/seat/";
var monthly = "https://61cfb80065c32600170c7fa8.mockapi.io/monthlyData";

function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

var btn = document.querySelector(".abc");
var btn_sucsses = document.querySelector(".button-77");
var modal_content = document.querySelector(".modal_11");
var modal = document.querySelector(".modal-bg");
var closee = document.querySelector(".modal-close");
var btn_close = modal_content.querySelector(".btn_modal");
var total = localStorage.getItem("total");
var user_ID = localStorage.getItem("user");
var film_ID = localStorage.getItem("film");
var seat = localStorage.getItem("seat");
var date = localStorage.getItem("date");

var current_1 = new Date();
var day = current_1.getDate();
document.querySelector(".color-total").innerHTML = total + " vnĐ";

console.log(day);
upload_data = (id_film, id_user, date, seat, price) => {
    axios.get(`${link}${localStorage.getItem("id_cinema")}`).then((res) => {
        let name = res.data.cinema;
        data = {
            id_user: id_user,
            id_film: id_film,
            cinema: name,
            seat: seat,
            date: date,
            total: price,
            id: "",
        };
        callAPI("bills", "POST", data).then(
            (response = () => {
                console.log("succsessful !");
            })
        );
    });
    // tạm thời thay day = 14
    axios.get(`${monthly}/${14}`).then((res) => {
        var store_API = res.data;
        for (let i = 1; i < 4; i++) {
            if (localStorage.getItem("time") == `time${i}`) {
                let store_data = res.data.cinema[localStorage.getItem("id_cinema") - 1];
                let tamp = JSON.parse(localStorage.getItem("seat"));
                for (let j = 0; j < tamp.length; j++) {
                    store_data[i - 1].push(tamp[j]);
                }
                store_API.cinema[localStorage.getItem("id_cinema") - 1] = store_data;
                axios
                    .put(`${monthly}/${14}`, { cinema: store_API.cinema })
                    .then((res) => {
                        console.log(res.status);
                    });
            }
        }
    });
};
btn.addEventListener("click", () => {
    modal.classList.add("bg-active");
    modal_content.classList.add("style");
});

btn_sucsses.addEventListener("click", () => {
    modal.classList.add("bg-active");
    modal_content.classList.add("style");
    document.querySelector(".modal_content").innerHTML =
        "đang xác nhận thông tin....";
    document.querySelector(".btn_modal").style.display = "none";
    setTimeout(() => {
        upload_data(film_ID, user_ID, date, seat, total);
        document.querySelector(".modal_content").innerHTML =
            "xác nhận thành công <br> nhấn nhất trí để về trang chủ";
        document.querySelector(".btn_modal").style.display = "block";
    }, 5000);
});

closee.addEventListener("click", () => {
    modal.classList.remove("bg-active");
    modal_content.classList.remove("style");
});

btn_close.addEventListener("click", () => {
    modal.classList.remove("bg-active");
    modal_content.classList.remove("style");
    window.location.assign("../Home_page.html");
});

const sendMailBill = () => {
    var price = localStorage.getItem("price");
    var film_name = localStorage.getItem("film_name");
    var combo = localStorage.getItem("combo");
    price = parseInt(price);
    combo = parseInt(combo);
    var count_seat = 0;
    var seat = JSON.parse(localStorage.getItem("seat"));
    var show_seat = "";
    axios
        .get(`${API_user}/${"users"}/${localStorage.getItem("user")}`)
        .then((res) => {
            axios.get(`${link}/`).then((response) => {
                var cinema = response.data;
                var cinemaName = "";
                for (var i in cinema) {
                    if (cinema[i].id == localStorage.getItem("id_cinema")) {
                        cinemaName = cinema[i].cinema;
                    }
                }
                seat.forEach((element) => {
                    show_seat += element;
                    show_seat += "  ";
                    count_seat++;
                });
                var bill = {
                    userName: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone_number,
                    cinema: cinemaName,
                    filmName: film_name,
                    seatCount: count_seat,
                    seat: show_seat,
                    priceSeat: price,
                    priceCombo: combo,
                    total: total,
                };
                emailjs.send("Bill", "template_t9pbst5", bill);
            });
        });
};