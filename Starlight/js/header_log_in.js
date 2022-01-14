const URL_API1 = "https://61bc10c1d8542f0017824531.mockapi.io/";
const user_Table = "users";
const logout = () => {
    document.getElementById("display_userName").className =
        "hidden btn btn_account";
    document.getElementById("button_logout").className = "hidden btn btn_account";
    document.getElementById("button_login").className = "show btn btn_account";
    document.getElementById("button_signup").className = "show btn btn_account";
    localStorage.setItem("user", null);
};

const changeDisplayLogin = (id) => {
    axios.get(`${URL_API1}${user_Table}`).then((res) => {
        var login = res.data;
        for (i in login) {
            if (login[i].id == id) {
                document.getElementById("display_userName").className =
                    "show btn btn_account";
                document.getElementById("button_logout").className =
                    "show btn btn_account";
                document.getElementById("button_login").className =
                    "hidden btn btn_account";
                document.getElementById("button_signup").className =
                    "hidden btn btn_account";
                document.getElementById("display_userName").innerHTML = login[i].name;
                break;
            }
            console.log(login[i].name);
        }
    });
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