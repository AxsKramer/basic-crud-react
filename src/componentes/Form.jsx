import React from 'react';

const Form = (props) => {
    const {error, addTask, editTask, editionMode, setTask, task} = props;
    return ( 
        <div className="col-4">
          <h4 className="text-center text-white">
            {
              editionMode ? 'Edit Task' : 'Add Task'
            }
          </h4>
          <form onSubmit={editionMode ? editTask : addTask} >
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="Enter a task"
              name='task'
              onChange={ e => setTask(e.target.value)}
              value = {task}
            />
            {
              editionMode 
              ? <button className="btn btn-warning btn-block waves-effect waves-light" type="submit">Save Changes</button>
              : <button className="btn btn-dark btn-block waves-effect waves-light" type="submit">Add</button>
            }
          </form>
        </div>
     );
}
 
export default Form;