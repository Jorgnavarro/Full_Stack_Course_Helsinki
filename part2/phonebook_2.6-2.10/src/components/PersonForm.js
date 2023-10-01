/**
 * 
 * @param handleSubmit The onSubmit function that is in the parent must be executed in the child, hence the syntax is ()=>props.handleSubmit
 * @param newName  The set value of the input
 * @param handleInputName fnction Controller that sets the value of the input in the state
 * @param newNumber The set value of the input
 * @param handleInputNumber function Controller that sets the value of the input in the state
 * @returns  Returns a form with two inputs and a button to add a new contact.
 */

export function PersonForm(props) {
    // const{ handleSubmit, newName, handleInputName, newNumber, handleInputNumber} = props;
    return (
        <form onSubmit={(e) => props.handleSubmit(e)}>
            {/*Input and label name*/}
            <div className='row g-3 align-items-center'>
                <div className='col-auto'>
                    <label htmlFor="inputName" className="col-form-label">Name:</label>
                </div>
                <div className="col-5">
                    <input
                        value={props.newName}
                        id='inputName'
                        name='name'
                        type="text"
                        onChange={props.handleInputName}
                        className="form-control m-2" placeholder="Introduce your name..." />
                </div>
            </div>
            {/*Input and label number*/}
            <div className='row g-3 align-items-center'>
                <div className='col-auto'>
                    <label htmlFor="inputNumber" className="col-form-label">Number:</label>
                </div>
                <div className="col-5">
                    <input
                        value={props.newNumber}
                        id='inputNumber'
                        name='number'
                        type="text"
                        onChange={props.handleInputNumber}
                        className="form-control m-2" placeholder="Introduce your number..." />
                </div>
            </div>
            <div className='col-6'>
                <button type="submit"
                    className="btn btn-primary px-5">
                    Add
                </button>
            </div>
        </form>
    )
}