// S'assurer que le script s'exécute une fois la page chargée, que tous les éléments sont bien présents dans le DOM

document.addEventListener("DOMContentLoaded", function () {
document.getElementById("button-add-photo").addEventListener("click", openAddProjectModal);
});

// Gérer la seconde modale 

const modalGallery = document.getElementById("modal");
modalGallery.style.display = "none";
const modalAddProject = document.getElementById("modal-add-project");
const backButton = document.getElementById("modal-arrow-left");
const closeButton = document.getElementById("close-modal");

export function openAddProjectModal() {
    if (!modalAddProject || !modalGallery) {
        console.error("Une des modales n'a pas été trouvée !");
        return;
    }

    modalAddProject.style.display = "block";
    

    // Retour à la première modale

    backButton.addEventListener("click", () => {
        modalAddProject.style.display = "none";
        modalGallery.style.display = "block";
    });

    // Fermeture modale-add-project

    closeButton.addEventListener("click", () => {
        modalAddProject.style.display = "none";
        modalGallery.style.display = "block";
    });    
}

// Fermer la modale si on clique en dehors du contenu

window.addEventListener("click", (event) => {
  if (modalAddProject && event.target === modalAddProject) {
    modalAddProject.style.display = "none";
    modal.style.display = "none";
    }
});


// Ajouter une photo 

const uploadButton = document.getElementById("upload-button");
const fileInput = document.getElementById("image-upload");
const uploadBox = document.getElementById("upload-box");

document.addEventListener("DOMContentLoaded", function () {

    // Empêcher l'ouverture du fichier si on clique ailleurs que sur le bouton dans label
        //uploadBox.addEventListener("click", function (event) {
        //if (event.target.id !== "upload-button") {
           // event.preventDefault();
        //}
    //});

    uploadButton.addEventListener("click", function (event) {
        event.stopPropagation(); // empêche le clic de se proprager au label 
        fileInput.click(); // Ouvre l'explorateur de fichiers
    });

    fileInput.addEventListener("change", function () {
      if (fileInput.files.length > 0) {
          console.log("Fichier sélectionné :", fileInput.files[0]); // Affiche le fichier sélectionné dans la console
        }
    });
});


// Afficher la photo en miniature 

    uploadBox.addEventListener("click", function () {
    });

fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
          const preview = document.getElementById("preview-image");
          const uploadButton = document.getElementById("upload-button")
          preview.src = e.target.result;
          preview.style.maxWidth = "30%";
          preview.style.display = "block"; // Affiche l’image
          uploadButton.style.display = "none"; // cache le bouton 

          document.getElementById("upload-box").appendChild(preview);
      };

      reader.readAsDataURL(file);
    }
});

// afficher les catégories

// récupération des catégories

import { fetchCategories } from "./api-categories.js"; // Importer la fonction fetch du fichier api-categories.js

const categorySelect = document.getElementById("category-add-project");

// création de populateCategory pour ajouter les catégories dans select

async function populateCategories() {

try {
const categories = await fetchCategories();

categories.forEach(category => {
const option = document.createElement("option");
option.value = category.id; // ID de la catégorie
option.textContent = category.name; // Nom de la catégorie
categorySelect.appendChild(option);
});
}
catch (error) {
console.error("Erreur lors du remplissage des catégories :", error);
}
};

// Appeler la fonction au chargement de la modale

document.addEventListener("DOMContentLoaded", populateCategories);

// vérifier que tous les champs sont remplis pour que le bouton valider soit cliquable

// sélection des élements

const titleInput = document.getElementById("title-new-project");
const submitButton = document.getElementById("button-valid-add-photo");

//Fonction qui vérifie que tous les champs sont remplis

function checkFormValidity() {
if (fileInput.files.length > 0 && titleInput.value.trim() !== "" && categorySelect.value !== "") {
submitButton.disabled = false; // Active le bouton
submitButton.style.backgroundColor = "#1D6154"; // Change la couleur du bouton
} else {
submitButton.disabled = true; // Désactive le bouton
submitButton.style.backgroundColor = "#A7A7A7"; // Reste grisé
}
}

// Ajout des écouteurs d'événements sur les champs

fileInput.addEventListener("change", checkFormValidity);
titleInput.addEventListener("input", checkFormValidity);
categorySelect.addEventListener("change", checkFormValidity);

// Désactiver le bouton au chargement
submitButton.disabled = true;
submitButton.style.backgroundColor = "#A7A7A7";


// envoi du projet à l'API "Send a new project"


async function sendNewProject() {

const token = localStorage.getItem("token"); // Récupérer le token dynamiquement
console.log("Token récupéré :", token);

const formData = new FormData();
formData.append("image", fileInput.files[0]);
formData.append("title", titleInput.value.trim());
formData.append("category", categorySelect.value);

try {
const response = await fetch("http://localhost:5678/api/works", {
method: "POST",
headers: {
"Authorization": `Bearer ${token}`, // Envoie du token ici
"Accept": "application/json",
},
body: formData,
});
console.log("Requête envoyée avec token :", token);

if (response.ok) {
console.log("Projet ajouté avec succès !");

// Optionnel : Met à jour l'affichage des projets après ajout
// fetchProjects();

// Réinitialisation du formulaire
fileInput.value = "";
titleInput.value = "";
categorySelect.value = "";
submitButton.disabled = true;
submitButton.style.backgroundColor = "#A7A7A7"; // Remet le bouton en gris

// Fermer la modale
modalAddProject.style.display = "none";

} else {
console.error("Erreur lors de l'ajout du projet :", response.statusText);
}
} catch (error) {
console.error("Erreur réseau :", error);
}
}

// écouteur d'évènement sur "valider"

submitButton.addEventListener("click", function () {
if (!submitButton.disabled) {
sendNewProject();
}
});
