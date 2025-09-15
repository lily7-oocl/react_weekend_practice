import {NavLink, Outlet} from "react-router";
import {Layout, Menu} from "antd";
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    HomeOutlined,
    MonitorOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import './DefaultLayout.css';

const {Header, Content} = Layout;

const items = [{
    label: <NavLink to={'/'}>首页</NavLink>,
    key: 'home',
    icon: <HomeOutlined/>
}, {
    label: <NavLink to={'/todoList'}>待办清单</NavLink>,
    key: 'todoList',
    icon: <UnorderedListOutlined/>
}, {
    label: <NavLink to={'/about'}>关于</NavLink>,
    key: 'about',
    icon: <MonitorOutlined/>
}, {
    label: <NavLink to={'/errorPage'}>错误页面</NavLink>,
    key: 'errorPage',
    icon: <ExclamationCircleOutlined />
}, {
    label: <NavLink to={'/donePage'}>完成页面</NavLink>,
    key: 'donePage',
    icon: <CheckCircleOutlined />
}]

export function DefaultLayout() {
    return (
        <Layout className="layout-container">
            <Header className="header-glass">
                <div className="logo">
                    <UnorderedListOutlined className="logo-icon" />
                    <span className="logo-text">TodoApp</span>
                </div>
                <Menu
                    className="menu-glass"
                    mode="horizontal"
                    items={items}
                    selectable={false}
                />
            </Header>
            <Content className="content-glass">
                <main className="main-content">
                    <Outlet />
                </main>
            </Content>
        </Layout>
    );
}