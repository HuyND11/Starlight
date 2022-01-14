var film = localStorage.getItem("film");
var combo = localStorage.getItem("combo");
var total = parseInt(film) + parseInt(combo);
var seat = JSON.parse(localStorage.getItem("seat"));
var show_seat = "";
document.querySelector(".total_film").innerHTML = "giá phim: " + film;
document.querySelector(".total_combo").innerHTML = "giá combo " + combo;
document.querySelector(".total").innerHTML = "tổng : " + total + " vnđ";
seat.forEach((elemnt) => {
    show_seat += elemnt;
});
document.querySelector(".seat").innerHTML = seat;
// localStorage.setItem("star_user", 2);
// localStorage.clear();