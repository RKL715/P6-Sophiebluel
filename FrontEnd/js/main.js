// TEST SERVER FETCH API
// console.log(fetch('http://localhost:5678/api/works'))

// import { createWork, createButton, filterContentByCategory } from './api.js'
// import { filtrageCateory } from ".//nqnanana" EN FAISANT ATTENTION À LES ATTENDRE ASYNC AWAIT

console.log('JavaScript is working!')

import { createGallery, createFilter } from './gallery.js'

window.addEventListener('load', async function () {
  await createFilter()
  await createGallery()

  // A partir de maintenant, les photos et filtres sont chargés.
  const token = localStorage.getItem('token') // pour récupérer le token dans le local storage
  if (token) {
    console.log('User is logged in')
    // User is logged in
  } else {
    console.log('User is not logged in')
    this.alert('You are not logged in')
    // User is not logged in
  }
})
