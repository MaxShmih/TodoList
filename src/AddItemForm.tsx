import { Add, Delete } from "@mui/icons-material";
import { Button, Fab, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value);
	}

	const onCreateNewTaskKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if ((e.keyCode === 13) || ((e.keyCode === 13) && e.ctrlKey)) {
			if (newTaskTitle.trim() !== '') {
				props.addItem(newTaskTitle)
				setNewTaskTitle("");
			} else { setError('Title is empty') }
		}
	}

	const addTask = () => {
		if (newTaskTitle.trim() === '') {
			setError('Title is required')
		}
		else {
			props.addItem(newTaskTitle.trim())
			setNewTaskTitle("");
		}
	}

	return (
		<div>
			<TextField id="standard-basic" label="Type your plan:" variant="standard"
				value={newTaskTitle}
				onChange={onNewTaskTitleChangeHandler}
				onKeyUp={onCreateNewTaskKeyPressHandler}
				error={!!error}
				helperText={error}
			/>
			<Fab size="small" color="primary" aria-label="add" onClick={addTask}>
				<Add />
			</Fab>
		</div>
	)
}