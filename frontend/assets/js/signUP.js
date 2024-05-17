let validNome = false;

let validUsuario = false;

let validEmail = false;

let validSenha = false;

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

function registar() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var usuario = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('password').value;
    var confirmSenha = document.getElementById('password-confirmation').value;

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
    console.log("Senha confirmada:", confirmSenha);
    alert("Registando");
}

