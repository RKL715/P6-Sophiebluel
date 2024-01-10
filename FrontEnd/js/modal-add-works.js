import { fetchCategory } from './apifetch.js'
import { createImageElements } from './image-elements.js'

export function ModaleAddWork() {
  const modalePage1 = document.querySelector('.modale-page-1')
  modalePage1.style.display = 'none' // cache la page 1

  const modalePage2 = document.querySelector('.modale-page-2')
  modalePage2.innerHTML = '' // vide la page 2 pour éviter les doublons
  modalePage2.style.display = 'block' // affiche la page 2

  //  Return button
  const returnButton = document.querySelector('.return')
  returnButton.style.display = 'block'
  returnButton.addEventListener('click', () => {
    modalePage1.style.display = 'block' // affiche la page 1
    modalePage2.style.display = 'none' // cache la page 2
    returnButton.style.display = 'none' // cache le bouton retour
  })

  // AFFICHAGE DU BOUTON + TITRE
  const modaleTitle = document.createElement('h5')
  modaleTitle.className = 'modale-title'
  modaleTitle.textContent = 'Ajout photo'
  modalePage2.appendChild(modaleTitle)

  const modaleButton = document.createElement('input')
  modaleButton.type = 'submit'
  modaleButton.className = 'modale-button'
  modaleButton.value = 'Valider'
  modaleButton.disabled = true
  modaleButton.style.backgroundColor = 'gray'
  modaleButton.style.cursor = 'not-allowed'

  //  EVENT LISTENER POUR ENVOYER LE FORMULAIRE
  modaleButton.removeEventListener('click', ModaleAddWork) // retire l'event listener précédent pour éviter les doublons
  modaleButton.addEventListener('click', postForm) // ajoute l'event listener pour envoyer le formulaire

  //   CREATION ELEMENTS DU FORMULAIRE
  //   ** IMAGE **
  const form = document.createElement('form')
  form.className = 'form'
  modalePage2.appendChild(form)

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

  // AFFICHAGE BAR HR
  const bar = document.createElement('hr')
  bar.className = 'bar'
  modalePage2.appendChild(bar)

  // Append du bouton valider
  modalePage2.appendChild(modaleButton)
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
