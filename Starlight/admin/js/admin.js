const URL_API = "https://61bc10c1d8542f0017824531.mockapi.io";
const URL_APIuser = "https://61bc10c1d8542f0017824531.mockapi.io";


const URL_APIbills = "https://61bc10c2d8542f001782453f.mockapi.io";


// ------------------------------------------------------

// ------------------------------
function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function callAPIbills(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_APIbills}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
// 
function callAPIuser(endpoint, method, body) {
    return axios({
        method: method,
        url: `${URL_APIuser}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
// số lượng user
var user = [];

function countU() {
    var count = 0;
    callAPIuser("users", "GET", null).then((response) => {
        user = response.data;
        // console.log(menu)
        for (var i = 0; i < user.length; i++) {
            count++;
        }
        document.getElementById("qty1").innerHTML = count;
    })
}
countU()
    // số lượng phim
var menu = [];

function countt() {
    var count = 0;
    callAPI("films", "GET", null).then((response) => {
        menu = response.data;
        // console.log(menu)
        for (var i = 0; i < menu.length; i++) {
            count++;
        }
        document.getElementById("qty2").innerHTML = count;
    })
}
countt()

// số đơn hàng
var store = [];

function qtyBills() {
    var idd = 0;
    callAPIbills("bills", "GET", null).then((response) => {
        store = response.data;
        // console.log(menu)
        for (var i = 0; i < store.length; i++) {
            idd++;
        }
        document.getElementById("qty3").innerHTML = idd;;
    })
}
qtyBills()