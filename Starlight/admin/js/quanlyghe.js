var link = "";

const AIP_DATA_MONTH =
    "https://61cfb80065c32600170c7fa8.mockapi.io/monthlyData/";
flatpickr("#date", {
    maxDate: "today",
    altFormat: "F j, Y",
    dateFormat: "d-m-Y",
    defaultDate: "today",
});

const test = () => {
    var dateNow = document.getElementById("date").value;
    console.log(dateNow);
    axios.get(`${AIP_DATA_MONTH}`).then((res) => {
        var dataList = res.data;
        for (var i in dataList) {
            if (dateNow == dataList[i].date) {
                console.log(dataList[i]);
                for (var x in dataList[i].cinema) {
                    if (x == document.getElementById("cinema_name").value - 1) {
                        var index = 0;
                        for (var z in dataList[i].cinema[x]) {
                            index++;
                            document.getElementById(`time${index}`).innerHTML =
                                dataList[i].cinema[x][z].length;
                            // console.log(11);
                            document.getElementById(`seat_time${index}`).innerHTML =
                                dataList[i].cinema[x][z];
                        }
                    }
                }
                break;
            }
        }
    });
};

var current = new Date();
var today = current.getDate();
console.log(today);

var create_new_date = () => {
    axios.get(AIP_DATA_MONTH).then((res) => {
        if (res.data.length != today) {
            let dayy = res.data.length;
            for (let i = 0; i < today - res.data.length; i++) {
                var new_data = {
                    id: "",
                    date: `${(dayy += 1)}-01-2022`,
                    cinema: [
                        [
                            [],
                            [],
                            []
                        ],
                        [
                            [],
                            [],
                            []
                        ],
                        [
                            [],
                            [],
                            []
                        ],
                    ],
                };
                axios.post(AIP_DATA_MONTH, new_data).then((res) => {
                    console.log(res.status);
                });
            }
        }
    });
};
// create_new_date();
test();