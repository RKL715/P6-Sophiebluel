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
    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token) // pour stocker le token dans le local storage
      // pour afficher le message de connexion
      window.location.href = '../index.html' // pour rediriger vers la page d'accueil
    } else {
      fail.style.display = 'block' // pour afficher le message d'erreur
    }
  } catch (error) {
    console.log(error)
  }
})
