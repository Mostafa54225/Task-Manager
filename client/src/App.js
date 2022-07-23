import './App.css';
import useAxios from './hooks/useAxios';
import { useState } from 'react';
import axios from 'axios';

import {faTrash} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const { data, reFetch } = useAxios({
    url: '/api/tasks',
    method: 'get',
    headers: JSON.stringify({accept: 'application/json'})
  })


  const [taskName, setTaskName] = useState('')
  const handleSubmit = async (e) => {
      e.preventDefault()
      await axios.post('/api/tasks', {
          name: taskName
      })
      setTaskName('')
      reFetch()
  }

  const deleteTask = async (id) => {
      await axios.delete(`/api/tasks/${id}`)
      reFetch()
  }

  const toggleCompleteTask = async (task) => {
      await axios.patch(`/api/tasks/${task._id}`, {
          completed: !task.completed
      })
      reFetch()
  }
  
  return (
    <div className="App">

    <div id="myDIV" className="header">
      <h2>Task Manager</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" id='myInput' value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Enter a task..."/>
        <button onClick={handleSubmit} className="addBtn">Add</button>
      </form>
    </div>

      {data.map((task, i) => {
        return (
          <ul id="myUL" key={i}>
            <li onClick={() => toggleCompleteTask(task)} className={task.completed ? 'checked': ''}>{task.name}</li>
            <FontAwesomeIcon icon={faTrash} className='close' onClick={() => deleteTask(task._id)} />
          </ul>
        ) 
      })}

    </div>
  );
}

export default App;
