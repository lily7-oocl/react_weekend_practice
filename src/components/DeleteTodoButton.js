import {deleteTodos} from "../apis/api";
import message from "antd/es/message";
import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import './DeleteTodoButton.css';


export const DeleteTodoButton = (props) => {
    const {state, dispatch} = useContext(TodoContext)
    async function deleteTodo(id) {
        await deleteTodos(id).then(message.success('更改成功'));
        const action = {type: 'DELETE', id: id}
        dispatch(action)
    }
    return <button className={'delete-button'} onClick={() => deleteTodo(props.id)}>X</button>
};