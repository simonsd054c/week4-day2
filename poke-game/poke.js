function randomNumberGenerator() {
    let random = Math.random() // return random number from 0 to 1
    let randomUpto808 = random * 808 // returns random number from 0 to 808
    let roundedRandomNumber = Math.round(randomUpto808) // random integer from 0 to 808
    return roundedRandomNumber
}

async function getPokemonData() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumberGenerator()}`)
    const pokemonData = await response.json()
    return pokemonData
}

function showPokemonImages(list) {
    let pokemonDiv = document.getElementById("pokemons")
    list.forEach((pokemon) => {
        let pokemonImage = document.createElement("img")
        pokemonImage.src = pokemon.sprites.front_default
        pokemonImage.id = pokemon.name
        pokemonImage.classList.add("pokemon")
        pokemonDiv.append(pokemonImage)
    })
}

function removeButton() {
    // document.getElementById("button").disabled = true
    document.getElementById("button").remove()
}

function showMessage() {
    let message = document.getElementById("message")
    message.innerHTML = `You got five pokemons.
        Click on any one to start your adventure.
    `
    //in place of innerHTML, we can also use innerText
    // or textContent
}

function showDescription(pokemon) {
    let description = document.getElementById("description")
    description.textContent = `You chose ${pokemon.name} with 
    ${pokemon.moves[0].move.name}`
}

function showStartGame() {
    let button = document.getElementById("game-button")
    if(!button) {
        let gameButton = document.createElement("button")
        gameButton.id = "game-button"
        gameButton.innerHTML = "Start Game"
        document.body.append(gameButton)
    }
}

function clearScreen() {
    document.body.innerHTML = ""
}

function showInstruction() {
    let instruction = document.createElement("p")
    instruction.textContent = `Start your adventure by clicking on
        the map
    `
    document.body.appendChild(instruction)
}

function addMap() {
    let map = document.createElement("img")
    map.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5aacf438-4ca1-4094-9487-0114a51f5e92/d47z8wm-d9a8b8fd-ed88-4b09-8db2-f416c81813e4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVhYWNmNDM4LTRjYTEtNDA5NC05NDg3LTAxMTRhNTFmNWU5MlwvZDQ3ejh3bS1kOWE4YjhmZC1lZDg4LTRiMDktOGRiMi1mNDE2YzgxODEzZTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.rtwuALFZFZxSC1aiiP77eWM8KjoaslvjTG-Tfr1VRFw"
    map.id = "background"
    map.alt = "https://www.deviantart.com/segesi/art/Viridian-Forest-Again-255266518"
    document.body.append(map)
}

function showSelectedPokemon(pokemon) {
    let selectedPokemonImage = document.createElement("img")
    selectedPokemonImage.src = pokemon.sprites.front_default
    selectedPokemonImage.id = "selected"
    selectedPokemonImage.style.position = "absolute"
    document.body.append(selectedPokemonImage)
}

function listenToClickOnMap() {
    let map = document.getElementById("background")
    map.addEventListener("click", (e) => {
        let posX = e.pageX
        let posY = e.pageY
        let playingPokemon = document.getElementById("selected")
        let pokemonWidth = playingPokemon.clientWidth
        let pokemonHeight = playingPokemon.clientHeight
        let midOfWidth = pokemonWidth / 2
        let midOfHeight = pokemonHeight / 2
        playingPokemon.style.left = `${posX - midOfWidth}px`
        playingPokemon.style.top = `${posY - midOfHeight}px`
        playingPokemon.style.transition = "0.2s"
    })
}

function changePosition(key) {
    let pokemon = document.getElementById("selected")
    let currentPosition = pokemon.getBoundingClientRect()
    switch(key) {
        case "ArrowUp": {
            pokemon.style.top = `${currentPosition.top - 10}px`
            break;
        }
        case "ArrowDown": {
            pokemon.style.top = `${currentPosition.top + 10}px`
            break;
        }
        case "ArrowLeft": {
            pokemon.style.left = `${currentPosition.left - 10}px`
            break;
        }
        case "ArrowRight": {
            pokemon.style.left = `${currentPosition.left + 10}px`
            break;
        }
        default: {

        }
    }
}

function listenToArrows() {
    document.body.addEventListener("keydown", (e) => {
        e.preventDefault()
        changePosition(e.key)
    })
}

function listenToClickOnGameButton(pokemon) {
    let button = document.getElementById("game-button")
    button.addEventListener("click", () => {
        clearScreen()
        showInstruction()
        addMap()
        showSelectedPokemon(pokemon)
        listenToClickOnMap()
        listenToArrows()
    })
}

function listenToClickOnPokemon(list) {
    list.forEach((pokemon) => {
        let name = pokemon.name
        document.getElementById(name).addEventListener("click", () => {
            showDescription(pokemon)
            showStartGame()
            listenToClickOnGameButton(pokemon)
        }) // 'once' can be used if we want to invoke event listener only once
    })
}

document.getElementById("button").addEventListener("click", () => {
    let promiseList = []

    for(let i = 0; i < 5; i++) { // to loop 5 times for 5 pokemons
        let promise = getPokemonData().then((data) => {
            return data
        })
        promiseList.push(promise) // make a list of promises
    }

    Promise.all(promiseList).then((pokemonList) => { // to fire all promises at the same time
        showPokemonImages(pokemonList)
        removeButton()
        showMessage()
        listenToClickOnPokemon(pokemonList)
    }).catch((err) => {
        console.log(err)
    })
})