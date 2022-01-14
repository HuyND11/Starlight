const URL_API = "https://61bc10c1d8542f0017824531.mockapi.io/";
const user_Table = "users/";


const getOTP = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



const sendOTP = () => {
        email = document.getElementById('email').value;
        window.OTP = getOTP(1000, 9999);
        if (!checkValidateEmail())
            return;
        axios.get((`${URL_API}${user_Table}`)).then((res) => {
            var listAcc = res.data;
            for (i in listAcc) {
                if ((listAcc[i].email.includes(email))) {
                    console.log("Có nè");
                    if (listAcc[i].email == email) {
                        window.id = listAcc[i].id;
                        sendEmailOTP(email, listAcc[i].name, OTP)
                        document.getElementById('OTP').classList.add("show")
                        document.getElementById('OTP_input').classList.add("show")
                        document.getElementById('email').classList.add("hidden")
                        document.getElementById('email_input').classList.add("hidden")
                        return;
                    }
                    return;
                }
            }
            document.getElementById("invalidEmail").innerHTML = "Email address is not exist!";
        })
    }
    // console.log(OTP);



const checkOTP = () => {
    var OTP_input = document.getElementById('OTP').value;
    console.log(OTP_input);
    console.log(OTP);
    if (OTP_input == "") {
        document.getElementById("invalidOTP").innerHTML = "OTP must be filled out!";
        return false;
    }
    if (OTP_input != OTP) {
        document.getElementById("invalidOTP").innerHTML = "OTP wrong!";
        return false;
    }
    document.getElementById('invalidOTP').innerHTML = "";
    document.getElementById('OTP').classList.remove("show")
    document.getElementById('OTP_input').classList.remove("show")
    document.getElementById('NewPass').classList.add("show")
    document.getElementById('Reset_input').classList.add("show")
    return true;
}

const inputResetPassword = () => {
    var newPassword = document.getElementById("newPass")
    if (!checkValidatePassword) {
        axios.put(`${URL_API}${user_Table}${id}`, newPassword)
    }

}

const sendEmailOTP = (email, userName, OTP) => {
    var OTP = {
        email: email,
        userName: userName,
        OTP: OTP,
    }
    emailjs.send('OTP', 'template_85fhewo', OTP)
}

const checkValidateEmail = (email) => {
    var email = document.getElementById("email").value;
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email == "") {
        document.getElementById("invalidEmail").innerHTML = "Email address must be filled out!";
        return false;
    }
    if (!email.match(pattern)) {
        document.getElementById('invalidEmail').innerHTML = "Please enter valid email address!";
        return false;
    }
    document.getElementById('invalidEmail').innerHTML = "";
    return true;
}

const checkValidatePassword = () => {
    var password = document.getElementById("newPass").value;
    if (password == "") {
        document.getElementById("invalidNewPass").innerHTML = "Password must be filled out!";
        return false;
    }
    if (password.length < 4) {
        document.getElementById("invalidNewPass").innerHTML = "Password must have more 4 characters!";
        return false;
    }

    document.getElementById('invalidNewPass').innerHTML = "";
    return true;
}


document.getElementById('OTP').classList.add("hidden")
document.getElementById('OTP_input').classList.add("hidden")
document.getElementById('NewPass').classList.add("hidden")
document.getElementById('Reset_input').classList.add("hidden")