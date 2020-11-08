import React, {useState} from 'react';
import Layout from '../componentes/Layout';
import Form from '../componentes/Form';
import Tasks from '../componentes/Tasks';
import shortid from 'shortid';

const App = () => {

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editionMode, setEditionMode] = useState(false);
    const [error, setError] = useState(null);
    const [id, setId] = useState('');

    //Create
    const addTask = e => {
        e.preventDefault();
        if(!task.trim()){
            setError('Write a task!');
            return;
        }
        setTasks([...tasks, { taskName: task, id: shortid.generate() } ]);
        e.target[0].value = '';
        setTask('');
        setError(null);
    }

    //Update
    const edit = task => {
        setEditionMode(true);
        setTask(task.taskName);
        setId(task.id);
    }

    const editTask = event => {
        event.preventDefault();
        if(!task.trim()){
            setError('Write a task!');
            return;
        }
        const editingArray = tasks.map(taskItem => taskItem.id === id ? {id: id, taskName: task} : taskItem);
        setTasks(editingArray);
        event.target[0].value = '';
        setEditionMode(false);
        setTask('');
        setId('');
        setError(null); 
    }

    //Delete
    const deleteTask = id => {
        const arrayTasks = tasks.filter(task => task.id !== id);
        setTasks(arrayTasks);
    }

    return (
        <Layout>
            <Tasks tasks={tasks} deleteTask={deleteTask} edit={edit}/>
            <Form 
                task={task}
                addTask={addTask} 
                editionMode={editionMode}
                error={error}
                setTask={setTask}
                editTask={editTask}
            />
        </Layout>

      );
}
 
export default App;