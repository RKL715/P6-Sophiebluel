export async function fetchGallery() {
  let response = await fetch('http://localhost:5678/api/works')
  let works = await response.json()
  return works
}

export async function fetchCategory() {
  let res = await fetch('http://localhost:5678/api/categories')
  let infos = await res.json()
  return infos
}
