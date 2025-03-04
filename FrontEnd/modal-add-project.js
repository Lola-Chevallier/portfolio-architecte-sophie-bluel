// S'assurer que le script s'exécute une fois la page chargée, que tous les éléments sont bien présents dans le DOM

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button-add-photo").addEventListener("click", openAddProjectModal);
});

// Gérer la seconde modale 

export function openAddProjectModal() {
    const modalGallery = document.getElementById("modal");
    modalGallery.style.display = "none";
    const modalAddProject = document.getElementById("modal-add-project");
    const backButton = document.getElementById("back-button");

    if (!modalAddProject || !modalGallery) {
        console.error("Une des modales n'a pas été trouvée !");
        return;
    }

    modalAddProject.style.display = "block";

    // Retour à la première modale*

    backButton.addEventListener("click", () => {
        modalAddProject.style.display = "none";
        modalGallery.style.display = "block";
    });
}