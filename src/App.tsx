import { useState } from 'react'
import Todolist, { TaskType } from './Todolist'
import './App.css'
import { v1 } from 'uuid';

export type filterValuesType = "all" | "active" | "completed";

type TodolistType = {
  id: string
  title: string
  filter: filterValuesType
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todoList, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'active' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]);

  let [taskObj, setTask] = useState({
    [todolistId1]: [
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Codewars', isDone: false },
      { id: v1(), title: 'Practice', isDone: false }],
    [todolistId2]: [
      { id: v1(), title: 'Juice', isDone: true },
      { id: v1(), title: 'Potota', isDone: false },
      { id: v1(), title: 'Meat', isDone: false }],
  });


  function changeFilter(value: filterValuesType, todolistId: string) {
    let todolistTemp = todoList.find(tl => tl.id === todolistId);
    if (todolistTemp) {
      todolistTemp.filter = value;
      setTodolists([...todoList]);
    }
  }

  function removeTask(id: string, todolistId: string) {
    let task = taskObj[todolistId];
    let filteredTask = task.filter((t) => {
      if (t.id !== id) {
        return true
      } else {
        return false
      }
    })
    taskObj[todolistId] = filteredTask;
    setTask({ ...taskObj });
  }

  function addTask(title: string, todolistId: string) {
    let task = taskObj[todolistId];
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    };
    let newTasks = [newTask, ...task];
    taskObj[todolistId] = newTasks;
    setTask({ ...taskObj });
  }

  function changeInputStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = taskObj[todolistId];
    let taskTemp = tasks.find((t) => {
      if (t.id === taskId) {
        return true;
      }
      else {
        return false;
      }
    })
    if (taskTemp) {
      taskTemp.isDone = isDone;
      setTask({ ...taskObj })
    }

  }

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todoList.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);
    delete taskObj[todolistId];
    setTask({...taskObj});
  }

  return (
    <div className="App">
      {
        todoList.map((tl) => {

          let taskForTodoList = taskObj[tl.id];

          if (tl.filter === 'completed') {
            taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
          }
          if (tl.filter === 'active') {
            taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
          }

          return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            task={taskForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeInputStatus={changeInputStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        })
      }

    </div>
  )
}


export default App
