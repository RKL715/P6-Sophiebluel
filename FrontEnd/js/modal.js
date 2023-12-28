export function modaleOpen() {
  const openModale = document.querySelector('.edit') // selectionne le bouton edit
  const modale = document.querySelector('.modale') // selectionne la modale (dialog)

  // OUVERTURE MODALE
  openModale.addEventListener('click', () => {
    console.log('click OK') // test (à supprimer)
    modale.showModal() // ouvre la modale

    // FERMETURE MODALE
    const closeModale = document.querySelector('.close') // selectionne la croix

    closeModale.addEventListener('click', () => {
      modale.close() // ferme la modale
    })
  })
}
