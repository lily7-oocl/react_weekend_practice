import {Modal} from "antd";
import {updateTodos} from "../apis/api";
import message from "antd/es/message";
import {useContext, useState, useEffect} from "react";
import {TodoContext} from "../contexts/TodoContext";
import { useNavigate } from 'react-router-dom';

export const TodoModal = ({isModalOpen, setIsModalOpen, editingTodo, setEditingTodo}) => {
    const [editText, setEditText] = useState('');
    const {dispatch} = useContext(TodoContext)
    const navigate = useNavigate();

    async function changeTextOfTodo() {
        if (editText.trim() && editingTodo) {
            const updatedTodo = {...editingTodo, text: editText.trim()};
            try {
                await updateTodos(editingTodo.id, updatedTodo);
                message.success('更改成功');
                dispatch({type: 'EDIT', id: editingTodo.id, text: editText.trim()});
                handleCancel();
            } catch (error) {
                message.error('更新失败');
                navigate('/errorPage');
            }
        }
    }

    function handleCancel() {
        setIsModalOpen(false);
        setEditingTodo(null);
        setEditText('');
    }

    useEffect(() => {
        if (editingTodo) {
            setEditText(editingTodo.text);
        }
    }, [editingTodo]);

    return <Modal
        title="编辑 Todo"
        open={isModalOpen}
        onOk={changeTextOfTodo}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
    >
                <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="请输入 todo 内容..."
                    rows={4}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #d9d9d9',
                        resize: 'vertical'
                    }}
                />
    </Modal>
}