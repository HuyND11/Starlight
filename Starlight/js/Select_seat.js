var row = "";
var abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
var seat = [],
    save = [];
var seat_sold = JSON.parse(localStorage.getItem("sold_seat"));
console.log(seat_sold);

check_input = (row, column) => {
    let index = -1;
    seat_sold.forEach((element, i) => {
        if (element == `${row}${column}`) index = i;
    });
    return index;
};
show_seat_sold = () => {
    abc.forEach((element, index) => {
        row += `<div class="display_f">`;
        for (let j = 1; j < 11; j++) {
            if (check_input(element, j) == -1) {
                if ((j == 2) | (j == 1)) {
                    row += `<div class="seat_color">
            <img src="../img/cuble.png" onclick = "angle(${index},${j})" id="normal${element}${j}" class="" alt="">
            <img src="../img/selecting.png"  onclick = "angle(${index},${j})" id="select${element}${j}" class= "hidden" alt="">
            <p>${element}${j}</p>
          </div>`;
                } else {
                    row += `<div class="seat_color">
            <img src="../img/nomal.png"   onclick = "angle(${index},${j})" id="normal${element}${j}" class="" alt="">
            <img src="../img/selecting.png"  onclick = "angle(${index},${j})" id="select${element}${j}" class= "hidden" alt="">
            <p>${element}${j}</p>
            </div>`;
                }
            } else {
                row += `<div class="seat_color">
                <img src="../img/saled.png"   id="normal${element}${j}" class="" alt="">
                <p>${element}${j}</p>
                </div>`;
            }
        }
        row += `</div>`;
    });
    document.querySelector(".seat").innerHTML = row;
};
show_seat_sold();

angle = (ele, index) => {
    if (index == 1) {
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("hidden");
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("check");
        document
            .getElementById("normal" + abc[ele] + index)
            .classList.toggle("hidden");
        index++;
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("hidden");
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("check");
        document
            .getElementById("normal" + abc[ele] + index)
            .classList.toggle("hidden");
    } else if (index == 2) {
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("hidden");
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("check");
        document
            .getElementById("normal" + abc[ele] + index)
            .classList.toggle("hidden");
        index--;

        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("hidden");
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("check");
        document
            .getElementById("normal" + abc[ele] + index)
            .classList.toggle("hidden");
    } else {
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("hidden");
        document
            .getElementById("select" + abc[ele] + index)
            .classList.toggle("check");
        document
            .getElementById("normal" + abc[ele] + index)
            .classList.toggle("hidden");
    }
    // console.log(seat);
    var img = document.querySelectorAll(`.seat img.check`);
    if (img.length >= 10) {
        // alert("ko dc mua qua 10 vui lòng hủy vé vừa đặt");
        modal.classList.add("bg-active");
        modal_content.classList.add("style");
        modal_content.querySelector(".modal_content").innerHTML =
            "Không được mua quá 10 vé vui lòng hủy vé vừa đặt";
    } else {
        img.forEach((element) => {
            let index_seat = element.getAttribute("id");
            seat.push(index_seat.substring(6, 9));
        });
        save = seat;
        seat = [];
        show_seat();
    }
};
show_seat = () => {
    let aaa = " ";
    let quantity = 0;
    let price = 0;
    save.forEach((element) => {
        aaa += `${element}, `;
        quantity++;
    });
    price = quantity * 50000;
    document.querySelector(".bought_ticket p").innerHTML = aaa;
    document.querySelector(".total_ticket p").innerHTML = price + " vnđ";
    localStorage.setItem("seat", JSON.stringify(save));
};

next_step = () => {
    var condition = parseInt(document.querySelector(".total_ticket p").innerHTML);
    if (condition == 0) {
        modal.classList.add("bg-active");
        modal_content.classList.add("style");
        modal_content.querySelector(".modal_content").innerHTML = "Cần mua vé";
    } else {
        localStorage.setItem(
            "price",
            document.querySelector(".total_ticket p").innerHTML
        );
        if (
            localStorage.getItem("user") == "null" ||
            localStorage.getItem("user") == undefined
        ) {
            window.location.assign("../html/Log_in.html");
        } else {
            window.location.assign("../html/Select_food_drink.html");
        }
    }
};
var btn = document.querySelector(".abc");
var modal_content = document.querySelector(".modal_11");
var modal = document.querySelector(".modal-bg");
var closee = document.querySelector(".modal-close");
var btn_close = document.querySelector(".btn_modal");
document.querySelector(".modal_content").innerHTML =
    "Hiện phim này không được chiếu ở khung giờ này";
closee.addEventListener("click", () => {
    modal.classList.remove("bg-active");
    modal_content.classList.remove("style");
});

btn_close.addEventListener("click", () => {
    modal.classList.remove("bg-active");
    modal_content.classList.remove("style");
});