var usernameElement = document.getElementById('username');
var passwordElement = document.getElementById('password');
var loginErrorAlertElement = document.getElementById('login-error-alert');
var loginSuccessAlertElement = document.getElementById('login-success-alert');



var users = [];
var userString = localStorage.getItem('users');

if(userString == null){

}else{
    users = JSON.parse(userString);
}

function onLogin(event){
    event.preventDefault();
    var username = usernameElement.value ;
    var password = passwordElement.value;

    var userLoggedIn = false;

    for(let i = 0; i < users.length; i++){
        const u = users[i];
        if(u.username === username && u.password === password){
            userLoggedIn = true;
            localStorage.setItem('logged-in-user-id',u.id);
            localStorage.setItem('logged-in-user-name',u.username);
            break;
        }
    }

    if(userLoggedIn){
        localStorage.setItem('show-success-login-message','');
        loginSuccessAlertElement.innerHTML = 'Melumatlar dogrudur';
        loginErrorAlertElement.style.display = 'none';
        loginSuccessAlertElement.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }else{
        localStorage.removeItem('logged-in-user-id');
        localStorage.removeItem('logged-in-user-name');
        loginErrorAlertElement.innerHTML = 'Melumatlar dogru deyil';
        loginErrorAlertElement.style.display = 'block';
    }
}