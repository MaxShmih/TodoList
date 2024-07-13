import { Edit } from "@mui/icons-material";
import { Fab, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
	title: string
	onChange: (newValue: string) => void
}
export function EditableSpan(props: EditableSpanPropsType) {
	const [editMode, setEditMode] = useState(false);
	let [title, setTitle] = useState(props.title);

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	}

	const activateEditMode = () => {
		setEditMode(true);
		setTitle(props.title)
	}

	const activateViewMode = () => {
		setEditMode(false);
		props.onChange(title);
	}

	return editMode ?
		<TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
		: <span onDoubleClick={activateEditMode}>{props.title}</span>

}