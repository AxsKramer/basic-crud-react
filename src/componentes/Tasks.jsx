import React from 'react'

const Tasks = (props) => {
    const {tasks, deleteTask, edit} = props;
    return ( 
        <div className="col-8">
          <h4 className="text-center text-white">List of tasks</h4>
          <ul className="list-group">
            {
              tasks.length === 0 
                ? <li className="list-group-item text-center">No tasks</li>
                : (
                tasks.map(task => (
                  <li key={task.id} className="list-group-item">
                    {task.taskName}
                    <button 
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <button 
                      className="btn btn-warning btn-sm float-right"
                      onClick={() => edit(task)}
                    >
                      Edit
                    </button>
                  </li>
                ))
              )
            }
          </ul>
        </div>
     );
}
 
export default Tasks;