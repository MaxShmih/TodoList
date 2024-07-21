import { SvgIcon, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

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
		<div className="input_sett">
			<TextField id="standard-basic" label="Type your goal:" variant="standard"
				value={newTaskTitle}
				onChange={onNewTaskTitleChangeHandler}
				onKeyUp={onCreateNewTaskKeyPressHandler}
				error={!!error}
				helperText={error}
			/>
			<button className="addBtn" onClick={addTask}>
				<AddCircleOutlinedIcon />
			</button>
		</div>
	)
}