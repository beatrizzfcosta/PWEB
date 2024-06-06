let profilePictureChanged = false;


async function getUser() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found in local storage');
        }

        const response = await fetch('http://localhost:15000/user', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch components');
        }

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error('Error fetching components:', error);
    }
}
async function fetchUser() {
    try {
        const user = await getUser();
        if (user) {
             showUserDetails(user);
        }
    } catch (error) {
        console.error('Error fetching components:', error);
    }
}
 function showUserDetails(user) {

        const usernameElement = document.getElementById("username");
        const firstNameElement = document.getElementById("firstName");
        const lastNameElement = document.getElementById("lastName");
        const emailElement = document.getElementById("email");
        const profileImage = document.querySelector('.profile-picture');

        usernameElement.textContent = user.username;
        firstNameElement.textContent = user.firstName;
        lastNameElement.textContent = user.lastName;
        emailElement.textContent = user.email;
        profileImage.src = "../../backend/database/uploads/" + user.image;

}

function editProfilePicture() {
    // Seleciona o input de arquivo
    const input = document.getElementById('profile-image-upload');

    // Adiciona um listener para quando o usuário selecionar um arquivo
    input.addEventListener('change', function(event) {
        // Obtém o arquivo selecionado
        const file = event.target.files[0];

        // Verifica se o arquivo é uma imagem
        if (file && file.type.startsWith('image/')) {
            // Cria um objeto URL para a imagem selecionada
            const imageURL = URL.createObjectURL(file);
            console.log(imageURL)
            // Seleciona a imagem de perfil e atualiza o src
            const profileImage = document.querySelector('.profile-picture');
            profileImage.src = imageURL;

            // Atualiza o botão de editar para exibir "Salvar"
            const editButton = document.querySelector('.edit-picture-btn');
            editButton.innerHTML = "<i class='bx bx-save'></i> Save Profile Picture";
            editButton.onclick = saveProfilePicture; // Define o evento onclick para salvar a foto de perfil
            profilePictureChanged = true;
        } else {
            alert('Por favor, selecione um arquivo de imagem válido.');
        }
    });

    // Simula o clique no input de arquivo para abrir a janela de seleção de arquivo
    input.click();
}

document.getElementById('profile-image-upload').onchange = function() {
    profilePictureChanged = true;
};
async function saveProfilePicture() {
    const profilePictureInput = document.getElementById('profile-image-upload');

    if (profilePictureInput.files.length === 0) {
        alert('Please select a profile picture to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('image', profilePictureInput.files[0]);
    console.log(formData)
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found in local storage');
        }

        const response = await fetch('http://localhost:15000/user/image', {
            method: 'PATCH',
            headers: {
                'Authorization': token

            },
            body: formData
        });

        const result = await response.json();
        console.log(result.data);
        if (response.ok) {
            alert('Profile picture saved successfully!');
            document.getElementById('profile-picture').src = result.user.image;
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
}


function editProfile() {
    const fields = ['username', 'firstName', 'lastName', 'email'];
    fields.forEach(field => {
        let element = document.getElementById(field);
        let currentValue = element.innerText;
        let input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.id = `input-${field}`;
        element.parentNode.replaceChild(input, element);
    });

    let editButton = document.querySelector('.edit-btn'); // Corrigido para '.edit-btn'
    editButton.innerHTML = "<i class='bx bx-save'></i> Save Profile";
    editButton.onclick = saveProfile;
}


async function saveProfile() {
    const fields = ['username', 'firstName', 'lastName', 'email'];
    const newData = {};
    fields.forEach(field => {
        let input = document.getElementById(`input-${field}`);
        let newValue = input.value;
        let span = document.createElement('span');
        span.id = field;
        span.innerText = newValue;
        input.parentNode.replaceChild(span, input);
        newData[field] = newValue; // Store the updated field value
    });

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found in local storage');
        }

        const response = await fetch('http://localhost:15000/user', {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData) // Send the updated data to the server
        });

        if (!response.ok) {
            throw new Error('Failed to save profile');
        }

        // Remova esta linha caso não deseje exibir uma mensagem de sucesso
        alert('Profile saved successfully!');

    } catch (error) {
        console.error('Error saving profile:', error);
        // Provide error feedback to the user if necessary
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchUser();
    const ctx = document.getElementById('projectChart').getContext('2d');
    const projectChart = new Chart(ctx, {
        type: 'line', // Altera o tipo de gráfico para linha
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Projects',
                data: [5, 3, 7, 2, 8, 4, 6, 3, 5, 4, 7, 9], // Quantidade de projetos feitos em cada mês
                backgroundColor: 'rgba(76, 100, 136, 0.2)',
                borderColor: '#4c6488',
                borderWidth: 1,
                fill: true, // Preencher a área abaixo da linha
                tension: 0.4 // Ajusta a curvatura da linha
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                filler: {
                    propagate: false // Desativa a propagação do preenchimento para personalizar o preenchimento
                }
            }
        }
    });
});

