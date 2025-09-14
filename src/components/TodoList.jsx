import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import './TodoList.css';

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext)

    function toggleDone(id) {
        const action = {type: 'DONE', id: id}
        dispatch(action)
    }

    return (
        <div className={'todo-group'}>
            <div>This is the TodoList Component.</div>
            {
                state.map(({text, done, id}) => {
                    console.log("render todo:", text, done)
                    return <div className={`todo-item ${done ? 'done' : ''}`}
                                onClick={() => toggleDone(id)}>{text}</div>
                })
            }
        </div>
    );
}

export default TodoList