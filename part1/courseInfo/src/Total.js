
export function Total ({parts}){
    
    function sumarExercises(array){
        let suma = 0
        array.forEach(e =>{
            suma += e.exercises
        })
        return suma;
    }
    const totalExercises = sumarExercises(parts);
    
    return(
        <p>Number of exercises {totalExercises}</p>
    )
}