
const init = function () {
    if(document.getElementById("login_btn") != null){
        document.getElementById("login_btn").addEventListener("click", function(){
            const login = document.getElementById("login").value;
            const password = document.getElementById("password").value;
            
            fetch("http://localhost:8080/admin",{
                method:"POST",
                headers:{
                    "login": login,
                    "password": password
                },
                redirect: 'follow',
                contentType: "application/json; charset=utf-8",
                body:null
            }).then((response) => { response.json().then(data => {
                if(data==true){
                    window.location.href = '/html/admin_home_page.html';
                } else {
                    document.getElementById("login_message").innerHTML = "Logowanie nie powiodło się";
                }
                });
            }).catch(err => {
                console.log(err);
            });
        });
    }
}
init();