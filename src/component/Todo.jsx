import React, { useEffect, useState } from "react";
import { faUpload, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './Todo.module.scss'

function Todo({ todo, onUpdate, onDelete }) {
    const [title, setTitle] = useState(todo.title);

    return (<article key={todo.id}>
        <div className="todo">
            <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id}
                onChange={() => {
                    onUpdate({ ...todo, completed: !todo.completed })
                    // updateTodoMutation(
                    //     { ...todo, completed: !todo.completed }
                    // )
                }}
            />
            <input type="text"
                value={title}
                id={todo.id}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />
            {/* <label htmlFor={todo.id}>{todo.title}</label> */}
        </div>
        <div className={style.editDiv}>
            <button
                disabled={todo.title == title}
                onClick={() => onUpdate({ ...todo, title: title })}
            ><FontAwesomeIcon icon={faPencil} /></button>
            <button className="trash" onClick={() => onDelete(todo.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    </article>);
}

export default Todo;
