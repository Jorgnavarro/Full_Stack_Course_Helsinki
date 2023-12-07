/**
 * 
 * @param handleFilter corresponds to the input function that sets its value in the filterName, which detects every time there is a change in the input
 *  @param filterName corresponds to the value of the input that starts at undefined because it is empty. This is done to transform our component into a controlled component.
 * @returns an input which can filter the list of stored contacts.
 */

export function Filter({handleFilter, filterName}) {

    return (
        <div className="row g-3 align-items-center">
            <div className="col-auto">
                <label htmlFor="filter" className="col-form-label">Filter contacts by letter or name: </label>
            </div>
            <div className="col-4">
                <input onChange={(e)=>handleFilter(e)} type="text" className="form-control" name="filter" id='filter'
                    value={filterName} />
            </div>
        </div>
    )
}