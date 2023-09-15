export function Part ({parts}){
        console.log(parts);
    return(
        <>
        {
            parts.map(part=>{
                    const {name, exercises} = part;
                    return(
                            <p key={name}>{name} {exercises}</p>
                    )
            })

        }
        </>
    )
}