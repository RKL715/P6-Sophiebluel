import { fetchGallery } from './apifetch.js'

export function modaleOpen() {
  const openModale = document.querySelector('.edit') // selectionne le bouton edit
  const modale = document.querySelector('.modale') // selectionne la modale (dialog)

  // OUVERTURE MODALE
  openModale.addEventListener('click', () => {
    console.log('click OK') // test (à supprimer)
    modale.showModal() // ouvre la modale
    modaleGallery() // affiche la gallerie de la modale
  })
  // FERMETURE MODALE
  const closeModale = document.querySelector('.close') // selectionne la croix

  closeModale.addEventListener('click', () => {
    modale.close() // ferme la modale
  })
}

async function modaleGallery() {
  const modaleGallery = document.querySelector('.modale-gallery')
  const modaleTitle = document.querySelector('.modale-title')
  modaleGallery.innerHTML = '' // vide la modale à chaque ouverture (pour éviter les doublons)

  modaleTitle.textContent = 'Galerie photo'

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

      imageContainer.appendChild(img) // ajoute l'image au container
      imageContainer.appendChild(itrash) // ajoute la poubelle à l'image

      modaleGallery.appendChild(imageContainer) // ajoute le container (image+trash) à la modale
    })
  } catch (error) {
    console.error('Echec du  chargement de la galerie', error)
  }
}
