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


async function entrar() {
    var emailOrUsername = document.getElementById("email-username").value;
    var password = document.getElementById("password").value;
    var msgError = document.getElementById('msgError');
    var msgSuccess = document.getElementById('msgSuccess');

    if (emailOrUsername === "" || password === "") {
        msgError.innerText = "Por favor, preencha todos os campos.";
        msgSuccess.innerText = "";
        return;
    }

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailOrUsername, password: password })
        });

        const result = await response.json();

        if (response.ok) {
            msgError.innerText = "";
            msgSuccess.innerText = "Entrando...";
            // Salva o token no localStorage para usar em requisições futuras
            localStorage.setItem('token', result.token);
            window.location.assign("home.html");
        } else {
            msgError.innerText = result.message;
            msgSuccess.innerText = "";
        }
    } catch (error) {
        msgError.innerText = "Erro ao tentar fazer login. Tente novamente.";
        msgSuccess.innerText = "";
        console.error("Error during login:", error);
    }
}