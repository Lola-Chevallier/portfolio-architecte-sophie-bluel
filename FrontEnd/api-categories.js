// Récupération des catégories

export const categories = await fetchCategories();
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

displayCategories(categories);

// Affichage des catégories sous forme de boutons

function displayCategories(categories) {
    console.log("Affichage des catégories...");
    const categoriesContainer = document.getElementById("filters");
    
// Bouton "Tous"

    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.dataset.categoryId = "all";
    allButton.id = "all"
    allButton.classList.add("active", "button-filters") 
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
        button.classList.add("button-filters")
        categoriesContainer.appendChild(button);
        console.log(`Bouton '${category.name}' ajouté`);

        button.addEventListener("click", () => {
            console.log(`Bouton '${category.name}' cliqué, filtrage des projets`);
            filterProjectsByCategory(category.id);
            document.querySelector("#all").classList.remove("active")
        });
    });
}

// Filtrage des projets selon la catégorie sélectionnée

async function filterProjectsByCategory(categoryId) {
    console.log("Données API reçues :", projects);

    if (!projects || projects.length === 0) {
        console.error("Erreur : Aucun projet disponible !");
        return;
    }

    const filteredProjects = projects.filter(project => {
        console.log("comparaison :", project.categoryId, "==", categoryId);
        return project.categoryId == Number(categoryId); // On convertit bien categoryId en nombre
    });

    console.log("Projets filtrés :", filteredProjects);
    displayProjects(filteredProjects);
}

