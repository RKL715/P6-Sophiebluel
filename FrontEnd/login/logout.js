export function logoutSystem() {
  const token = localStorage.getItem('token') // pour récupérer le token dans le local storage
  if (token) {
    console.log('User is logged in')
    const login = document.getElementById('login') // pour récupérer le bouton login
    const logout = document.getElementById('logout') // pour récupérer le bouton logout
    const edit = document.querySelector('.edit') // pour récupérer le bouton edit
    const edition = document.querySelector('.edition') // pour récupérer la bar edition
    login.style.display = 'none' // pour cacher le bouton login
    logout.style.display = 'block' // pour afficher le bouton logout
    logout.style.cursor = 'pointer'
    edit.style.display = 'block' // pour afficher le bouton edit
    edition.style.display = 'block' // pour afficher la bar edition
  } else {
    console.log('User is not logged in')
  }
  logout.addEventListener('click', async (event) => {
    event.preventDefault() // pour éviter le rechargement de la page
    localStorage.removeItem('token') // pour supprimer le token du local storage
    alert('Vous êtes déconnecté') // pour afficher le message de déconnexion
    window.location.href = '../index.html' // pour rediriger vers la page d'accueil
  })
}
