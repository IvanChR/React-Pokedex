import './DetallePokemon.css'

const DetallePokemon = ({ mostrar, pokemon, cerrar }) => {

    return (
        <>
            <div className="modal-container" onClick={cerrar} style={{ display: mostrar ? 'grid' : 'none' }}>
                <section className="modal-body">

                    <div className="imagen-container">
                        <img src={pokemon.image} alt={pokemon.name} className="img-detalle" />
                        <section>
                            {pokemon.types?.map((type, index) => <span key={index} className={`type ${type}`}>{type} </span>)}
                        </section>
                    </div>
                    <div className="data">
                        <h2 className="titulo">{pokemon.name} #{pokemon.id}</h2>
                        <h3 className="titulo-seccion">Habilidades</h3>
                        {pokemon.abilities?.map(ability => <span className="tag">{ability}</span>)}
                        <h3 className="titulo-seccion">Estadisticas</h3>
                        <div className="stats">
                            {
                                pokemon.stats?.map((stat, index) =>
                                    <section key={stat.name} id={stat.name}>
                                        <span className="puntos"> {stat.base_stat}</span>
                                        <span className=""> {stat.name}</span>
                                    </section>
                                )
                            }
                        </div>

                    </div>
                </section >
            </div >

        </>
    )
}

export default DetallePokemon