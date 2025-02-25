// Récupération des projets dans la modale 

function displayProjectsInModal(projects) {
    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = ""; // On vide la galerie de la modale avant d'ajouter les projets 
  
    projects.forEach((project) => {
      const figure = document.createElement("figure");
      figure.classList.add("modal-project");
      figure.dataset.id = project.id; // Ajout de l'ID du projet ici

      const img = document.createElement("img");
      img.src = project.imageUrl;
      img.alt = project.title;
      img.classList.add("modal-thumbnail"); // ajout d'une classe CSS pour la mise en page

      // Ajout d'une classe CSS pour mieux gérer le style des miniatures
      figure.classList.add("modal-project");
  
      const deleteButton = document.createElement("button"); 
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // Icône poubelle 
      deleteButton.classList.add("delete-button");
      deleteButton.dataset.id = project.id; // Stocker l'ID du projet
  
      figure.appendChild(img);
      figure.appendChild(deleteButton); // Ajoute le bouton de suppression à la modale
      modalGallery.appendChild(figure);
    });
  }

// Fonction pour supprimer un projet

async function deleteWork(workId) {
    const token = localStorage.getItem("token"); // Récupérer le token dynamiquement

    if (!token) {
        console.error("Erreur : aucun token trouvé !");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            console.log("Projet supprimé !");
            document.querySelector(`.modal-project[data-id='${workId}']`).remove(); // Suppression de l'élément du DOM
            document.querySelector(`.gallery [data-id='${workId}']`)?.remove(); // Supprime dans la galerie d'accueil
            fetchProjects(); // Rafraîchir la galerie

        } else {
            console.log("Erreur lors de la suppression :", response.status);
        }
        
    } catch (error) {
        console.log("Erreur réseau :", error);
    }
}

// écouteur d'événement pour le bouton de suppression

document.querySelector(".modal-gallery").addEventListener("click", (event) => {
    if (event.target.closest(".delete-button")) { // Vérifie si on clique sur un bouton de suppression
        const workId = event.target.closest(".modal-project")?.dataset.id; // Récupérer l'ID du projet
        console.log("ID du projet récupéré :", workId);
        console.log(`Suppression demandée pour le projet ID: ${workId}`);
        deleteWork(workId);
    }
});

document.querySelector(".open-modal-button").addEventListener("click", () => {
    displayProjectsInModal(projects);
  });

// Gérer l'ouverture et la fermeture de la modale 

const modal = document.getElementById("modal");
const openModalButton = document.querySelector(".open-modal-button"); // Bouton pour ouvrir la modale
const closeModalButton = document.querySelector(".close-modal");

openModalButton.addEventListener("click", () => {
  displayProjectsInModal(projects); // Charger les projets au moment de l'ouverture
  modal.style.display = "block"; // Afficher la modale
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none"; // Fermer la modale
});

// Fermer la modale si on clique en dehors du contenu

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
  

