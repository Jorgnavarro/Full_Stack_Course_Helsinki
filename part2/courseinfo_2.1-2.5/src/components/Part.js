/**
 * 
 * @param part es la parte del objeto que tiene el contenido(un array dentro de un objeto), en este caso se hace una desestructuración para obtener el name y exercises 
 * @returns un elemento en un li que renderiza el nombre y la cantidad de ejercicios
 */
export function Part ({part}){
    return <li>{part.name} {part.exercises}</li>
}