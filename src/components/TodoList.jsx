import {useContext, useEffect, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import './TodoList.css';
import {addTodos, deleteTodos, getTodos, updateTodos} from "../apis/api";
import message from "antd/es/message";
import {TodoGenerator} from "./TodoGenerator";
import {DeleteTodoButton} from "./DeleteTodoButton";

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext)

    async function toggleDone(id) {
        const oldTodo = state.find(todo => todo.id === id)
        const newTodo = {...oldTodo, done: !oldTodo.done}
        await updateTodos(id, newTodo).then(
            message.success('更改成功')
        );
        const action = {type: 'DONE', id: id}
        dispatch(action)
    }

    useEffect(() => {
        getTodos().then(response => {
            dispatch({type: 'LOAD_TODOS', todos: response.data})
        })
    }, []);

    return (
        <div className={'todo-group'}>
            <div>Todo List</div>
            {
                state.length === 0 ? (
                    <div>add some things you need to do today...</div>
                ) : (
                    state.map(({text, done, id}) => {
                        return <div key={id} className={'todo-div'}>
                            <div className={`todo-item ${done ? 'done' : ''}`}>
                                <span onClick={() => toggleDone(id)}>{text}</span>
                            </div>
                            <DeleteTodoButton id={id}/>
                        </div>
                    })
                )
            }
            <TodoGenerator/>
        </div>
    )
}

export default TodoList