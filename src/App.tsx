import { useState } from 'react'
import Todolist, { TaskType } from './Todolist'
import './App.css'
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type filterValuesType = "all" | "active" | "completed";

type TodolistType = {
  id: string
  title: string
  filter: filterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todoList, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]);

  let [taskObj, setTask] = useState<TaskStateType>({
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

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
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
      taskTemp.title = newTitle;
      setTask({ ...taskObj })
    }
  }

  function addTodolist(title: string, ) {
    let todoLists: TodolistType = {
      id: v1(),
      title: title,
      filter: 'all'
    }
    setTodolists([todoLists, ...todoList]);
    setTask({ ...taskObj, [todoLists.id]: []})

  }

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todoList.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);
    delete taskObj[todolistId];
    setTask({ ...taskObj });
  }

  function changeTodolistTitle (id: string, newTitle: string) {
    const todolists = todoList.find(tl => tl.id === id);
    if (todolists) {
      todolists.title = newTitle;
      setTodolists([...todoList]);
    }
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
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
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        })
      }
    </div>
  )
}


export default App
