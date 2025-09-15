import {useContext, useEffect, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import './TodoList.css';
import {deleteTodos, getTodos, updateTodos} from "../apis/api";
import message from "antd/es/message";
import {useNavigate} from "react-router";
import {TodoGenerator} from "./TodoGenerator";
import {TodoModal} from "./TodoModal";
import {Card, Button, Empty, Typography} from "antd";
import {EditOutlined, DeleteOutlined, EyeOutlined} from "@ant-design/icons";

const {Title} = Typography;

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
        }).catch(error => {
            message.error('加载失败');
            navigate('/errorPage');
        })
    }, [navigate, dispatch]);

    function openModal(todo) {
        setEditingTodo(todo);
        setIsModalOpen(true);
    }

    function viewDetail(id) {
        console.log('点击查看详情，ID:', id); // 添加调试日志
        navigate(`/todoList/${id}`);
    }

    return (
        <div className={'todo-container'}>
            <Card className={'todo-card'}>
                <Title level={2} className={'todo-title'}>Todo List</Title>

                {state.length === 0 ? (
                    <Empty
                        description="添加一些今天需要完成的事情..."
                        className={'empty-state'}
                    />
                ) : (
                    <div className={'todo-list'}>
                        {state.map(({text, done, id}) => (
                            <Card
                                key={id}
                                className={`todo-item-card ${done ? 'done' : ''}`}
                                size="small"
                            >
                                <div className={'todo-content'}>
                                    <div
                                        className={'todo-left'}
                                        onClick={() => toggleDone(id)}
                                    >
                                        <span className={`todo-text ${done ? 'done-text' : ''}`}>
                                            {text}
                                        </span>
                                    </div>

                                    <div className={'todo-actions'}>
                                        <Button
                                            type="text"
                                            icon={<EyeOutlined />}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                console.log('按钮被点击，ID:', id);
                                                viewDetail(id);
                                            }}
                                            className={'action-button view-btn'}
                                            title="查看详情"
                                        />
                                        <Button
                                            type="text"
                                            icon={<EditOutlined />}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                openModal({id, text, done});
                                            }}
                                            className={'action-button edit-btn'}
                                            title="编辑"
                                        />
                                        <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                deleteTodo(id);
                                            }}
                                            className={'action-button delete-btn'}
                                            title="删除"
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <TodoGenerator/>
            </Card>

            <TodoModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editingTodo={editingTodo}
                setEditingTodo={setEditingTodo}
            />
        </div>
    )
}

export default TodoList