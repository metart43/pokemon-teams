//solution goes here
document.addEventListener("DOMContentLoaded",function (){
fetchTrainers()
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
  addBttn.id = trainer.id
  addBttn.className = `button-${trainer.id}`
  trainerCard.append(trainerName, addBttn)
  mainHTML.appendChild(trainerCard)
  document.querySelector(`.button-${trainer.id}`).addEventListener('click', addingPokemon)
  const pokemonNames = trainer.pokemons.filter(pokemon => pokemon.nickname)
  pokemonNames.forEach(pokemon => renderPokemon(pokemon))
}

function renderPokemon(pokemon){
  const pokemonList = document.createElement('ul')
  const pokemonEl = document.createElement('li')
  const releaseBttn = document.createElement('button')
  releaseBttn.className = `release`
  releaseBttn.id = pokemon.id
  releaseBttn.innerText = 'release'
  pokemonEl.innerHTML = pokemon.nickname
  pokemonEl.id = pokemon.id
  pokemonEl.append(releaseBttn)
  pokemonList.appendChild(pokemonEl)
  const trainerCard = document.querySelector(`#card-${pokemon.trainer_id}`)
  trainerCard.appendChild(pokemonList)
  document.getElementById(`${pokemon.id}`).addEventListener('click', releasePokemon)
}

function addingPokemon(event){
let data = {
  trainer_id: event.target.id
}
console.log('inside');
debugger
fetch(`http://localhost:3000/pokemons`, {
  method: "POST" ,
  headers: {'Content-Type': 'application/json'},
  body:JSON.stringify(data),
}).then(response => response.json())
.then(newPoke => renderPokemon(newPoke))
}

function releasePokemon(){
  pokemonId = event.target.id
  console.log('inside');
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: "DELETE"
  })
  .then((response) => {
    debugger
    document.getElementById(`${pokemonId}`).remove()
  })

}
