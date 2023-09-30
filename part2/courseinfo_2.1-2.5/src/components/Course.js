import { Content } from "./Content";
import { Header } from "./Header";
/**
 * 
 * @param course recibe un objeto que distribuye la información en dos componentes.
 * @returns un div con el componente Header, que contiene el nombre del objeto course y el componente Content que contiene un array dentro del objeto con el contenido a renderizar.
 */

export function Course ({course}){
    console.log(course.name);
    return(
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}