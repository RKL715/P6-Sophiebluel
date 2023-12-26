// Need error message if login fails (wrong password or username)
// Need to redirect to home page if login is successful
// Need to stay connected if user refreshes page
// Need to redirect to home page if user is already logged in
console.log('JavaScript is working!')

const login = document.getElementsByClassName('login__form')[0] // pour récupérer le formulaire
const connexion = document.getElementsByClassName('connexion')[0] // pour récupérer le bouton connexion
const fail = document.getElementsByClassName('fail')[0] // pour récupérer le message d'erreur

connexion.addEventListener('click', async (event) => {
  try {
    // pour écouter le click sur le bouton connexion
    event.preventDefault() // pour éviter le rechargement de la page
    const mail = document.getElementById('mail').value // pour récupérer la valeur du mail
    const password = document.getElementById('password').value // pour récupérer la valeur du password

    const response = await fetch('http://localhost:5678/api/users/login', {
      // pour envoyer les données au back
      method: 'POST', // pour préciser la méthode
      headers: {
        // pour préciser le type de données envoyées
        'Content-Type': 'application/json', // pour préciser que les données sont en JSON
      },

      body: JSON.stringify({
        // pour envoyer les données
        email: mail, // pour envoyer le mail
        password: password, // pour envoyer le password
      }),
    })
    const data = await response.json() // pour récupérer les données du back
    if (data.error) {
      fail.style.display = 'block'
      // pour afficher le message d'erreur
      alert(data.error)
    } else {
      localStorage.setItem('token', data.token) // pour stocker le token dans le local storage
      // pour afficher le message de connexion
      alert('Vous êtes connecté')
      window.location.href = '../index.html' // pour rediriger vers la page d'accueil
    }
  } catch (error) {
    console.log(error)
  }
})

console.log('JavaScript is working! 2')
