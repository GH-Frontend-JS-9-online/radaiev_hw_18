import * as React from 'react';

interface TodoFormProps {
	onAdd(title: string): void
}

export const TodoForm: React.FC<TodoFormProps> = (props) => {
	// const [title, setTitle] = React.useState<string>('');
	const ref = React.useRef<HTMLInputElement>(null);

	// const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setTitle(event.target.value);
	// }

	const keyPressHandler = (event: React.KeyboardEvent) => {
		// KeyboardEvent - включает событие на клавиши
		if (event.key === 'Enter') {
			props.onAdd(ref.current!.value)
			ref.current!.value = '';
			// console.log(title);
			// setTitle('');
		}
	}

	return (
		<div className="input-field mt2">
			<label htmlFor="title" className="actitve"></label>
			<input 
				// onChange={changeHandler} 
				// value={title} type="text"
				ref={ref}
			    id="title" 
			    placeholder="Введите название дела"
			    onKeyPress={keyPressHandler} //onKeyPress событие нажатия клавиши
			    />
		</div>
	);
}