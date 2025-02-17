// vérifie si l'utilisateur est connecté en récupérant le token dans le localStorage 

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const authButton = document.querySelector("#auth-button");

    if (authButton) {
        if (token) {
            authButton.addEventListener("click", () => {
                localStorage.removeItem("token"); // Supprime le token
                window.location.href = "login.html"; // Redirige vers la page de connexion
            });
        } else {
            authButton.textContent = "Se connecter";
            authButton.addEventListener("click", () => {
                window.location.href = "login.html"; // Redirige vers la page de connexion
            });
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector("#auth-link");

    // Vérifie si un token est présent dans le localStorage
    const token = localStorage.getItem("token");

    if (token) {
        // Si le token est trouvé, on change le texte du lien
        loginLink.textContent = "Logout";
        loginLink.setAttribute("href", "#"); // On remplace l'URL pour ne pas rediriger vers login.html
        loginLink.addEventListener("click", (event) => {
            event.preventDefault(); // Empêche le rediriger vers login.html

            // Supprime le token du localStorage pour déconnecter l'utilisateur
            localStorage.removeItem("token");

            // Redirige vers la page de connexion (login.html)
            window.location.href = "login.html";
        });
    } else {
        // Si aucun token n'est trouvé, le lien reste "Login"
        loginLink.textContent = "Login";
        loginLink.setAttribute("href", "login.html");
    }
});