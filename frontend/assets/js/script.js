document.addEventListener('DOMContentLoaded', function () {
    var welcomeText = "Welcome to Drone Assembly";
    var descriptionText = "Your Platform for Managing Drone Assembly.";
    var typingElement = document.getElementById('welcome');
    var descriptionElement = document.getElementById('description');

    // Função para exibir texto gradualmente
    function typeWriter(text, element) {
        var i = 0;
        var speed = 100; // Velocidade de digitação (milissegundos)

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Iniciar o efeito de digitação
    typeWriter(welcomeText, typingElement);
    typeWriter(descriptionText, descriptionElement);
});

document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('container');
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 1;

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    var directionalLight1 = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight1.position.set(0, 10, 7.5);
    scene.add(directionalLight1);

    var directionalLight3 = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight3.position.set(0, -1, -2);
    scene.add(directionalLight3);

    var loader = new THREE.GLTFLoader();
    loader.load('../assets/components/drone-scene.gltf', function (gltf) {
        var model = gltf.scene;
        model.position.x += 0.15;
        model.position.y += 1.5;
        scene.add(model);

        var mouseX = 0;
        var mouseY = 0;
        var targetRotationX = 0;
        var targetRotationY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 2;
            mouseY = (event.clientY - windowHalfY) / 2;
        }

        function animate() {
            requestAnimationFrame(animate);

            const containerRect = container.getBoundingClientRect();
            const headerRect = header.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();

            const minCameraY = (-180 + headerRect.height) / containerRect.height * 10;
            const maxCameraY = (containerRect.height - footerRect.height) / containerRect.height * 10;

            if (camera.position.y < minCameraY) {
                camera.position.y = minCameraY;
            } else if (camera.position.y > maxCameraY) {
                camera.position.y = maxCameraY;
            }

            targetRotationX = mouseX * 0.01;
            targetRotationY = mouseY * 0.01;

            model.rotation.y += (targetRotationX - model.rotation.y) * 0.05;
            camera.position.y += (targetRotationY - camera.position.y) * 0.05;

            renderer.render(scene, camera);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
        }

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);

        animate();
    });

});


