// Envoi d'une requête sur API get works (fichier app.js pour trouver le bon lien pour worksRoute ligne 25 )
fetch("http://localhost:5678/api/works");

// Récupération dynamique des projets dans gallery

async function fetchProjects() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        console.log("réponse de l\API", response);

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const projects = await response.json();
        console.log("projets récupérés:", projects);
        displayProjects(projects)

    }

    catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
    }
}

function displayProjects(projects) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // On vide la galerie avant d'ajouter les projets

    projects.forEach(project => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = project.imageUrl;
        img.alt = project.title;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = project.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

// Appelle la fonction pour charger les projets au chargement de la page
fetchProjects();