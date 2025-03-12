// redirection directe vers la page d'accueil si utilisateur déjà connecté

document.addEventListener("DOMContentLoaded", () => {
    // Vérifier si un token est déjà stocké
    const token = localStorage.getItem("token");

    if (token) {
        // Rediriger directement vers index.html
        window.location.href = "index.html";
    }
});

// formulaire d'écoutes des entrées et envoie des données à l'API

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    console.log("loginForm trouvé :", loginForm);
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const errorMessage = document.querySelector("#error-message"); // Ajout du message d'erreur

    // Supprime le message d'erreur dès qu'on tape à nouveau les identifiants

    emailInput.addEventListener("input", () => {
    errorMessage.style.display = "none";
    });

    passwordInput.addEventListener("input", () => {
    errorMessage.style.display = "none";
    });

    if (!loginForm) {
        console.error("Erreur : Formulaire introuvable !");

    } else {
        console.log("Formulaire trouvé, écouteur attaché !");
    }

    loginForm.addEventListener("submit", async (event) => {
        console.log("submit capté");
        event.preventDefault(); // Empêche le rechargement de la page
        console.log("formulaire soumis");

        const userData = {
            email: emailInput.value,
            password: passwordInput.value
        };

        // Validation des champs

        if (!userData.email || !userData.password) {
            console.log("Email ou mot de passe vide.");
            errorMessage.textContent = "Veuillez remplir tous les champs.";
            errorMessage.style.color = "red";
            errorMessage.style.display = "block";
            return;
        }
        
        console.log("Données de connexion :", userData);

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });
            console.log("Requête envoyée, attente de la réponse...");

            const data = await response.json();
            console.log("Réponse reçue :", data);

            if (response.ok) {
                console.log("Connexion réussie !");
                // Stocker le token d'authentification dans le localStorage
                localStorage.setItem("token", data.token);
                console.log("Token stocké :", data.token);

                // Rediriger vers la page d'accueil
                window.location.href = "index.html";
            } else {
                console.log("Échec de connexion : Identifiants incorrects.");
                errorMessage.textContent = "identifiants incorrects.";
                errorMessage.style.display = "block"; // Afficher le message
            }
        } catch (error) {
            console.log("Erreur lors de la connexion :", error);
            errorMessage.textContent = "Erreur de connexion. Vérifie ton serveur.";
        }
    });
});
