import { useEffect, useState } from "react"

const API_URL = 'https://pokeapi.co/api/v2/pokemon'
const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/'

function usePokemon() {

    const [pokemones, setPokemones] = useState([])
    const [nextUrl, setNextUrl] = useState("")
    const [previousUrl, setPreviousUrl] = useState("")
    const [seeMore, setSeeMore] = useState(true)
    const [seePrevious, setSeePrevious] = useState(true)
    const [page, setPage] = useState(0)

    const fetchPokemon = async (url) => {
        const response = await fetch(url)
        const pokemon = await response.json()

        const types = pokemon.types.map(t => { return t.type.name })
        const abilities = pokemon.abilities.map(a => { return a.ability.name })
        const stats = pokemon.stats.map(s => { return { name: s.stat.name, base_stat: s.base_stat } })


        return ({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default,
            location: pokemon.location_area_encounters,
            abilities,
            types,
            stats
        })
    }

    const limit = 50
    const xp = (page - 1) * limit

    const fetchAllPokemons = async (url = API_URL) => {
        const response = await fetch(url)
        const pokemons = await response.json()
        const { previous, next, results } = pokemons
        const allPokemon = await Promise.all(results.map(pokemon => {
            const url = pokemon.url
            const poke = fetchPokemon(url)
            return poke
        }))

        return { next, previous, allPokemon }
    }

    const getPokemon = async () => {
        const { next, previous, allPokemon } = await fetchAllPokemons()

        setPreviousUrl(previous)
        setPokemones(allPokemon)
        setNextUrl(next)

    }

    const morePokemon = async () => {
        const { previous, next, allPokemon } = await fetchAllPokemons(nextUrl)
        setPokemones(allPokemon)
        next === null && setSeeMore(false)
        setNextUrl(next)
        setPreviousUrl(previous)
    }

    const lessPokemon = async () => {
        const { previous, next, allPokemon } = await fetchAllPokemons(previousUrl)
        setPokemones(allPokemon)
        previous === null && setSeePrevious(false)
        setNextUrl(next)
        setPreviousUrl(previous)
    }


    const searchPokemon = async (busqueda) => {
        const url = `${ENDPOINT}${busqueda.toLowerCase()}`
        return await fetchPokemon(url)
    }

    useEffect(() => {
        getPokemon()
    }, [])


    return {
        pokemones, lessPokemon, morePokemon, getPokemon, searchPokemon, page, nextUrl, previousUrl
    }
}

export default usePokemon