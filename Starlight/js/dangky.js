class User {
    constructor(
        name,
        email,
        address,
        account,
        Id_card,
        password,
        phone_number,
        gender,
        date_of_birth
    ) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.account = account;
        this.Id_card = Id_card;
        this.password = password;
        this.phone_number = phone_number;
        this.gender = gender;
        this.date_of_birth = date_of_birth;
    }
}

const URL_API = "https://61bc10c1d8542f0017824531.mockapi.io/";
const user_Table = "users";

const postData = (tableName, data) => {
    axios.post(`${URL_API}${tableName}`, data).catch((err) => {
        console.log(err);
    });
    console.log("posted");
};

const signUp = () => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var account = document.getElementById("account").value;
    var Id_card = document.getElementById("Id_card").value;
    var password = document.getElementById("password").value;
    var date_of_birth = document.getElementById("birthday").value;
    var rePassword = document.getElementById("rePassword").value;
    var phone_number = document.getElementById("phone").value;
    var gender = null;
    gender = document.querySelector('input[name="gender"]:checked').value;

    if (!checkValidateEmail() +
        !checkValidateAccount() +
        !checkValidateIdCard() +
        !checkValidatePassword() +
        !checkValidateRePassword() +
        !checkValidatePhone() +
        !checkValidateName()
    )
        return;
    axios.get(`${URL_API}${user_Table}`).then((res) => {
        var listAccount = res.data;
        for (var acc of listAccount) {
            if (acc.account == account) {
                document.getElementById("invalidAccount").innerHTML =
                    "Account is already exist!";
                return;
            }
        }
        postData(
            user_Table,
            new User(
                name,
                email,
                address,
                account,
                Id_card,
                password,
                phone_number,
                gender,
                date_of_birth
            )
        );
        alert("Success");
        sendEmail(email, name, account, password);
        reset();
    });
};

const reset = () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("account").value = "";
    document.getElementById("Id_card").value = "";
    document.getElementById("password").value = "";
    document.getElementById("birthday").value = "";
    document.getElementById("rePassword").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("gender").value = "";
};

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
};

const checkValidateEmail = (email) => {
    var email = document.getElementById("email").value;
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email == "") {
        document.getElementById("invalidEmail").innerHTML =
            "Email address must be filled out!";
        return false;
    }
    if (!email.match(pattern)) {
        document.getElementById("invalidEmail").innerHTML =
            "Please enter valid email address!";
        return false;
    }
    document.getElementById("invalidEmail").innerHTML = "";
    return true;
};

const checkValidateName = () => {
    var name = document.getElementById("name").value;
    if (name == "") {
        document.getElementById("invalidName").innerHTML =
            "Name must be filled out!";
        return false;
    }
    document.getElementById("invalidName").innerHTML = "";
    return true;
};

const checkValidatePhone = () => {
    var phone = document.getElementById("phone").value;
    if (phone == "") {
        document.getElementById("invalidPhone").innerHTML =
            "Phone must be filled out!";
        return false;
    }
    if (isNaN(phone)) {
        document.getElementById("invalidPhone").innerHTML =
            "Please enter valid phone!";
        return false;
    }
    if (phone.length != 10) {
        document.getElementById("invalidPhone").innerHTML =
            "Phone must have 10 characters!";
        return false;
    }
    document.getElementById("invalidPhone").innerHTML = "";
    return true;
};

const checkValidateAccount = () => {
    var account = document.getElementById("account").value;
    if (account == "") {
        document.getElementById("invalidAccount").innerHTML =
            "Account must be filled out!";
        return false;
    }
    document.getElementById("invalidAccount").innerHTML = "";
    return true;
};

const checkValidatePassword = () => {
    var password = document.getElementById("password").value;
    if (password == "") {
        document.getElementById("invalidPassword").innerHTML =
            "Password must be filled out!";
        return false;
    }
    if (password.length < 4) {
        document.getElementById("invalidPassword").innerHTML =
            "Password must have more 4 characters!";
        return false;
    }

    document.getElementById("invalidPassword").innerHTML = "";
    return true;
};

const checkValidateRePassword = () => {
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("rePassword").value;
    if (rePassword == "") {
        document.getElementById("invalidRePassword").innerHTML =
            "RePassword must be filled out!";
        return false;
    }
    if (password != rePassword) {
        document.getElementById("invalidRePassword").innerHTML =
            "RePassword is the same with password!";
        return false;
    }
    document.getElementById("invalidRePassword").innerHTML = "";
    return true;
};

const checkValidateIdCard = () => {
    var idCard = document.getElementById("Id_card").value;
    if (idCard == "") {
        document.getElementById("invalidIdCard").innerHTML =
            "ID card must be filled out!";
        return false;
    }
    if (isNaN(idCard)) {
        document.getElementById("invalidIdCard").innerHTML =
            "Please enter valid ID card!";
        return false;
    }
    if (idCard.length != 9) {
        document.getElementById("invalidIdCard").innerHTML =
            "ID card must have 9 characters!";
        return false;
    }
    document.getElementById("invalidIdCard").innerHTML = "";
    return true;
};

const sendEmail = (email, userName, account, password) => {
    var confirm = {
        email: email,
        userName: userName,
        account: account,
        password: password,
    };
    emailjs.send("Confirm", "template_0kz444p", confirm);
};

flatpickr("#birthday", {
    maxDate: "today",
    altFormat: "F j, Y",
    dateFormat: "d-m-Y",
});