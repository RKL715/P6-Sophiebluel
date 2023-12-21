import { fetchGallery, fetchCategory } from './apifetch.js'

// const gallery = document.querySelector('.gallery') // pas besoin car appelé dans le main

export async function createGallery() {
  const galleryContainer = document.querySelector('.gallery')
  const works = await fetchGallery() // return works
  works.forEach((workItem) => {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const title = document.createElement('figcaption')
    const workCategoryId = works.categoryId
    img.src = workItem.imageUrl
    title.textContent = workItem.title
    img.alt = workItem.title

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
      button.classList.add('filterActive')
      filterContentByCategory(category)
    })
  })
}
