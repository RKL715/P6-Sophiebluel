import { fetchCategory } from './apifetch.js'

export function addWork() {
  const modaleContent = document.querySelector('.modale-content')
  const modaleGallery = document.querySelector('.modale-gallery')
  const modaleTitle = document.querySelector('.modale-title')
  const modaleButton = document.querySelector('.modale-button')
  const returnButton = document.querySelector('.return')

  returnButton.style.display = 'block'
  modaleTitle.textContent = 'Ajout photo'
  modaleButton.value = 'Valider' // disabled tant que le formulaire n'est pas rempli
  // modaleButton.disabled = true // disabled tant que le formulaire n'est pas rempli

  modaleButton.removeEventListener('click', addWork) // retire l'event listener précédent pour éviter les doublons
  modaleButton.addEventListener('click', postForm) // ajoute l'event listener pour envoyer le formulaire

  modaleGallery.style.display = 'none'
  modaleContent.style.display = 'block'
  // prevent reafichage 2eme page !!!!!!!!!!!!

  //   Création du formulaire et des éléments

  //   IMAGE
  const form = document.createElement('form')
  form.className = 'form'
  modaleContent.appendChild(form)

  const photoCadre = document.createElement('div')
  photoCadre.className = 'photo-cadre'
  form.appendChild(photoCadre)

  const photoVignette = document.createElement('div')
  photoVignette.className = 'photo-vignette'
  photoVignette.style.backgroundImage =
    'url(../assets/images/vignette-placeholder.png)'
  photoCadre.appendChild(photoVignette)

  const photoButton = document.createElement('button')
  photoButton.type = 'button' // pour éviter que le bouton ne soumette le formulaire
  photoButton.className = 'photo-button'
  photoButton.textContent = '+ Ajouter photo'
  photoCadre.appendChild(photoButton)

  const photoRestriction = document.createElement('p')
  photoRestriction.className = 'photo-restriction'
  photoRestriction.textContent = 'jpg, png : 4Mo max' // créer la fonction pour vérifier le format et la taille
  photoCadre.appendChild(photoRestriction)

  //   TITRE
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

  //   CATEGORIE
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

  photoButton.eventListener('click', () => {
    addPhoto()
  })
}

// ADD PHOTO

function addPhoto() {
  const photoWork = document.createElement('input')
  photoWork.type = 'file'
  photoWork.accept = 'image/png, image/jpg'
  // 4MO MAX
  photoWork.required = true
  form.appendChild(photoWork)
}

// POST FORMULAIRE
function postForm() {
  console.log('postForm')
}

// form.reset() // reset le formulaire pour éviter les doublons
