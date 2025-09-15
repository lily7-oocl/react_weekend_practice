import {addTodos} from "../apis/api";
import message from "antd/es/message";
import {useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {useNavigate} from "react-router";
import './TodoGenerator.css';
import {Input, Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

export const TodoGenerator = () => {
    const {state, dispatch} = useContext(TodoContext)
    const [inputText, setInputText] = useState('')
    const navigate = useNavigate();

    async function addTodo() {
        if (inputText.trim()) {
            const todo = {text: inputText, done: false}
            try {
                await addTodos(todo);
                message.success('添加成功');
                const action = {type: 'ADD', text: inputText}
                dispatch(action)
                setInputText('')
            } catch (error) {
                message.error('添加失败');
                navigate('/errorPage');
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    }

    return (
        <div className={'add-todo-section'}>
            <div className={'add-todo-input-group'}>
                <div className={'todo-input-container'}>
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="添加新的待办事项..."
                        className={'todo-input-antd'}
                        size="large"
                    />
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addTodo}
                    className={'add-button-antd'}
                    size="large"
                >
                    添加
                </Button>
            </div>
        </div>
    )
}