const API_URL = "https://61bc10c1d8542f0017824531.mockapi.io";
var api_seat = "https://61cfb80065c32600170c7fa8.mockapi.io/seat";
var data = "https://61cfb80065c32600170c7fa8.mockapi.io/monthlyData";
var id = localStorage.getItem("film");

function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function callLink(link, method = "GET", body) {
    return axios({
        method: method,
        url: link,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function callAPI_CINEMA(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${API_CINEMA}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
show = (id) => {
    let row = "";
    callAPI(`films/${id}`, "GET", null).then((res) => {
        localStorage.setItem("film_name", res.data.name);
        document.getElementById("name_film").innerHTML = res.data.name;
        row += `
            <div class="hot-film-element">
                <div class="display-hot-film">
                    <div class="hot-film-img">
                        <a href="#"><img src="${res.data.img}" alt="" /></a>
                    </div>
                    <div class="hot-film-content">
                        <h3>${res.data.name}</h3>
                        <p class="category">${res.data.category}</p>
                        <div class="type-age">
                            <span class="type">2d</span>
                            <span class="age">c13</span>
                        </div>
                        <div class="hot-film-information">
                            <span><b>đạo diễn: </b>${res.data.director}</span><br />
                            <span><b>diễn viên: </b> ${res.data.actor}</span><br />
                            <span><b>thời lượng: </b> ${res.data.time}</span><br />
                            <span><b>Khởi chiếu: </b> 24/12/2021</span><br />
                            <hr />
                           <div class="description">
                                <span><b>mô tả:</b> ${res.data.note}</span><br />
                           </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
`;
        document.querySelector(".film-container").innerHTML = row;
    });
};
var day;
show_cinema = () => {
    var current = new Date();
    day = current.getDate();
    var month = current.getMonth();
    var year = current.getFullYear();
    current = `${day}/${month + 1}/${year}`;
    localStorage.setItem("date", current);
    let row = "";
    callLink(api_seat, "GET", null).then((res) => {
        element = res.data;
        for (let i = 0; i < 3; i++) {
            {
                row += `
                <div onclick="angle(${element[i].id})" class="box_cinema">
                    <div class="cinema">
                        <h3 class="name">${element[i].cinema}</h3>
                        <p class="address">
                           ${element[i].address}
                        </p>
                    </div>
                    <div class"angle">
                        <div id="down${element[i].id}" class="">
                            <i class="fas fa-angle-double-down"></i>
                        </div>
                        <div id="up${element[i].id}" class="hidden">
                            <i class="fas fa-angle-double-up"></i>
                        </div>
                    </div>
                </div>
                <div id="time_today${element[i].id}" class = "hidden time_film">   
                    <div class = "display_time">
                        <div class="date"> <span></span> </div>
                         <div id= "hour${element[i].id}" class= "display_time">
                         <p id="time1" onclick ="select_cinema('time1',${element[i].id},${element[i].film1})" class="button-77">9h00</p>
                         <p  id="time2" onclick ="select_cinema('time2',${element[i].id},${element[i].film2})" class="button-77">13h40</p>
                         <p  id="time3" onclick ="select_cinema('time3',${element[i].id},${element[i].film3})" class="button-77">17h20</p>
                         </div>
                    </div>
                    <hr class = "style3"/>    
                </div>
                   
                `;
            }
        }
        document.querySelector(".showtimes-content").innerHTML = row;

        var time = document.querySelectorAll(".date span");
        time.forEach((element) => {
            element.innerHTML = current;
        });
    });
};
angle = (index) => {
    document.getElementById("down" + index).classList.toggle("hidden");
    document.getElementById("up" + index).classList.toggle("hidden");
    document.getElementById("time_today" + index).classList.toggle("hidden");
};

show(id);
show_cinema();
console.log(day);
//Thay thành 14 vì nhiều trường hợp mà không thể bật admin nên  phim sẽ auto lưu vào ngày cuối cùng của dự
// án là ngày 14 bất kỳ phim nào đc tạo ra thì dữ liệu cũng chỉ dừng lại ở 14/1/2022
// Đây là biện pháp tạm thời khi người dùng mua vé mà admin ko hoạt động
axios.get(`${data}/14`).then((res) => {
    select_cinema = (id_time, cinema, film) => {
        if ((film == "") | (film != localStorage.getItem("film"))) {
            // alert("Hiện rạp chưa có vé này");
            modal.classList.add("bg-active");
            modal_content.classList.add("style");
        } else {
            for (let i = 1; i < 4; i++) {
                if (id_time == `time${i}`) {
                    localStorage.setItem(
                        "sold_seat",
                        JSON.stringify(res.data.cinema[cinema - 1][i - 1])
                    );
                    localStorage.setItem("time", `time${i}`);
                    localStorage.setItem("id_cinema", cinema);
                    break;
                }
            }
            window.location.assign("../html/Select_Seat.html");
        }
    };
});

// modal
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