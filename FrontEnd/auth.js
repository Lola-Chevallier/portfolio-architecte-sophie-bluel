console.log("auth.js chargé !");

// vérifie si l'utilisateur est connecté en récupérant le token dans le localStorage 

document.addEventListener("DOMContentLoaded", () => {
    console.log("Le DOM est chargé !");
    const loginLink = document.querySelector("#auth-link");
    console.log("loginLink trouvé :", loginLink);
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

// Sélection des éléments necessaires 
document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector("#auth-link");
    const editionMode  = document.querySelector("#edition-mode");
    const filters = document.querySelector("#filters")
    const modifFilters = document.querySelector("#modif-filters")

    if (!loginLink) {
        console.log("L'élément #auth-link est introuvable dans le DOM !");
        return; // Stoppe l'exécution du script ici pour éviter l'erreur

    }

    // Vérifie si un token est présent dans le localStorage
    const token = localStorage.getItem("token");

    if (token) {

        // on fait disparaître les filtres et apparaître "modifier"
        if (filters) filters.style.display = "none";
        if(modifFilters) modifFilters.style.display = "flex"
        // on fait apparaître la barre du mode édition 
        if (editionMode) editionMode.style.display = "flex";

        // Si le token est trouvé, on change le texte du lien (login en lougout)
        loginLink.textContent = "Logout";
        loginLink.setAttribute("href", "#"); // On remplace l'URL pour ne pas rediriger vers login.html
        loginLink.addEventListener("click", (event) => {
            event.preventDefault(); // Empêche la redirection vers login.html

            // Supprime le token du localStorage pour déconnecter l'utilisateur
            localStorage.removeItem("token");

            // Redirige vers la page de connexion (login.html)
            window.location.href = "login.html";
        });
    } else {
        //si aucun token trouvé, laisser les filtres et retirer "modifier"
        if (filters) filters.style.display = "flex";
        if (modifFilters) modifFilters.style.display = "none"
        //si aucun token trouvé, cacher la barre du mode édition 
        if (editionMode) editionMode.style.display = "none";

        // Si aucun token n'est trouvé, le lien reste "Login"
        loginLink.textContent = "Login";
        loginLink.setAttribute("href", "login.html");
    }
});