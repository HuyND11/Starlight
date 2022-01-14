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
var image_promotion = [
    "../img/event1.jpg",
    "../img/event2.jpg",
    "../img/event3.jpg",
    "../img/event4.jpg",
    "../img/event5.jpg",
    "../img/event6.jpg",
];
var image_index = 0;

function show() {
    var storage = [];
    callAPI("promotions", "GET", null).then((response) => {
        storage = response.data;
        let row = "";
        let print_content = "";
        let print_title = "";
        let img = "";
        console.log(storage.length);
        storage.forEach((element) => {
            print_content = element.content.slice(0, 147);
            print_title = element.title.slice(0, 50);
            row += `
            <div class="element_promotion">
            <div class="container_promotion">
            <img src="${image_promotion[image_index]}" alt="Avatar" class="image_promotion">
            <div class="overlay_promotion">
                <div class="text_promotion">${print_title}</div>
                <div class="text_promotion_content">${print_content}</div>
            </div>
        </div>
            </div>
         
                `;
            img += `
                    <img src="${element.img}" />
                `;
            image_index++;
        });

        document.querySelector("#promotion").innerHTML = row;
        document.querySelector(".promotion1").innerHTML = img;

        $(".promotion1").slick({
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
    });
}
show();
// code for slide