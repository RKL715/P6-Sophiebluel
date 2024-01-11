import { createGallery } from './gallery.js'

// Function pour delete un work dans la modale
export function deleteWork(workId, elementToRemove) {
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // Retire l'élément du DOM
      // après avoir supprimé le work dans l'API
      elementToRemove.remove()
      createGallery()
    })
    .catch((error) => {
      console.error('SuperError:', error)
    })
}
