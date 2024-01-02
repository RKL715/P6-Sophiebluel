import { fetchCategory } from './apifetch.js'

export function addWork() {
  const modaleContent = document.querySelector('.modale-content')
  const modaleGallery = document.querySelector('.modale-gallery')
  const modaleTitle = document.querySelector('.modale-title')
  const modaleButton = document.querySelector('.modale-button')

  modaleTitle.textContent = 'Ajout photo'

  modaleButton.value = 'Valider' // disabled tant que le formulaire n'est pas rempli
  modaleButton.disabled = true // disabled tant que le formulaire n'est pas rempli

  modaleButton.removeEventListener('click', addWork) // retire l'event listener précédent pour éviter les doublons
  modaleButton.addEventListener('click', postForm) // ajoute l'event listener pour envoyer le formulaire

  modaleGallery.style.display = 'none'
  modaleContent.style.display = 'block'

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
  photoButton.className = 'photo-button'
  photoButton.textContent = '+ Ajouter photo'
  photoCadre.appendChild(photoButton)

  const photoRestriction = document.createElement('p')
  photoRestriction.className = 'photo-restriction'
  photoRestriction.textContent = 'jpg, png : 4Mo max' // créer la fonction pour vérifier le format et la taille
  photoCadre.appendChild(photoRestriction)

  //   TITRE
  const titreLabel = document.createElement('p')
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
  const categorieLabel = document.createElement('p')
  categorieLabel.textContent = 'Catégorie'
  categorieLabel.className = 'form-label-categorie'
  form.appendChild(categorieLabel)

  const categorie = document.createElement('select')
  categorie.name = 'Catégorie'
  categorie.required = true
  categorie.className = 'categorie'
  form.appendChild(categorie)
  fetchCategory()

  fetchCategory().then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category.Id
      option.text = category.name
      categorie.appendChild(option)
    })
  })
}

// POST FORMULAIRE
function postForm() {
  console.log('postForm')
}
