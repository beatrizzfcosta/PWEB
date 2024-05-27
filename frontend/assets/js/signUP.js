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

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirmation').value;
    const msgError = document.getElementById('msgError').value;
    const msgSuccess = document.getElementById('msgError').value;

    if (password !== confirmPassword) {
      msgError.innerText = 'Passwords do not match';
      return;
    }
  
    const user = {
      firstName,
      lastName,
      username,
      email,
      password
    };
  
    fetch('http://localhost:15000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'pending') {
        msgSuccess.innerText = 'Registration successful! Please verify your email.';
        msgError.innerText = '';
      } else {
        msgError.innerText = data.message;
        msgSuccess.innerText = '';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      msgError.innerText = 'An error occurred during registration';
      msgSuccess.innerText = '';
    });
  });
