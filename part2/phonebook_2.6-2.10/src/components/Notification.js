/**
 * 
 * @param message It receives a state initiated in null, if create, update or delete operations are performed, it changes the state from null to the content set by the aforementioned operations.
 * @param className  How we use two different types of alert, we pass the class in the parent and set it in the child, so our component is reusable.
 * @returns A div containing the alert message.
 */

export function Notification({ message, className }) { 

    if(message === null){
        return null
    }


    return (
        <div className={className} role="alert">
            <strong>  {message} </strong>
        </div>
    )
}