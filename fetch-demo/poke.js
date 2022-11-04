function randomNumberGenerator() {
    let random = Math.random() // return random number from 0 to 1
    let randomUpto808 = random * 808 // returns random number from 0 to 808
    let roundedRandomNumber = Math.round(randomUpto808) // random integer from 0 to 808
    return roundedRandomNumber
}

async function getPokemonData() {
    // const fetchPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumberGenerator()}`)
    //     .then((response) => {
    //         return response.json() // returns the data from the response - .json also returns a promise
    //     })

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumberGenerator()}`)
    const pokemonData = await response.json()
    return pokemonData

    // return fetchPromise
}

// document.getElementById("button").addEventListener("click", () => {
//     let pokemonList = []
//     getPokemonData().then((data) => {
//         pokemonList.push(data)
//         return getPokemonData() // it returns a promise so that we can chain further using .then
//     }).then((data) => {
//         pokemonList.push(data)
//         return getPokemonData() // similar to above
//     }).then((data) => {
//         pokemonList.push(data)
//         return getPokemonData()
//     }).then((data) => {
//         pokemonList.push(data)
//         return getPokemonData()
//     }).then((data) => {
//         pokemonList.push(data)
//         console.log(pokemonList)
//     }).catch((err) => {
//         console.log(err)
//     })
// })

document.getElementById("button").addEventListener("click", () => {
    let promiseList = []

    for(let i = 0; i < 5; i++) { // to loop 5 times for 5 pokemons
        let promise = getPokemonData().then((data) => {
            return data
        })
        promiseList.push(promise) // make a list of promises
    }

    Promise.all(promiseList).then((pokemonList) => { // to fire all promises at the same time
        console.log(pokemonList)
    }).catch((err) => {
        console.log(err)
    })
})