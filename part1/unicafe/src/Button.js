
export function Button ({text, className, handleClick}){

    return(
        <button type="button" className={className} onClick={handleClick} >{text}</button>
    )
}