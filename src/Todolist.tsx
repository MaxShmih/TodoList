import { ChangeEvent, KeyboardEvent, useState } from "react"
import { filterValuesType } from "./App"

export type TaskType = {
	id: string,
	title: string,
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	task: Array<TaskType>
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (value: filterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeInputStatus: (taskId: string, isDone: boolean, todolistId: string) => void
	filter: filterValuesType
	removeTodolist: (todolistId : string) => void
}

const Todolist = (props: PropsType) => {

	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value);
	}
	const onCreateNewTaskKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if ((e.keyCode === 13) || ((e.keyCode === 13) && e.ctrlKey)) {
			if (newTaskTitle.trim() !== '') {
				props.addTask(newTaskTitle, props.id)
				setNewTaskTitle("");
			} else { setError('Title is required') }
		}
	}

	const addTask = () => {
		if (newTaskTitle.trim() === '') {
			setError('Title is required')
		}
		else {
			props.addTask(newTaskTitle.trim(), props.id)
			setNewTaskTitle("");
		}
	}

	const removeTodolist = () => {
		props.removeTodolist(props.id);
	}

	const onClickFilterAllHadnler = () => { props.changeFilter('all', props.id) }
	const onClickFilterActiveHadnler = () => { props.changeFilter('active', props.id) }
	const onClickFilterCompletedHadnler = () => { props.changeFilter('completed', props.id) }

	return (
		<div className="wrapp">
			<div className="head">
				<h3>{props.title}</h3>
				<button onClick={removeTodolist}>X</button>
			</div>
			<div>
				<input
					value={newTaskTitle}
					onChange={onNewTaskTitleChangeHandler}
					onKeyUp={onCreateNewTaskKeyPressHandler}
					className={error ? 'error' : ''}
				/>
				<button onClick={addTask}>+</button>
				{error && <div className="error_message">{error}</div>}
			</div>
			<ul>
				{
					props.task.map((t) => {
						const onChangeImputCheckerHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeInputStatus(t.id, e.currentTarget.checked, props.id)
						}
						const onButtonRemoveHandler = () => {
							props.removeTask(t.id, props.id)
						}

						return <li key={t.id} className={t.isDone === true ? 'done_task' : ''} >
							<input
								type="checkbox"
								checked={t.isDone}
								onChange={onChangeImputCheckerHandler}
								className='error'
							/>
							<span>{t.title}</span>
							<button onClick={onButtonRemoveHandler}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button className={props.filter === 'all' ? 'active_filter' : ""}
					onClick={onClickFilterAllHadnler}>All</button>
				<button className={props.filter === 'active' ? 'active_filter' : ""}
					onClick={onClickFilterActiveHadnler}>Active</button>
				<button className={props.filter === 'completed' ? 'active_filter' : ""}
					onClick={onClickFilterCompletedHadnler}>Completed</button>
			</div>
		</div>
	)
}

export default Todolist;