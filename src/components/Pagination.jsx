import Button from './Button'

const Pagination = ({ onLeftCLick, onRightClick, page, totalPages }) => {

    return (
        <>
            < div className='prev-next-buttons' >
                <Button /*link={previousUrl }  onClick={} */ text="Anteriores 20" />
                <Button onRightClick={() => {getPokemon(nextUrl)}} text="Siguientes 20" />
            </div >
        </>
    )
}
export default Pagination