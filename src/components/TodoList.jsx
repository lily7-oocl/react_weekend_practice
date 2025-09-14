import {useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import './TodoList.css';

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext)
    const [inputText, setInputText] = useState('')

    function toggleDone(id) {
        const action = {type: 'DONE', id: id}
        dispatch(action)
    }

    function deleteTodo(id) {
        const action = {type: 'DELETE', id: id}
        dispatch(action)
    }

    function addTodo() {
        if (inputText.trim()) {
            const action = {type: 'ADD', text: inputText}
            dispatch(action)
            setInputText('')
        }
    }

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
                            <button className={'delete-button'} onClick={() => deleteTodo(id)}>X</button>
                        </div>
                    })
                )
            }
            <div className={'add-todo-div'}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter a new todo..."
                    className={'todo-input'}
                />
                <button onClick={addTodo} className={'add-button'}>Add</button>
            </div>
        </div>
    )
}

export default TodoList