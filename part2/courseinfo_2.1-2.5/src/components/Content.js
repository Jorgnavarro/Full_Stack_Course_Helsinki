import { Part } from "./Part"

/**
 * 
 * @param parts corresponde al array que está dentro del objeto Course que contiene el listado a renderizar. 
 * @returns un ul que mapea la lista de contenidos del objeto Course y una p(con la suma total de los ejercicios del objeto Course)
 */

export function Content({parts}){
    
    const totalExercises = parts.reduce((sum, value)=>{
        return sum + value.exercises
    }, 0)
    console.log(totalExercises);
    return(
            <ul className="list_course">
                {parts.map(part=>{
                        return <Part key={part.id} part={part}/>
                })}
                <p><b>Total of {totalExercises} exercises</b></p>
            </ul>
    )
}