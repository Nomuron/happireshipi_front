import * as bootstrap from "bootstrap";
import * as model from "./admin_model.js";
import view from "./admin_view.js";
import * as model from "../html/admin_home_page.html"
import $ from "jquery";

// function login() {
//     var n = document.getElementById("login").value;
//     var p = document.getElementById("password").value;

//     var postObj = JSON.stringify({
//         "login": n,
//         "password": p
//     });

//     $.ajax({
//         url: "http://localhost:8080/admin", // endpoint
//         type: "POST",
//         data: postObj,
//         // contentType: "application/json; charset=utf-8",
//         success: function (result) {
//             console.log("Brawo - zalogowałeś się!")
//         },
//         error: function (errorData) { onError(errorData); }
//     });
// }
function login() {
    const login = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("DUPA");
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/admin");
    xhttp.setRequestHeader("login", login);
    xhttp.setRequestHeader("password", password);
    xhttp.send(null);
    console.log(xhttp.response);
    if(xhttp.response == true){
        // window.location.href = '/html/admin_home_page.html';
        location.assign("/html/admin_home_page.html");
    } else {
        console.log("Błędne dane administratora!");
        location.assign("/html/admin_home_page.html");
    }
}

// document.getElementById("login_btn").addEventListener('click', login("stefan", "Zuparomana#"));
$("#login_btn").click(login);