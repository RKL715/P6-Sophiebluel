import { createGallery } from './gallery.js'

// Function pour delete un work dans la modale
export function deleteWork(workId, elementToRemove) {
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then((response) => {
      if (response.ok) {
        elementToRemove.remove()
        createGallery()
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression', error)
    })
}
