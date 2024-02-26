
const Button = ({ text, link, moreOrLessPokemon, className }) => {

    return (
        <a href={link} className={className} onClick={moreOrLessPokemon} type="button">
            {text}
        </a>
    )
}

export default Button