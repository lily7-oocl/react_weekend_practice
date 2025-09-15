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
    const [loading, setLoading] = useState(false);
    const {dispatch} = useContext(TodoContext);
    const navigate = useNavigate();

    async function changeTextOfTodo() {
        if (editText.trim() && editingTodo) {
            setLoading(true);
            const updatedTodo = {...editingTodo, text: editText.trim()};
            try {
                await updateTodos(editingTodo.id, updatedTodo);
                message.success('更改成功');
                dispatch({type: 'EDIT', id: editingTodo.id, text: editText.trim()});
                handleCancel();
            } catch (error) {
                message.error('更新失败');
                navigate('/errorPage');
            } finally {
                setLoading(false);
            }
        } else {
            message.warning('请输入有效的待办事项内容');
        }
    }

    function handleCancel() {
        setIsModalOpen(false);
        setEditingTodo(null);
        setEditText('');
        setLoading(false);
    }

    // 处理 ESC 键关闭
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                handleCancel();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (editingTodo) {
            setEditText(editingTodo.text);
        } else {
            setEditText('');
        }
    }, [editingTodo]);

    // 处理 Enter 键提交
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            changeTextOfTodo();
        }
    };

    return (
        <Modal
            title="编辑待办事项"
            open={isModalOpen}
            onOk={changeTextOfTodo}
            onCancel={handleCancel}
            okText="确认修改"
            cancelText="取消"
            className="todo-modal"
            centered
            maskClosable={true}
            keyboard={true}
            width={460}
            destroyOnClose={true}
            confirmLoading={loading}
            zIndex={1050}
            getContainer={false}
        >
            <TextArea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="请输入待办事项内容... (Ctrl+Enter 保存)"
                rows={4}
                className="modal-textarea"
                maxLength={200}
                showCount
                autoFocus
                disabled={loading}
            />
        </Modal>
    );
};