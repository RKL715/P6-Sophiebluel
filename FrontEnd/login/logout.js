export function logoutSystem() {
  const token = localStorage.getItem('token') // pour récupérer le token dans le local storage
  if (token) {
    // recupération des éléments du DOM
    const login = document.getElementById('login')
    const logout = document.getElementById('logout')
    const edit = document.querySelector('.edit')
    const edition = document.querySelector('.edition')
    // affichage des boutons
    login.style.display = 'none'
    logout.style.display = 'block'
    logout.style.cursor = 'pointer'
    edit.style.display = 'block'
    edition.style.display = 'block'
  } else {
    console.log('User is not logged in')
  }
  logout.addEventListener('click', async (event) => {
    event.preventDefault() // pour éviter le rechargement de la page
    localStorage.removeItem('token') // pour supprimer le token du local storage
    window.location.href = '../index.html' // pour rediriger vers la page d'accueil
  })
}
