// formulaire d'écoutes des entrées et envoie des données à l'API

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const errorMessage = document.querySelector("#error-message");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        const userData = {
            email: emailInput.value,
            password: passwordInput.value
        };

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                // Stocker le token d'authentification dans le localStorage
                localStorage.setItem("token", data.token);
                // Rediriger vers la page d'accueil
                window.location.href = "index.html";
            } else {
                errorMessage.textContent = "Identifiants incorrects.";
                errorMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            errorMessage.textContent = "Erreur de connexion. Vérifie ton serveur.";
        }
    });
});