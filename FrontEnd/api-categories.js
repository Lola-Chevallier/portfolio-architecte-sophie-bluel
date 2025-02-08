// Envoi d'une requête API get categories (fichier app.js ligne 24)

console.log("Fetching categories...");
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    console.log("Categories fetched:", data);
  })
  .catch((error) => console.error("Fetch error:", error));


// Réupération des catégories

async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const categories = await response.json();
    console.log(categories);
    return categories;

  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
}

fetchCategories()
    .then(categories => {
    displayCategories(categories);
  });

// Affichage des catégories sous forme de boutons

function displayCategories(categories) {
    console.log("Affichage des catégories...");
    const categoriesContainer = document.getElementById("filters");
    
// Bouton "Tous"

    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.dataset.categoryId = "all";
    categoriesContainer.appendChild(allButton);
    console.log("Bouton 'Tous' ajouté");

    allButton.addEventListener("click", () => {
        console.log("Bouton 'Tous' cliqué, affichage de tous les projets");
        displayProjects(projects);
    });

// Boutons des autres catégories

    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.dataset.categoryId = category.id;
        categoriesContainer.appendChild(button);
        console.log(`Bouton '${category.name}' ajouté`);

        button.addEventListener("click", () => {
            console.log(`Bouton '${category.name}' cliqué, filtrage des projets`);
            filterProjectsByCategory(category.id);
        });
    });
}

// Filtrage des projets selon la catégorie sélectionnée

async function filterProjectsByCategory(categoryId) {
    console.log("Données API reçues :", projects);
    
    const filteredProjects = projects.filter(project => project.categoryId == categoryId);
    console.log("Projets filtrés :", filteredProjects);

    displayProjects(filteredProjects);
}

// Fonction d'affichage des projets

function displayProjects(projects) {
    console.log("Affichage des projets...");
    const projectsContainer = document.getElementById("portfolio");
    projectsContainer.innerHTML = ""; // On vide le conteneur avant d'afficher les projets filtrés

    projects.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.textContent = project.title;
        projectsContainer.appendChild(projectElement);
    });
}

// Lancement de la récupération des catégories
fetchCategories();