import { fetchGallery } from './apifetch.js'
import { ModaleAddWork } from './modal-add-works.js'
import { deleteWork } from './modal-delete-works.js'

// OUVERTURE MODALE

export function modaleHandler() {
  const openModale = document.querySelector('.edit') // selectionne le bouton edit
  const modale = document.querySelector('.modale') // selectionne la modale (dialog)

  openModale.addEventListener('click', () => {
    event.stopPropagation() // empêche la propagation de l'évènement
    modale.showModal() // ouvre la modale
    modaleGallery() // affiche la gallerie de la modale
    modaleClosed(modale) // ferme la modale
  })
}

// FERMETURE MODALE

function modaleClosed(modale) {
  const closeModale = document.querySelector('.close') // selectionne la croix

  const outsideClickListener = (event) => {
    if (event.target === modale) {
      modale.close() // Close the modal if the click is outside the modal
      document.removeEventListener('click', outsideClickListener) // remove the event listener
    }
  }

  closeModale.addEventListener('click', () => {
    modale.close() // ferme la modale
    document.removeEventListener('click', outsideClickListener) // remove the event listener
  })

  document.addEventListener('click', outsideClickListener)
}

// AFFICHAGE GALERIE MODALE

export async function modaleGallery() {
  const modaleGallery = document.querySelector('.modale-gallery')
  const modaleTitle = document.querySelector('.modale-title')
  const modaleButton = document.querySelector('.modale-button')
  modaleGallery.innerHTML = '' // vide la modale à chaque ouverture (pour éviter les doublons)

  modaleTitle.textContent = 'Galerie photo'
  modaleButton.value = 'Ajouter une photo'

  try {
    const works = await fetchGallery()
    works.forEach((workItem) => {
      const imageContainer = document.createElement('div') // création du container
      const img = document.createElement('img') // création de l'image
      const itrash = document.createElement('i') // création de la poubelle

      img.src = workItem.imageUrl // récupère l'url de l'image
      img.alt = workItem.title // récupère le titre de l'image pour le alt

      itrash.className = 'fa-solid fa-trash-can' // ajoute la classe fontawesome
      imageContainer.className = 'image-container' // ajoute la classe image-container

      // Changement opacité image au survol de l'icon
      itrash.addEventListener('mouseover', () => {
        img.style.opacity = '0.5'
      })

      itrash.addEventListener('mouseout', () => {
        img.style.opacity = '1'
      })

      // Suppression de l'image au click sur l'icon
      itrash.addEventListener('click', async () => {
        deleteWork(workItem) // paramètre workItem pour récupérer l'id de l'image !!!
      })

      imageContainer.appendChild(img) // ajoute l'image au container
      imageContainer.appendChild(itrash) // ajoute la poubelle à l'image

      modaleGallery.appendChild(imageContainer) // ajoute le container (image+trash) à la modale
    })
  } catch (error) {
    console.error('Echec du  chargement de la galerie', error)
  }
  modaleButton.addEventListener('click', () => {
    ModaleAddWork()
  })
}
