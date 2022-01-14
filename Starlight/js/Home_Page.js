const API_URL = "https://61bc10c1d8542f0017824531.mockapi.io";

function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
var goTop = 200;
// code for slide

// code for button go to top
// code for show film
function show() {
    var storage = [];
    callAPI("films", "GET", null).then((response) => {
        storage = response.data;

        // var select = document.querySelector("#selectCategory").value;
        let row = "";
        storage.forEach((element) => {
            row += `
                    <div class="hot-film-element">
                    <div class="display-hot-film">
                        <div class="hot-film-img">
                            <a href="#"><img src="${element.img}" alt="" /></a>
                        </div>
                        <div class="hot-film-content">
                            <h3>${element.name}</h3>
                            <p class="category">${element.category}</p>
                            <div class="type-age">
                                <span class="type">2d</span>
                                <span class="age">c13</span>
                            </div>
                            <div class="hot-film-information">
                                <span><b>đạo diễn:</b>${element.director}</span><br />
                                <span><b>diễn viên:</b> ${element.actor}</span
                ><br />
                <span
                    ><b>mô tả:</b> ${element.note}</span
                ><br />
                </div>
                <div>
                <button onclick="buy_film(${element.id})" class = "button-24" role="button"><a href="./html/Name_film.html"><i class="fas fa-ticket-alt"></i> Đặt vé</a></button>
                </div>
            </div>
            </div>
            <hr />
        </div>
            `;
        });
        document.querySelector(".hot-film-container").innerHTML = row;
    });
}

function show_News_film() {
    var storage = [];
    callAPI("cinematics", "GET", null).then((response) => {
        storage = response.data;

        // var select = document.querySelector("#selectCategory").value;
        let row = "";
        let print_content = "";
        let print_title = "";
        storage.forEach((element) => {
            print_content = element.content.slice(0, 147);
            print_title = element.title.slice(0, 50);
            row += `
            <div class="news-element">
            <p class="news-display-img">
                <img src="${element.img}" class="news-film-img" />
            </p>
            <div class="news-film-information">
                <div class="news-film-title">
                    ${print_title}...
                </div>
                <div class="admin-time">
                    <div class="admin"><i class="fas fa-user"></i> admin</div>
                    <div class="time"><i class="fas fa-tags"></i>${element.time}</div>
                </div>
                <div class="news-film-content">
                    ${print_content}...
                </div>
            </div>
        </div>
            `;
        });
        document.querySelector(".news-film-container").innerHTML = row;
    });
}
show();
show_News_film();
// show_Promotion();
$(".responsive").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
});
buy_film = (id) => {
    localStorage.setItem("film", id);
};