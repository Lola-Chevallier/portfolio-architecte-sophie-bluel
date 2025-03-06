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
