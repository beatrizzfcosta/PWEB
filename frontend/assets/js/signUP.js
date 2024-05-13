let btn = document.getElementById('verSenha')
let btnConfirm = document.getElementById('verConfirmSenha')

let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let validNome = false;

let usuario = document.getElementById('username');
let validUsuario = false;

let email = document.getElementById('email');
let validEmail = false;

let senha = document.getElementById('password');
let validSenha = false;

let confirmSenha = document.getElementById('password-confirmation');
let validConfirmSenha = false;

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

