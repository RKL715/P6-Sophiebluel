// TEST SERVER FETCH API
// console.log(fetch('http://localhost:5678/api/works'))

// import { createWork, createButton, filterContentByCategory } from './api.js'
// import { filtrageCateory } from ".//nqnanana" EN FAISANT ATTENTION À LES ATTENDRE ASYNC AWAIT

import { createGallery, createFilter } from './gallery.js'

// const gallery = document.querySelector('.gallery')

await createFilter()
await createGallery()

// A partir de maintenant, les photos et filtres sont chargés.

/* const boutons = document.querySelectorAll('.button-filtrage')

boutons.forEach((bouton) => {
  filtrageCateory(bouton)
}) */
