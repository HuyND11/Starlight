const URL_API11 = "https://61bc10c1d8542f0017824531.mockapi.io/";
const user_Table = "users";
const getData = (tableName) => {
    var result = axios.get(`${URL_API11}${tableName}`);
    return result.data;
};

const reset = () => {
    document.getElementById("User").value = "";
    document.getElementById("password").value = "";
};


const changeDisplayLogin = (id) => {
    axios.get(`${URL_API11}${user_Table}`).then((res) => {
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

const logIn = () => {
    var account = document.getElementById("User").value;
    var password = document.getElementById("password").value;
    var count = 0;
    if (!checkAccountLogin() + !checkPasswordLogin())
        return
    axios.get(`${URL_API11}${user_Table}`).then((res) => {
        var login = res.data;
        for (i in login) {
            if (account == login[i].account) {
                if (password == login[i].password) {
                    alert("Sign Up success");
                    localStorage.setItem("user", login[i].id);
                    reset();
                    window.location.href = "../Home_page.html";
                    break;
                } else {
                    document.getElementById("invalidPassword").innerHTML = "Wrong password"
                    document.getElementById("password").value = "";
                }
                return;
            }
        }
        if (count == 0) {
            document.getElementById("invalidAccount").innerHTML = "Wrong Account"
        }
    });
};

document.getElementById("button_logout").className = "hidden btn btn_account";
document.getElementById("display_userName").className = "hidden btn btn_account";


const showPassword = (pass) => {
    const passField = document.getElementById(pass);
    const showBtn = document.querySelector("span i");
    if (passField.type === "password") {
        passField.type = "text";
        showBtn.classList.add("hide-btn");
    } else {
        passField.type = "password";
        showBtn.classList.remove("hide-btn");
    }
}

const checkAccountLogin = () => {
    var account = document.getElementById("User").value;
    if (account == "") {
        document.getElementById("invalidAccount").innerHTML = "Account must be filled out!";
        return false;
    }
    document.getElementById("invalidAccount").innerHTML = "";
    return true;
}

const checkPasswordLogin = () => {
    var password = document.getElementById("password").value;
    if (password == "") {
        document.getElementById("invalidPassword").innerHTML = "Password must be filled out!";
        return false;
    }
    if (password.length < 4) {
        document.getElementById("invalidPassword").innerHTML = "Password must have more 4 characters!";
        return false;
    }

    document.getElementById('invalidPassword').innerHTML = "";
    return true;
}