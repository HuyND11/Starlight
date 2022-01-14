var content = "";
var price = 0;
addition = () => {
    var add = document.querySelector(".result_quantity").innerHTML;
    add++;
    price = add * 70000;
    document.querySelector(".total_ticket p").innerHTML = price + " vnđ";
    document.querySelector(".result_quantity").innerHTML = add;
};
subtraction = () => {
    var sub = document.querySelector(".result_quantity").innerHTML;
    if (sub != 0) {
        sub--;
        price = sub * 70000;
        document.querySelector(".result_quantity").innerHTML = sub;
        document.querySelector(".total_ticket p").innerHTML = price + " vnđ";
    }
};
next_step = () => {
    localStorage.setItem(
        "combo",
        document.querySelector(".total_ticket p").innerHTML
    );
    window.location.assign("../html/Step3.html");
    // console.log(111);
};