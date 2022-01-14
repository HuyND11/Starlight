const API_URL = "https://61bc10c1d8542f0017824531.mockapi.io";
const API_user = "https://61bc10c1d8542f0017824531.mockapi.io";
var link = "https://61cfb80065c32600170c7fa8.mockapi.io/seat/";
var price = localStorage.getItem("price");
var film_name = localStorage.getItem("film_name");
var combo = localStorage.getItem("combo");
price = parseInt(price);
combo = parseInt(combo);
var count_seat = 0;
var seat = JSON.parse(localStorage.getItem("seat"));
var show_seat = "";
var id_cinema = localStorage.getItem("id_cinema");
var film_time = localStorage.getItem("time");
var date = localStorage.getItem("date");
if (film_time == "time1") film_time = "9h00";
else if (film_time == "time2") film_time = "13h40";
else film_time = "17h20";

function startTimer(duration, display) {
    var timer = duration,
        minutes,
        seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert("Hết thời gian giữ ghế, vui lòng tải lại trang");
            location.assign("../Home_page.html");
        }
    }, 1000);
}

window.onload = function() {
    var fiveMinutes = 60 * 2,
        display = document.querySelector("#time");
    startTimer(fiveMinutes, display);
};

function callAPI(url_input, endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${url_input}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
show_info = (id) => {
    var object = {};
    callAPI(API_user, `users/${id}`, "GET", null).then((res) => {
        object = res.data;
        document.querySelector("#user_name").innerHTML =
            "Người nhận: " + object.name;
        document.querySelector("#user_mail").innerHTML = "Email: " + object.email;
        document.querySelector("#user_phone").innerHTML =
            "Số điện thoại: " + object.phone_number;
    });
    document.querySelector("#film_name").innerHTML = "Tên phim: " + film_name;
    document.querySelector("#film_price").innerHTML =
        "tổng tiền ghế: " + price + " vnđ";
    seat.forEach((elemnt) => {
        show_seat += elemnt;
        show_seat += "  ";
        count_seat++;
        document.querySelector("#seat_count").innerHTML =
            "SỐ GHẾ: " + count_seat + " | " + show_seat;
    });

    document.querySelector(".form_xacnhan #price_total").innerHTML =
        "Tổng tiền thanh toán : " + (combo + price) + " vnđ";
    localStorage.setItem("total", combo + price);
};
show_info(localStorage.getItem("user"));
axios.get(`${link}${localStorage.getItem("id_cinema")}`).then((res) => {
    document.querySelector("#cinema_name").innerHTML = "Rạp: " + res.data.cinema;
    document.querySelector("#film_time").innerHTML =
        "Suất chiếu: " + film_time + " - " + date;
});

confirm = () => {
    window.location.assign("./step4.html");
};