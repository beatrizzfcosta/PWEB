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
function entrar() {
    var username = document.getElementById("email-username").value;
    var password = document.getElementById("password").value;
    var msgError = document.getElementById('msgError');
    var msgSuccess = document.getElementById('msgSuccess');

    console.log("Username:", username); // Check if username is retrieved correctly
    console.log("Password:", password); // Check if password is retrieved correctly
    console.log("Error Message Element:", msgError); 

     // Check if any field is empty
     if (username === "" || password === "") {
        msgError.innerText = "Por favor, preencha todos os campos.";
        msgSuccess.innerText = "";
        console.log("Error Message Text:", msgError.innerText); // Check if error message text is set
        return; // Exit the function early
    }

    // Check if the username and password match the specified criteria
    if (username === "beatriz" && password === "12345678") {
        console.log("Usuário:", username);
        console.log("Senha:", password);
        msgError.innerText = "";
        msgSuccess.innerText = "Entrando...";
        // Redirect to home page
        window.location.assign("home.html");
    } else {
        msgError.innerText = "Credenciais inválidas. Por favor, tente novamente.";
        msgSuccess.innerText = "";
        console.log("Error Message Text:", msgError.innerText); // Check if error message text is set

    }
}
