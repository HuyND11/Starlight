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

function show() {
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