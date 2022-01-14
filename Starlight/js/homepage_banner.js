var swiper = new Swiper("#banner_swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
const URL_API = "https://61bc10c1d8542f0017824531.mockapi.io/";
const Films_Table = "films/";

const showData = (tableName) => {
    axios
        .get(`${URL_API}${tableName}`)
        .then((res) => {
            var storage = res.data;
            storage.forEach((element) => {
                document.getElementById("films_hot").innerHTML += `
                    <div class="swiper-slide">
                        <a href="" class="info_movie">
                            <div class="img_movie">
                                <img src="${element.img}"  />
                            </div>
                            <div class="des_movie">
                                <div class="des_title">
                                    <h2>${element.name}</h2>
                                </div>
                                <div class="type-age">
                                    <span class="type">2D</span>
                                    <span class="age">C13</span>
                                </div>
                                <div class="fimls_type">
                                    <span class="films_item">Thể loại:</span>
                                    ${element.category}
                                </div>
                                <div class="fimls_director">
                                    <span class="films_item">Đạo diễn:</span> 
                                    ${element.director}
                                </div>
                                <div class="fimls_actor">
                                    <span class="films_item">Diễn Viên:</span> 
                                    ${element.actor}
                                </div>
                                <div class="fimls_des">
                                    <span class="films_item">Mô tả:</span> 
                                    ${element.note}
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });
        })
        .then(() => {
            var swiperMovies = new Swiper("#slides_movie", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: ".swiper-pagination",
                },
                // spaceBetween: 30,
                // centeredSlides: true,
                // autoplay: {
                //     delay: 4500,
                //     disableOnInteraction: false,
                // },
                // pagination: {
                //     el: ".swiper-pagination",
                //     clickable: true,
                // },
            });
        });
};
showData(Films_Table);

const logout = () => {
    document.getElementById("display_userName").className =
        "hidden btn btn_account";
    document.getElementById("button_logout").className = "hidden btn btn_account";
    document.getElementById("button_login").className = "show btn btn_account";
    document.getElementById("button_signup").className = "show btn btn_account";
    localStorage.setItem("user", null);
};

if (
    localStorage.getItem("user") != null ||
    localStorage.getItem("user") == undefined
) {
    document.getElementById("button_logout").className = "hidden btn btn_account";
    document.getElementById("display_userName").className =
        "hidden btn btn_account";
} else {
    document.getElementById("button_logout").className = "show btn btn_account";
    document.getElementById("display_userName").className =
        "show btn btn_account";
    document.getElementById("button_login").className = "hidden btn btn_account";
    document.getElementById("button_signup").className = "hidden btn btn_account";
}
console.log("check");
window.onload = changeDisplayLogin(localStorage.getItem("user"));