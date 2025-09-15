import {useContext, useEffect, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import './TodoList.css';
import {deleteTodos, getTodos, updateTodos} from "../apis/api";
import message from "antd/es/message";
import {TodoGenerator} from "./TodoGenerator";
import {TodoModal} from "./TodoModal";
import { useNavigate } from 'react-router-dom';


const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const navigate = useNavigate();

    async function toggleDone(id) {
        const oldTodo = state.find(todo => todo.id === id)
        const newTodo = {...oldTodo, done: !oldTodo.done}
        try {
            await updateTodos(id, newTodo);
            message.success('更改成功');
            const action = {type: 'DONE', id: id}
            dispatch(action)
        } catch (error) {
            message.error('更新失败');
            navigate('/errorPage');
        }
    }

    async function deleteTodo(id) {
        try {
            await deleteTodos(id);
            message.success('删除成功');
            const action = {type: 'DELETE', id: id}
            dispatch(action)
        } catch (error) {
            message.error('删除失败');
            navigate('/errorPage');
        }
    }

    useEffect(() => {
        getTodos().then(response => {
            dispatch({type: 'LOAD_TODOS', todos: response.data})
        })
    }, []);

    function openModal(todo) {
        setEditingTodo(todo);
        setIsModalOpen(true);
    }

    return (
        <div className={'todo-group'}>
            <TodoModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editingTodo={editingTodo}
                setEditingTodo={setEditingTodo}
            />
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
                            <button className={'delete-button'} onClick={() => deleteTodo(id)}>X</button>
                            <button className={'edit-button'} onClick={() => openModal({id, text, done})}>edit</button>
                        </div>
                    })
                )
            }
            <TodoGenerator/>
        </div>
    )
}

export default TodoList