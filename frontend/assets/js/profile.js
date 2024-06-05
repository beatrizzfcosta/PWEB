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
        const dronesMadeElement = document.getElementById("dronesMade");


        usernameElement.textContent = user.username;
        firstNameElement.textContent = user.firstName;
        lastNameElement.textContent = user.lastName;
        emailElement.textContent = user.email;
        dronesMadeElement.textContent = "10";

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


function saveProfilePicture() {
    if (profilePictureChanged) {
        // lógica para salvar a foto de perfil no servidor
        // Exemplo de mensagem de sucesso
        profilePictureChanged = false;
        alert('Foto de perfil salva com sucesso!');
        editButton.onclick = editProfilePicture;
    } else {
        // Exibe uma mensagem informando ao usuário que nenhuma foto foi alterada
        alert('Nenhuma alteração na foto de perfil para salvar.');
    }
}


function editProfile() {
    const fields = ['username', 'firstName', 'lastName', 'email', 'dronesMade'];
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


function saveProfile() {
    const fields = ['username', 'firstName', 'lastName', 'email', 'dronesMade'];
    fields.forEach(field => {
        let input = document.getElementById(`input-${field}`);
        let newValue = input.value;
        let span = document.createElement('span');
        span.id = field;
        span.innerText = newValue;
        input.parentNode.replaceChild(span, input);
    });

    let editButton = document.querySelector('.edit-btn');
    editButton.innerHTML = "<i class='bx bx-edit'></i> Edit Profile";
    editButton.onclick = editProfile; // Definido para voltar ao estado de edição

    // Remova esta linha caso não deseje exibir uma mensagem de sucesso
    alert('Profile saved successfully!');
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

