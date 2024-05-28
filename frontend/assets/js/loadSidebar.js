function loadSidebar() {
    const sidebarHTML = `
    <div class="container">
        <div class="sidebar">
            <div class="bar-icons">
                <a href="profile.html" class="icon-link profile-icon">
                    <img src="../assets/img/user-2.png" alt="User" class="icon profile-pic">
                    <span class="icon-text profile-text">Profile</span>
                </a>
                <a href="home.html" class="icon-link home-icon">
                    <img src="../assets/img/home-2.png" alt="Home" class="icon">
                    <span class="icon-text">Home</span>
                </a>
                <a href="inAssembly.html" class="icon-link assembled-icon">
                    <img src="../assets/img/mark-2.png" alt="Assembled" class="icon">
                    <span class="icon-text">In Assembly</span>
                </a>
                <a href="assembled.html" class="icon-link assemblying-icon">
                    <img src="../assets/img/time-2.png" alt="Assemblying" class="icon">
                    <span class="icon-text">Assembled</span>
                </a>
                <a href="storage.html" class="icon-link storage-icon">
                    <img src="../assets/img/storage-2.png" alt="Storage" class="icon">
                    <span class="icon-text">Storage</span>
                </a>
                <a href="models.html" class="icon-link models-icon">
                    <img src="../assets/img/fly.png" alt="Models" class="icon">
                    <span class="icon-text">Models</span>
                </a>
                <a href="stats.html" class="icon-link models-icon">
                    <img src="../assets/img/graph.png" alt="Stats" class="icon">
                    <span class="icon-text">Statistics</span>
                </a>
                <a href="index.html" class="icon-link logout-icon logout-link">
                    <img src="../assets/img/power-2.png" alt="Log out" class="icon">
                    <span class="icon-text">Log out</span>
                </a>
            </div>
        </div>
        <div id="sidebar-toggle">
            <img src="../assets/img/arrow.png" alt="Expandir" id="sidebar-toggle-icon">
        </div>
    </div>
    `;

    const sidebarCSS = `
    <style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #000;
        color: #fff;
    }
    .container {
        display: flex;
        align-items: center; 
    }
    .sidebar {
        height: 100%;
        width: 65px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #06347a;
        padding-top: 20px;
        overflow: hidden;
        transition: width 0.5s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    
    .sidebar.selected {
        width: 250px;
    }

    .profile {
        display: flex;
        align-items: center;
    }
    
    .profile-icon .icon {
        background-color: white;
        border-radius: 50%;
        padding: 5px;
    }
    
    .profile-pic {
        border-radius: 50%;
        background-color: #fff;
        transition: background-color 0.3s ease;
    }
    
    .profile-text {
        display: none;
        margin-left: 10px;
        color: transparent;
    }
    
    .sidebar:hover .profile-text {
        display: inline;
        color: white;
    }
    
    .sidebar a {
        text-decoration: none;
        font-size: 18px;
        display: flex;
        align-items: center;
        padding: 10px 10px;
        transition: background-color 0.5s, color 0.5s;
        color: transparent;
    }
    
    .sidebar:hover a {
        color: white;
    }

    .bar-icons img.icon {
        height: 30px;
        margin-right: 10px;
        margin-left: 10px;
        transition: transform 0.3s ease, content 0.3s ease;
        padding: 5px;
    }
    
    .bar-icons a:hover {
        transform: scale(1.1); /* Você pode ajustar o fator de escala conforme necessário */
    }
    
    /* Mantemos a cor do texto branca */
    .sidebar.selected .icon-text {
        color: white;
    }
    
    .icon-text {
        display: none;
        margin-left: 10px;
    }
   
    .sidebar:hover .icon-text {
        display: inline;
        display: none;
    }
    .sidebar.selected .icon-text {
        display: inline;
        color: white;
    }
    .profile-icon:hover .icon {
        content: url('../assets/img/user-2.png');
    }
    
    .home-icon:hover .icon {
        content: url('../assets/img/home-2.png');
    }
    
    .assembled-icon:hover .icon {
        content: url('../assets/img/mark-2.png');
    }
    
    .assemblying-icon:hover .icon {
        content: url('../assets/img/time-2.png');
    }
    
    .storage-icon:hover .icon {
        content: url('../assets/img/storage-2.png');
    }
    
    .logout-icon:hover .icon {
        content: url('../assets/img/power-2.png');
    }
    
    .logout-link {
        position: absolute;
        bottom: 20px;
        width: 100%;
        box-sizing: border-box;
    }
    
    .content {
        margin-left: 80px;
        padding: 20px;
    }
    
    #sidebar-toggle {
        transition: left 0.5s ease; 
        position: absolute;
        top: 50%;
        left: 65px;
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 1001; /* Garantir que a seta esteja acima da barra lateral */
    }
    
    #sidebar-toggle:hover #sidebar-toggle-icon {
        content: url('../assets/img/arrow-2.png');
    }
    
    #sidebar-toggle.selected #sidebar-toggle-icon {
        content: url('../assets/img/arrow-2.png');
        transform: scaleY(-1);
        
    }
    
    #sidebar-toggle-icon {
        width: 40px;
        height: 40px;
        transition: transform 0.3s;
    }
    
    .sidebar-expanded #sidebar-toggle-icon {
        transform: rotate(180deg);
    }
    
</style>

    `;
    
    document.getElementById('sidebar-container').innerHTML = sidebarHTML;
    document.head.insertAdjacentHTML('beforeend', sidebarCSS);

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggle.addEventListener('click', function() {
        this.classList.toggle('selected');
        sidebar.classList.toggle('selected');
        if (sidebar.classList.contains('selected')) {
            sidebarToggle.style.left = '250px';
        } else {
            sidebarToggle.style.left = '65px';
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSidebar);