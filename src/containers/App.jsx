import React, {useState, useEffect} from 'react';
import Layout from '../componentes/Layout';
import Form from '../componentes/Form';
import Tasks from '../componentes/Tasks';
import {firebase} from '../firebase';

const App = () => {

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editionMode, setEditionMode] = useState(false);
    const [error, setError] = useState(null);
    const [id, setId] = useState('');

    useEffect(() => {
        const getData = async () => {
            const db = firebase.firestore();
            try{
                const data = await db.collection('tareas').get();
                const arrayData = data.docs.map(doc => ({id: doc.id,  ...doc.data()}));
                setTasks(arrayData);
            }catch(error){
                console.log(error);
            }
        }
        getData();
    }, [])

    //Create
    const addTask = e => {
        e.preventDefault();
        if(!task.trim()){
            setError('Write a task!');
            return;
        }

        const db = firebase.firestore();
        try{
            const newTask = {
                taskName: task,
                date: Date.now()
            }
            const data = db.collection('tareas').add(newTask);
            setTasks([...tasks, {...newTask, id: data.id}]);
            setTask('');
            setError(null);
        }catch(error){

        }
    }

    //Update
    const edit = task => {
        setEditionMode(true);
        setTask(task.taskName);
        setId(task.id);
    }

    const editTask = async event => {
        event.preventDefault();
        if(!task.trim()){
            setError('Write a task!');
            return;
        }
        const db = firebase.firestore(); 
        try{
            await db.collection('tareas').doc(id).update({
                taskName: task
            });
            const editingArray = tasks.map(taskItem => taskItem.id === id ? {id: id, taskName: task} : taskItem);
            setTasks(editingArray);
            setEditionMode(false);
            setTask('');
            setId('');
            setError(null);
        }catch(error){

        }
    }

    //Delete
    const deleteTask = async id => {
        const db = firebase.firestore();
        await db.collection('tareas').doc(id).delete();
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