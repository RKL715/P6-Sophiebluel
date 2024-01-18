// TEST SERVER FETCH API
// console.log(fetch('http://localhost:5678/api/works'))

// contrôle affichage lorsque l'utilisateur est connecté
const logout = document.getElementById('logout') // pour récupérer le bouton logout
const edit = document.querySelector('.edit') // pour récupérer le bouton edit
const edition = document.querySelector('.edition') // pour récupérer la bar edition
logout.style.display = 'none' // pour masquer le bouton logout
edit.style.display = 'none' // pour masquer le bouton edit
edition.style.display = 'none' // pour masquer la bar edition

import { createGallery, createFilter, hideFilter } from './gallery.js'
import { logoutSystem } from '../login/logout.js'
import { modaleHandler } from './modal.js'

window.addEventListener('load', async function () {
  await createFilter()
  await createGallery()
  // les photos et filtres sont chargés.
})

logoutSystem()
hideFilter()
modaleHandler()
