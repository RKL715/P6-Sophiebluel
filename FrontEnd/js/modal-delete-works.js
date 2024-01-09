import { fetchGallery } from './apifetch.js'

// Function pour delete un work dans la modale
export function deleteWork(workId, elementToRemove) {
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Récupère le token dans le local storage
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`) // Gestion des erreurs
      }
      // Remove the element from the DOM
      elementToRemove.remove() // Supprime l'élément du DOM
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
