import { useState } from 'react'
import Todolist, { TaskType } from './Todolist'
import './App.css'
import { v1 } from 'uuid';

export type filterValuesType = "all" | "active" | "completed";

function App() {

  // let task2: Array<TaskType> = [
  //   {id: 1, title: 'OldTraff', isDone: false},
  //   {id: 2, title: 'Olympiysk', isDone: true},
  //   {id: 3, title: 'Camp', isDone: false},
  // ]

  const [task, setTask] = useState<Array<TaskType>>([
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Codewars', isDone: false },
    { id: v1(), title: 'Practice', isDone: false },
  ]);
  const [filter, setFilter] = useState<filterValuesType>('all')

  let taskForTodoList = task;
  if (filter === 'completed') {
    taskForTodoList = task.filter(t => t.isDone === true)
  }
  if (filter === 'active') {
    taskForTodoList = task.filter(t => t.isDone === false)
  }

  function changeFilter(value: filterValuesType) {
    setFilter(value);
  }

  function removeTask(id: string) {
    let filteredTask = task.filter((t) => {
      if (t.id !== id) {
        return true
      } else {
        return false
      }
    })
    setTask(filteredTask);
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title, 
      isDone: false
    };
    let newTasks = [newTask, ...task];
    setTask(newTasks);
  }






  return (
    <>
      <Todolist
        title='Programming'
        task={taskForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
      {/* <Todolist title='Stadium' task={task2} removeTask={removeTask}/> */}
    </>
  )
}


export default App
