export function createImageElements() {
  const photoCadre = document.createElement('div')
  photoCadre.className = 'photo-cadre'

  const photoVignette = document.createElement('div')
  photoVignette.className = 'photo-vignette'
  photoVignette.style.backgroundImage =
    'url(../assets/images/vignette-placeholder.png)'
  photoCadre.appendChild(photoVignette)

  const photoButton = document.createElement('button')
  photoButton.type = 'button' // pour éviter que le bouton ne soumette le formulaire
  photoButton.className = 'photo-button'
  photoButton.textContent = '+ Ajouter photo'
  photoCadre.appendChild(photoButton)

  const photoRestriction = document.createElement('p')
  photoRestriction.className = 'photo-restriction'
  photoRestriction.textContent = 'jpg, png : 4Mo max' // créer la fonction pour vérifier le format et la taille
  photoCadre.appendChild(photoRestriction)

  return { photoCadre, photoVignette, photoButton, photoRestriction }
}

// Pour réduire la taille de la fonction ModaleAddWork
