import './buscador.css'

const Buscador = ({ busqueda, setBusqueda, buscarPokemon }) => {
    return (
        <>
            <form id="buscador" name="buscador" className="buscador-container" onSubmit={buscarPokemon}>
                <input type="text" className="input-buscador" value={busqueda} onChange={(e) => { setBusqueda(e.target.value) }} placeholder="Busca un pokemon" name="searchbar" />
                <button className="button-dark button-search" type="submit" >Buscar</button>
            </form>
        </>
    )
}

export default Buscador