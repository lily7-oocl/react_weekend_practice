import {useParams, useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {getTodos} from "../apis/api";
import {Card, Button, Tag, Typography, Space, Divider, Spin} from "antd";
import {ArrowLeftOutlined, CheckCircleOutlined, ClockCircleOutlined, CalendarOutlined} from "@ant-design/icons";
import message from "antd/es/message";
import './TodoDetail.css';

const {Title, Text, Paragraph} = Typography;

export const TodoDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {state, dispatch} = useContext(TodoContext);
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodoDetail = async () => {
            try {
                setLoading(true);
                console.log('查找待办事项 ID:', id, '类型:', typeof id);
                console.log('当前 state:', state);

                // 直接从 API 获取最新数据
                const response = await getTodos();
                const todos = response.data;
                console.log('API 返回的数据:', todos);

                // 更新本地 state
                dispatch({type: 'LOAD_TODOS', todos: todos});

                // 查找对应的待办事项 - 同时处理字符串和数字 ID
                const foundTodo = todos.find(item =>
                    item.id === parseInt(id) || item.id === id || item.id.toString() === id
                );
                console.log('找到的待办事项:', foundTodo);

                if (foundTodo) {
                    setTodo(foundTodo);
                } else {
                    console.error('未找到 ID 为', id, '的待办事项');
                    message.error('未找到该待办事项');
                    navigate('/todoList');
                }
            } catch (error) {
                console.error('获取待办事项详情失败：', error);
                message.error('获取待办事项详情失败');
                navigate('/errorPage');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTodoDetail();
        }
    }, [id, dispatch, navigate]);

    if (loading) {
        return (
            <div className="todo-detail-container">
                <Card className="todo-detail-card">
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <Spin size="large" />
                        <div style={{ marginTop: 16, color: '#666' }}>
                            正在加载待办事项详情...
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (!todo) {
        return (
            <div className="todo-detail-container">
                <Card className="todo-detail-card">
                    <div className="detail-not-found">
                        <Space direction="vertical" size="large" align="center">
                            <ClockCircleOutlined style={{ fontSize: 48, color: '#ccc' }} />
                            <Title level={3} style={{ color: '#999', margin: 0 }}>
                                未找到该待办事项
                            </Title>
                            <Text type="secondary">
                                该待办事项可能已被删除或不存在
                            </Text>
                            <Button
                                type="primary"
                                icon={<ArrowLeftOutlined />}
                                onClick={() => navigate('/todoList')}
                                className="primary-action action-button"
                            >
                                返回列表
                            </Button>
                        </Space>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="todo-detail-container">
            <Card className="todo-detail-card">
                <div className="detail-header">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/todoList')}
                        className="back-button"
                    >
                        返回
                    </Button>
                    <Title level={2} className="detail-title">
                        待办事项详情
                    </Title>
                </div>

                <Divider className="detail-divider" />

                <div className="detail-content">
                    <div className="detail-section">
                        <div className="detail-label">
                            <CalendarOutlined className="detail-icon" />
                            <Text strong>ID编号</Text>
                        </div>
                        <div className="detail-value">
                            <Tag className="detail-id">#{todo.id}</Tag>
                        </div>
                    </div>

                    <div className="detail-section">
                        <div className="detail-label">
                            {todo.done ? (
                                <CheckCircleOutlined className="detail-icon" style={{ color: '#52c41a' }} />
                            ) : (
                                <ClockCircleOutlined className="detail-icon" style={{ color: '#faad14' }} />
                            )}
                            <Text strong>状态</Text>
                        </div>
                        <div className="detail-value">
                            <Tag
                                className="status-tag"
                                color={todo.done ? 'success' : 'warning'}
                                style={{
                                    color: todo.done ? '#52c41a' : '#faad14',
                                    fontWeight: 500
                                }}
                            >
                                {todo.done ? '已完成' : '待完成'}
                            </Tag>
                        </div>
                    </div>

                    <div className="detail-section detail-text-section">
                        <div className="detail-label" style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
                            <Text strong>内容</Text>
                        </div>
                        <div className="detail-value">
                            <Card className="content-card">
                                <Paragraph
                                    className={`todo-content-text ${todo.done ? 'completed-content' : ''}`}
                                >
                                    {todo.text}
                                </Paragraph>
                            </Card>
                        </div>
                    </div>

                    <div className="detail-actions">
                        <Space size="middle">
                            <Button
                                icon={<ArrowLeftOutlined />}
                                onClick={() => navigate('/todoList')}
                                className="action-button secondary-action"
                            >
                                返回列表
                            </Button>
                        </Space>
                    </div>
                </div>
            </Card>
        </div>
    );
};