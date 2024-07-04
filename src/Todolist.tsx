import { ChangeEvent, KeyboardEvent, useState } from "react"
import { filterValuesType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"

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
	changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
	filter: filterValuesType
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
}

const Todolist = (props: PropsType) => {

	const removeTodolist = () => {
		props.removeTodolist(props.id);
	}

	const changeTodolistTitle = (newTitle: string) => {
		props.changeTodolistTitle(props.id, newTitle)
	}

	const onClickFilterAllHadnler = () => { props.changeFilter('all', props.id) }
	const onClickFilterActiveHadnler = () => { props.changeFilter('active', props.id) }
	const onClickFilterCompletedHadnler = () => { props.changeFilter('completed', props.id) }

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	return (
		<div className="wrapp">
			<div className="head">
				<h3><EditableSpan title={props.title} onChange={changeTodolistTitle} /></h3>
				<button onClick={removeTodolist}>X</button>
			</div>
			<AddItemForm 
			addItem={addTask}
			/>
			<ul>
				{
					props.task.map((t) => {
						const onChangeInputCheckerHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeInputStatus(t.id, e.currentTarget.checked, props.id)
						}
						const onChangeTitleCheckerHandler = (newValue: string) => {
							props.changeTaskTitle(t.id, newValue, props.id)
						}
						const onButtonRemoveHandler = () => {
							props.removeTask(t.id, props.id)
						}

						return <li key={t.id} className={t.isDone === true ? 'done_task' : ''} >
							<input
								type="checkbox"
								checked={t.isDone}
								onChange={onChangeInputCheckerHandler}
								className='error'
							/>
							<EditableSpan 
							title={t.title}
							onChange={onChangeTitleCheckerHandler}
							/>
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