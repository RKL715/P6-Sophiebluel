import { fetchGallery, fetchCategory } from './apifetch.js'

// Fonction qui crée la gallerie
export async function createGallery() {
  const galleryContainer = document.querySelector('.gallery')
  galleryContainer.innerHTML = '' // empeche de dupliquer la gallerie (vide la gallerie)
  const works = await fetchGallery() // recupère les infos de fetchGallery()
  works.forEach((workItem) => {
    // pour chaque item de la gallerie, on crée un figure avec une image et un figcaption
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const title = document.createElement('figcaption')
    const workCategoryId = workItem.categoryId

    // on ajoute les infos de l'item dans les balises
    img.src = workItem.imageUrl
    title.textContent = workItem.title
    img.alt = workItem.title
    figure.dataset.categoryId = workCategoryId

    // on ajoute au DOM
    figure.appendChild(img)
    figure.appendChild(title)
    galleryContainer.appendChild(figure)
  })
}

// Fonction qui crée les boutons de filtre
export async function createFilter() {
  const filter = document.querySelector('.filterContainer')
  const infos = await fetchCategory() // infos qui vienent de fetchCategory()

  infos.forEach((category) => {
    // on crée un bouton pour chaque catégorie
    const button = document.createElement('input')
    button.type = 'button'
    button.value = category.name // on ajoute le nom de la catégorie dans le bouton
    button.classList.add('filter')
    filter.appendChild(button)
    // Ecoute du click pour chaque bouton
    button.addEventListener('click', () => {
      // On retire la classe 'filterActive' de tous les boutons
      document.querySelectorAll('.filter').forEach((btn) => {
        btn.classList.remove('filterActive')
      })
      // On ajoute la classe 'filterActive' au bouton cliqué (applique le css)
      button.classList.add('filterActive')
      filterContentByCategory(category)
    })
  })
}

// Fonction qui filtre les images
const filterContentByCategory = (category) => {
  const works = document.querySelectorAll('.gallery figure')
  works.forEach((work) => {
    // Compare l'id de la catégorie du bouton avec l'id de la catégorie de l'image
    if (Number(work.dataset.categoryId) === Number(category.id)) {
      // Si ca match, on retire la classe 'hide' (Hide = display: none; css)
      work.classList.remove('hide')
    } else {
      // Si ca match pas, on ajoute la classe 'hide'
      work.classList.add('hide')
    }
  })
}

// Fonction qui affiche toutes les images
const allButton = document.querySelector('input[value="Tous"]') // on récupère le bouton "Tous" dans le DOM
allButton.addEventListener('click', () => {
  // Retire la classe 'filterActive' de tous les boutons
  document.querySelectorAll('.filter').forEach((btn) => {
    btn.classList.remove('filterActive')
  })
  // Ajoute la classe 'filterActive' au bouton "Tous"
  allButton.classList.add('filterActive')
  // Retire la classe 'hide' de toutes les images
  document.querySelectorAll('.gallery figure').forEach((work) => {
    work.classList.remove('hide')
  })
})

// Fonction qui cache les boutons filtre si l'utilisateur est connecté
export async function hideFilter() {
  const filter = document.querySelector('.filterContainer')
  const token = localStorage.getItem('token') // pour récupérer le token dans le local storage
  if (token) {
    filter.style.display = 'none'
  }
}
