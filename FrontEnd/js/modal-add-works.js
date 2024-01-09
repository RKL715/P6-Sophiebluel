import { fetchCategory } from './apifetch.js'
import { createImageElements } from './image-elements.js'

export function ModaleAddWork() {
  //  Récupération des éléments du DOM
  const modaleContent = document.querySelector('.modale-content')
  const modaleGallery = document.querySelector('.modale-gallery')
  const modaleTitle = document.querySelector('.modale-title')
  const modaleButton = document.querySelector('.modale-button')
  const returnButton = document.querySelector('.return')

  // AFFICHAGE DES BOUTONS + TITRE
  returnButton.style.display = 'block'
  modaleTitle.textContent = 'Ajout photo'
  modaleButton.value = 'Valider'
  modaleButton.disabled = true
  modaleButton.style.backgroundColor = 'gray'
  modaleButton.style.cursor = 'not-allowed'

  //  EVENT LISTENER POUR ENVOYER LE FORMULAIRE
  modaleButton.removeEventListener('click', ModaleAddWork) // retire l'event listener précédent pour éviter les doublons
  modaleButton.addEventListener('click', postForm) // ajoute l'event listener pour envoyer le formulaire

  modaleGallery.style.display = 'none'
  modaleContent.style.display = 'block'
  modaleContent.innerHTML = '' // vide la modale à chaque ouverture (pour éviter les doublons)

  //   CREATTION ELEMENTS DU FORMULAIRE
  //   ** IMAGE **
  const form = document.createElement('form')
  form.className = 'form'
  modaleContent.appendChild(form)
  // --- Formule pour réduire la taille de la fonction ModaleAddWork
  const { photoCadre, photoVignette, photoButton, photoRestriction } =
    createImageElements()
  form.appendChild(photoCadre)
  //  ** TITRE **
  const titreLabel = document.createElement('label')
  titreLabel.textContent = 'Titre'
  titreLabel.className = 'form-label-titre'
  form.appendChild(titreLabel)
  const titre = document.createElement('input')
  titre.type = 'text'
  titre.name = 'Titre'
  titre.required = true
  titre.className = 'titre'
  form.appendChild(titre)
  //  ** CATEGORIE **
  const categorieLabel = document.createElement('label')
  categorieLabel.textContent = 'Catégorie'
  categorieLabel.className = 'form-label-categorie'
  form.appendChild(categorieLabel)

  const categorie = document.createElement('select')
  categorie.name = 'Catégorie'
  categorie.required = true
  categorie.className = 'categorie'
  form.appendChild(categorie)
  fetchCategory()

  fetchCategory()
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement('option')
        option.value = category.Id
        option.text = category.name
        categorie.appendChild(option)
      })
    })
    .catch((error) => {
      console.error(error)
    })

  form.appendChild(photoWork)

  // EVENT LISTENER POUR AJOUTER UNE PHOTO
  photoButton.addEventListener('click', (event) => {
    event.preventDefault()
    photoWork.click()
  })
  photoWork.addEventListener('change', () =>
    handlePhotoWorkChange(photoVignette, photoButton, photoRestriction)
  )

  //  ** POST FORM **
  form.addEventListener('input', () => {
    // Check si tous les champs requis sont remplis
    const allFieldsFilled = Array.from(form.elements).every((element) => {
      return element.required ? Boolean(element.value) : true
    })

    // Enable ou disable modaleButton si tous les champs requis sont remplis
    if (allFieldsFilled) {
      modaleButton.disabled = false
      modaleButton.style.backgroundColor = '#1d6154'
      modaleButton.style.cursor = 'pointer'
    }
  })
}

// PHOTOWORK
// Création de la fonctionalité pour ajouter une photo
const photoWork = document.createElement('input')
photoWork.type = 'file'
photoWork.accept = 'image/png, image/jpg'
photoWork.style.display = 'none' // Hide the file input
photoWork.required = true

// Create a new function to handle the change event for photoWork
function handlePhotoWorkChange(photoVignette, photoButton, photoRestriction) {
  const WorkImg = photoWork.files[0] // récupère le fichier ajouté
  if (WorkImg.size > 4000000) {
    alert('Le fichier est trop volumineux')
    photoWork.value = '' // reset le formulaire pour éviter les doublons
    return // stop la fonction
  }
  const fileURL = URL.createObjectURL(WorkImg) // récupère l'url du fichier ajouté
  photoVignette.style.backgroundImage = `url(${fileURL})` // ajoute l'url du fichier ajouté à la vignette
  photoVignette.style.width = '50%'
  photoVignette.style.height = '100%'
  photoRestriction.style.display = 'none'
  photoButton.style.display = 'none'
  photoVignette.style.backgroundSize = 'contain'
  photoVignette.style.backgroundPosition = 'center'
  photoVignette.style.backgroundRepeat = 'no-repeat'
}

// POST FORMULAIRE
function postForm() {
  console.log('postForm')
}
