import { useState } from "react"
import Todo from "./TodoCard"
import { TodoItem } from './components';
import Style from './TodoList.module.css'


const DUMMY: TodoItem[] = [{id: '0', title: 'Pokemon Adventure', desc: 'I wanna be the very best'}, {id: '1', title: 'lorem Ipsum', desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, sint quaerat quo sapiente asperiores perferendis corrupti doloremque praesentium quod porro labore quam accusantium molestiae delectus similique. Iusto voluptates aliquam ullam.' }]


export default function Listing() {
    const [todos, setTodos] = useState(DUMMY)


    return (<>
    <div className={Style.TodoList}>
        {todos.map(todo=>{return <Todo key={todo.id} todo={todo}/>})}
    </div>
    </>)
}