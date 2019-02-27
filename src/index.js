//solution goes here
document.addEventListener("DOMContentLoaded",function (){
fetchTrainers()
document.querySelector('button').addEventListener('click', addingPokemon)
})


function fetchTrainers() {
  fetch('http://localhost:3000/trainers')
  .then(response => response.json())
  .then(trainersData => trainersData.forEach(trainer => render(trainer)))
}

function render(trainer) {
  // console.log(trainer)
  const mainHTML = document.querySelector('main')
  const trainerCard = document.createElement('div')
  trainerCard.className = `card`
  trainerCard.id = `card-${trainer.id}`
  const trainerName = document.createElement('p')
  trainerName.innerHTML = trainer.name
  const addBttn = document.createElement('button')
  const text = document.createTextNode('Add')
  addBttn.appendChild(text)
  trainerCard.append(trainerName, addBttn)
  mainHTML.appendChild(trainerCard)
  document.querySelector('button').addEventListener('click', addingPokemon)
  const pokemonNames = trainer.pokemons.filter(pokemon => pokemon.nickname)
  pokemonNames.forEach(pokemon => renderPokemon(pokemon))
}

function renderPokemon(pokemon){
  const pokemonList = document.createElement('ul')
  const pokemonEl = document.createElement('li')
  const releaseBttn = document.createElement('button')
  releaseBttn.className = 'release'
  releaseBttn.id = pokemon.id
  releaseBttn.innerText = 'release'
  pokemonEl.innerHTML = pokemon.nickname
  pokemonEl.id = pokemon.id
  pokemonEl.append(releaseBttn)
  pokemonList.appendChild(pokemonEl)
  debugger
  const trainerCard = document.querySelector(`#card-${pokemon.trainer_id}`)
  trainerCard.appendChild(pokemonList)
}

function addingPokemon(){
console.log('inside');
}
