import './pokemones.css'
import usePokemon from '../hooks/usePokemon'

import Buscador from './Buscador'
import { useState } from 'react'
import DetallePokemon from './DetallePokemon'
import Button from './Button'

//?limit=1024&offset=0

// eslint-disable-next-line react/prop-types
function Pokemon({ id, name, types, image, abilities, stats, location, verPokemon }) {
    return (
        <div className="pkmn-card"
            onClick={verPokemon}
            key={id}
            id={id}>
            <img className="pkmn-image" src={image} />
            <p className="pkmn-id">#{id < 10
                ? `000${id}`
                : id >= 10 && id < 100
                    ? `00${id}`
                    : id >= 100 && id < 1000
                        ? `0${id}`
                        : id
            }
            </p>
            <h2 className="pkmn-name">{name}</h2>
            <div className="pkmn-types">
                {
                    // eslint-disable-next-line react/prop-types
                    types.map(type => {
                        return <p className={`pkmn-type ${type}`} key={name + type} >{type} </p>
                    })

                }
            </div>
        </div>
    )

}

const Pokemones = () => {

    const { pokemones, morePokemon, getPokemon, searchPokemon, page, lessPokemon, nextUrl, previousUrl } = usePokemon()
    const [busqueda, setBusqueda] = useState("")
    const [mostrarPokemon, setMostrarPokemon] = useState({ mostrar: false, pokemon: {} })


    const verPokemon = (pokemon) => {
        setMostrarPokemon({ mostrar: true, pokemon })
    }
    const noVerPokemon = () => {
        setMostrarPokemon({ mostrar: false, pokemon: {} })
        setBusqueda("")
    }

    const buscarPokemon = async (e) => {
        e.preventDefault();

        if (!busqueda) return
        const pokemon = await searchPokemon(busqueda)
        verPokemon(pokemon)
        return pokemon

    }


    return (
        <>
            <DetallePokemon {...mostrarPokemon} cerrar={noVerPokemon} />
            <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon} />
            <div className="container-pokemon">
                {pokemones
                    ? pokemones.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)} />)
                    : < span > Cargando </span>
                }
            </div>
            < div className='prev-next-buttons' >
                <Button moreOrLessPokemon={lessPokemon} className={`button-dark lessPokemon`} text="Anteriores 20" />
                <Button moreOrLessPokemon={morePokemon} className={`button-dark morePokemon`} text="Siguientes 20" />
            </div >
        </>
    )
}

export default Pokemones