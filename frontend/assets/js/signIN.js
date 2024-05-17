var msgError = document.getElementById('msgError')
var msgSuccess = document.getElementById('msgSuccess')

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

function entrar(){
    var username = document.getElementById("email-username").value;
    var password = document.getElementById("password").value;
    console.log("Usuário:", username);
    console.log("Senha:", password); 
    alert("Entrando");
}
