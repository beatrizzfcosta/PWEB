let validName = false;

let validUser = false;

let validEmail = false;

let validPassword = false;

let validConfirmPassword = false;

let msgError = document.getElementById('msgError')
let msgSuccess = document.getElementById('msgSuccess')

function togglePasswordVisibility(inputId, icon) {
    var input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function register() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var user = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('password-confirmation').value;

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("User:", user);
    console.log("Password:", password);
    console.log("Confirmed password:", confirmPassword);
    alert("Verifying requirements, please wait...");
}

