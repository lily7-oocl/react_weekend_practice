import {Modal, Input} from "antd";
import {updateTodos} from "../apis/api";
import message from "antd/es/message";
import {useContext, useState, useEffect} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {useNavigate} from "react-router";
import './TodoModal.css';

const {TextArea} = Input;

export const TodoModal = ({isModalOpen, setIsModalOpen, editingTodo, setEditingTodo}) => {
    const [editText, setEditText] = useState('');
    const {dispatch} = useContext(TodoContext);
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

    return (
        <Modal
            title="编辑待办事项"
            open={isModalOpen}
            onOk={changeTextOfTodo}
            onCancel={handleCancel}
            okText="确认修改"
            cancelText="取消"
            className={'todo-modal'}
            centered
            maskClosable={false}
            width={480}
        >
            <TextArea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="请输入待办事项内容..."
                rows={4}
                className={'modal-textarea'}
                maxLength={200}
                showCount
                autoFocus
            />
        </Modal>
    )
}