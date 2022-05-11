import { TodoItem } from './components';
import Classes from './TodoCard.module.css'

interface TodoProps {
    todo: TodoItem
}

export default function Todo({todo}: TodoProps) {
    return (<><div className={Classes.Card}>
        <p className={Classes.Title}>{todo.title}</p>
        <p>{todo.desc}</p>
        </div>
    </>)
}