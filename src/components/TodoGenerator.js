import {addTodos} from "../apis/api";
import message from "antd/es/message";
import {useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import './TodoGenerator.css';

export const TodoGenerator = () => {
    const {state, dispatch} = useContext(TodoContext)
    const [inputText, setInputText] = useState('')

    async function addTodo() {
        if (inputText.trim()) {
            const todo = {text: inputText, done: false}
            try {
                await addTodos(todo);
                message.success('更改成功');
                const action = {type: 'ADD', text: inputText}
                dispatch(action)
                setInputText('')
            } catch (error) {
                message.error('添加失败');
                navigate('/errorPage');
            }
        }
    }
    return (
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
    )
}