import * as React from "react";
import { TodoForm } from '../TodoForm';
import { TodoList } from '../TodoList';
import { ITodo } from '../interfaces';

export const TodosPage: React.FC = () => {
	const [todos, setTodos] = React.useState<ITodo[]>([]);

	React.useEffect(() => {
		const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
		setTodos(saved)
	}, [])

	React.useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	const addHandler = (title: string) => {
		const newTodo: ITodo = {
			title: title,
			id: Date.now(),  
			completed: false
		}
		//setTodos([newTodo, ...todos]); 
		setTodos(prev => [newTodo, ...prev]);
	}

	const toggleHandler = (id: number) => {
		setTodos(prev => prev.map(todo => {
			if(todo.id === id) {
				todo.completed = !todo.completed
			}
			return todo;
		}))
	}

	const removeHandler = (id: number) => {
		const shoudRemove = window.confirm('Вы уверены, что хтите удалить элемент?');
		if(shoudRemove) {
			setTodos(prev => prev.filter(todo => todo.id !== id));
		}
	}

	return (
		<>
			<TodoForm onAdd={addHandler} />

			<TodoList 
				todos={todos} 
				onToggle={toggleHandler} 
				onRemove={removeHandler}
			/>
		</>
	);
}