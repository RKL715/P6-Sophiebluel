import { fetchGallery, fetchCategory } from './apifetch.js'

// const gallery = document.querySelector('.gallery') // pas besoin car appelé dans le main

export async function createGallery() {
  const galleryContainer = document.querySelector('.gallery')
  const works = await fetchGallery() // return works
  works.forEach((workItem) => {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const title = document.createElement('figcaption')
    const workCategoryId = workItem.categoryId

    img.src = workItem.imageUrl
    title.textContent = workItem.title
    img.alt = workItem.title
    figure.dataset.categoryId = workCategoryId
    // workCategoryId === CategoryId

    figure.appendChild(img)
    figure.appendChild(title)
    galleryContainer.appendChild(figure)
  })
}

export async function createFilter() {
  const filter = document.querySelector('.filterContainer')
  const infos = await fetchCategory() // infos qui vienent de fetchCategory()
  infos.forEach((category) => {
    // create button for each category and place
    const button = document.createElement('input')
    button.type = 'button'
    button.value = category.name
    button.classList.add('filter')
    filter.appendChild(button)
    button.addEventListener('click', () => {
      // Remove 'filterActive' class from all buttons
      document.querySelectorAll('.filter').forEach((btn) => {
        btn.classList.remove('filterActive')
      })
      // Add 'filterActive' class to the clicked button
      button.classList.add('filterActive')
      filterContentByCategory(category)
    })
  })
}

// Filter the gallery by category
const filterContentByCategory = (category) => {
  const works = document.querySelectorAll('.gallery figure')
  works.forEach((work) => {
    // Compare the category id of each work with the id of the clicked button
    if (Number(work.dataset.categoryId) === Number(category.id)) {
      // If they match, remove the 'hide' class
      work.classList.remove('hide')
    } else {
      // If they don't match, add the 'hide' class (Hide class contain display: none; in css)
      work.classList.add('hide')
    }
  })
}

// Get the "Tous" button
const allButton = document.querySelector('input[value="Tous"]')

allButton.addEventListener('click', () => {
  // Remove 'filterActive' class from all buttons
  document.querySelectorAll('.filter').forEach((btn) => {
    btn.classList.remove('filterActive')
  })

  // Add 'filterActive' class to the "Tous" button
  allButton.classList.add('filterActive')

  // Remove 'hide' class from all gallery items
  document.querySelectorAll('.gallery figure').forEach((work) => {
    work.classList.remove('hide')
  })
})

// const filterButtons = document.querySelectorAll('filter')

// filterButtons.forEach((category) => {
//   const result = category.filter((workItem) => 1)
// })
