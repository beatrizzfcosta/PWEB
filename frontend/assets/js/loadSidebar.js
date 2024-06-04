
function loadSidebar() {
    // Add styles

    const boxiconsLink = document.createElement('link');
    boxiconsLink.href = 'https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css';
    boxiconsLink.rel = 'stylesheet';
    document.head.appendChild(boxiconsLink);


    const logoImage = new Image();
    logoImage.src = '../assets/img/logo.png';
    logoImage.alt = 'Logo';


    const style = document.createElement('style');
    style.innerHTML = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            :root {
                --body-color: #9fb3c8;
                --sidebar-color: #FFF;
                --primary-color: #4c6488;
                --primary-color-light: #9fb3c8;
                --toggle-color: #d0d0d0;
                --text-color: #707070;
                --tran-03: all 0.3s ease;
                --tran-04: all 0.3s ease;
                --tran-05: all 0.3s ease;
            }
            
            ::selection {
                background-color: var(--primary-color);
                color: #fff;
            }
            body.dark {
                --body-color: #18191a;
                --sidebar-color: #242526;
                --primary-color: #3a3b3c;
                --primary-color-light: #3a3b3c;
                --toggle-color: #fff;
                --text-color: #ccc;
            }
            .sidebar {
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: 250px;
                padding: 10px 14px;
                background: var(--sidebar-color);
                transition: var(--tran-05);
                z-index: 100;
            }
            .sidebar.close {
                width: 100px;
            }
            .sidebar li {
                height: 50px;
                list-style: none;
                display: flex;
                align-items: center;
            }
            .sidebar header .image,
            .sidebar .icon {
                min-width: 60px;
                border-radius: 6px;
            }
            .sidebar .icon {
                min-width: 60px;
                border-radius: 6px;
                margin-left: 7px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 25px;
            }
            .sidebar .text,
            .sidebar .icon {
                color: var(--text-color);
                transition: var(--tran-03);
            }
            .sidebar .text {
                font-size: 17px;
                font-weight: 500;
                white-space: nowrap;
                opacity: 1;
            }
            .sidebar.close .text {
                opacity: 0;
            }
            .sidebar header {
                position: relative;
            }
            .sidebar header .logo-text {
                display: flex;
                flex-direction: column;
            }
            .sidebar header .image {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .sidebar header .image img {
                width: 100px;
                transition: var(--tran-05);
            }
            .sidebar.open header .image img {
                width: 150px;
            }
            .sidebar.open .menu-bar {
                height: calc(100% - 125px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                overflow-y: scroll;
            }
            .sidebar header .toggle {
                position: absolute;
                top: 50%;
                right: -25px;
                transform: translateY(-50%) rotate(180deg);
                height: 25px;
                width: 25px;
                background-color: var(--primary-color);
                color: var(--sidebar-color);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                cursor: pointer;
                transition: var(--tran-05);
            }
            body.dark .sidebar header .toggle {
                color: var(--text-color);
            }
            .sidebar.close .toggle {
                transform: translateY(-50%) rotate(0deg);
            }
            .sidebar li a {
                list-style: none;
                height: 100%;
                background-color: transparent;
                display: flex;
                align-items: center;
                height: 100%;
                width: 100%;
                border-radius: 6px;
                text-decoration: none;
                transition: var(--tran-03);
            }
            .sidebar li a:hover {
                background-color: var(--primary-color);
            }
            .sidebar li a:hover .icon,
            .sidebar li a:hover .text {
                color: var(--sidebar-color);
            }
            body.dark .sidebar li a:hover .icon,
            body.dark .sidebar li a:hover .text {
                color: var(--text-color);
            }
            .sidebar .menu-bar {
                height: calc(100% - 90px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                overflow-y: scroll;
            }
            .menu-bar::-webkit-scrollbar {
                display: none;
            }
            .sidebar .menu-bar .mode {
                border-radius: 6px;
                background-color: var(--primary-color-light);
                position: relative;
                transition: var(--tran-05);
            }
            .menu-bar .mode .sun-moon {
                height: 50px;
                width: 60px;
            }
            .mode .sun-moon i {
                position: absolute;
            }
            .mode .sun-moon i.sun {
                opacity: 0;
            }
            body.dark .mode .sun-moon i.sun {
                opacity: 1;
            }
            body.dark .mode .sun-moon i.moon {
                opacity: 0;
            }
            .menu-bar .bottom-content .toggle-switch {
                position: absolute;
                right: 5px;
                height: 100%;
                min-width: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                cursor: pointer;
            }
            .toggle-switch .switch {
                position: relative;
                height: 22px;
                width: 40px;
                border-radius: 25px;
                background-color: var(--toggle-color);
                transition: var(--tran-05);
            }
            .switch::before {
                content: '';
                position: absolute;
                height: 15px;
                width: 15px;
                border-radius: 50%;
                top: 50%;
                left: 5px;
                transform: translateY(-50%);
                background-color: var(--sidebar-color);
                transition: var(--tran-04);
            }
            body.dark .switch::before {
                left: 20px;
            }
            body.dark .home .text {
                color: var(--text-color);
            }
            #home {
                position: absolute; /* Torna o elemento absoluto para cobrir toda a página */
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--body-color); /* Define a cor de fundo da página */
                transition: var(--tran-05); 
            }
            #home .text {
                font-size: 30px;
                font-weight: 500;
                color: var(--text-color); /* Define a cor do texto */
            }
            body.dark .home .text {
                color: var(--text-color);
            }
        `;
    document.head.appendChild(style);

    // Create sidebar HTML
    const sidebarHTML = `
            <nav class="sidebar close">
                <header>
                    <div class="image-text">
                         <span class="image">
                        <img src="${logoImage.src}" alt="${logoImage.alt}">
                    </span>
                    </div>
                    <i class='bx bx-chevron-right toggle'></i>
                </header>
                <div class="menu-bar">
                    <div class="menu">
                        <ul class="menu-links">
                            <li class="nav-link">
                                <a href="profile.html">
                                    <i class='bx bx-user icon'></i>
                                    <span class="text nav-text">Profile</span>
                                </a>
                            </li>
                            <li class="nav-link">
                                <a href="home.html">
                                    <i class='bx bx-home icon'></i>
                                    <span class="text nav-text">Assembled</span>
                                 </a>
                             </li>
                            <li class="nav-link">
                                <a href="inAssembly.html">
                                    <i class='bx bx-task icon'></i>
                                    <span class="text nav-text">In Assembly</span>
                                </a>
                            </li>
                            <li class="nav-link">
                                <a href="assembled.html">
                                    <i class='bx bx-time icon'></i>
                                    <span class="text nav-text">Assembled</span>
                                </a>
                            </li>
                            <li class="nav-link">
                                <a href="storage.html">
                                    <i class='bx bx-archive icon'></i>
                                    <span class="text nav-text">Storage</span>
                                </a>
                            </li>
                            <li class="nav-link">
                                <a href="models.html">
                                    <i class='bx bx-grid-alt icon'></i>
                                    <span class="text nav-text">Models</span>
                                </a>
                            </li>
                            <li class="nav-link">
                                <a href="stats.html">
                                    <i class='bx bx-bar-chart icon'></i>
                                    <span class="text nav-text">Analytics</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="bottom-content">
                        <li>
                            <a href="#">
                                <i class='bx bx-log-out icon'></i>
                                <span class="text nav-text">Logout</span>
                            </a>
                        </li>
                        <li class="mode">
                            <div class="sun-moon">
                                <i class='bx bx-moon icon moon'></i>
                                <i class='bx bx-sun icon sun'></i>
                            </div>
                            <span class="mode-text text">Dark mode</span>
                            <div class="toggle-switch">
                                <span class="switch"></span>
                            </div>
                        </li>
                    </div>
                </div>
            </nav>
            <section id="home" class="home">
            </section>
        `;
    document.body.innerHTML += sidebarHTML;


    const body = document.body;
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark');
        body.classList.remove('light');
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
    }

    // Add script functionality
    const sidebar = document.querySelector('.sidebar'),
        toggle = document.querySelector(".toggle"),
        modeSwitch = document.querySelector(".toggle-switch"),
        modeText = document.querySelector(".mode-text");

    if (body.classList.contains('dark')) {
        modeText.innerText = 'Light mode';
    }

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
        sidebar.classList.toggle('open');
        const menuLinks = document.querySelectorAll('.menu-links li');
        menuLinks.forEach(link => {
            link.classList.toggle('hide-text');
        });
    });

    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
        body.classList.toggle("light");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
            localStorage.setItem('darkMode', 'enabled');
        } else {
            modeText.innerText = "Dark mode";
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}




// Call the function to create the sidebar
loadSidebar()
