import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import './TodoList.css';

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext)

    function toggleDone(id) {
        const action = {type: 'DONE', id: id}
        dispatch(action)
    }

    function deleteTodo(id) {
        const action = {type: 'DELETE', id: id}
        dispatch(action)
    }

    return (
        <div className={'todo-group'}>
            <div>This is the TodoList Component.</div>
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
        </div>
    )
}

export default TodoList