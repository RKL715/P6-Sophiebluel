// TEST SERVER FETCH API
// console.log(fetch('http://localhost:5678/api/works'))

const gallery = document.querySelector('.gallery')
const figure = document.querySelector('figure')

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    data.forEach((works) => {
      console.log(works.imageUrl)
      const figure = document.createElement('figure')
      const img = document.createElement('img')
      const title = document.createElement('figcaption')

      img.src = works.imageUrl
      title.textContent = works.title
      img.alt = works.title

      figure.appendChild(img)
      figure.appendChild(title)
      gallery.appendChild(figure)
    })
  })
  .catch((error) => console.log(error))
