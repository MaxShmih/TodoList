import { ChangeEvent, KeyboardEvent, useState } from "react"
import { filterValuesType } from "./App"

export type TaskType = {
	id: string,
	title: string,
	isDone: boolean
}

type PropsType = {
	title: string
	task: Array<TaskType>
	removeTask: (id: string) => void
	changeFilter: (value: filterValuesType) => void
	addTask: (title: string) => void
}

const Todolist = (props: PropsType) => {

	const [newTaskTitle, setNewTaskTitle] = useState('');
	const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value);
	}
	const onCreateNewTaskKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if ((e.keyCode === 13) || ((e.keyCode === 13) && e.ctrlKey)) {
			props.addTask(newTaskTitle)
			setNewTaskTitle("");
		}
	}
	const addTask = () => {
		props.addTask(newTaskTitle)
		setNewTaskTitle("");
	}
	const onClickFilterAllHadnler = () => { props.changeFilter('all') }
	const onClickFilterActiveHadnler = () => { props.changeFilter('active') }
	const onClickFilterCompletedHadnler = () => { props.changeFilter('completed') }
	// const onClickRemoveTaskHandler = () => { }


	return (
		<div className="wrapp">
			<h3>{props.title}</h3>
			<div>
				<input
					value={newTaskTitle}
					onChange={onNewTaskTitleChangeHandler}
					onKeyUp={onCreateNewTaskKeyPressHandler}
				/>
				<button onClick={addTask}>+</button>
			</div>
			<ul>
				{
					props.task.map((t) => {

						const onButtonRemoveHandler = () => {
							props.removeTask(t.id)
						}

						return <li key={t.id}>
							<input type="checkbox" checked={t.isDone} />
							<span>{t.title}</span>
							<button onClick={onButtonRemoveHandler}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button onClick={onClickFilterAllHadnler}>All</button>
				<button onClick={onClickFilterActiveHadnler}>Active</button>
				<button onClick={onClickFilterCompletedHadnler}>Completed</button>
			</div>
		</div>
	)
}

export default Todolist;