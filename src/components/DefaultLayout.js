import {NavLink, Outlet} from "react-router";
import {Layout, Menu} from "antd";
import Content from "antd/es/layout/layout";
import {HomeOutlined, MonitorOutlined, UnorderedListOutlined} from "@ant-design/icons";

const items = [{
    label: <NavLink to={'/'}>Home</NavLink>,
    key: 'home',
    icon: <HomeOutlined/>
}, {
    label: <NavLink to={'/todoList'}>Todo list</NavLink>,
    key: 'todoList',
    icon: <UnorderedListOutlined/>
}, {
    label: <NavLink to={'/about'}>About</NavLink>,
    key: 'about',
    icon: <MonitorOutlined/>
}]

export function DefaultLayout() {
    return <>
        <Layout>
            <header>
                <Menu theme="dark" mode="horizontal" items={items}>
                </Menu>
            </header>
            <Content>
                <main>
                    <Outlet></Outlet>
                </main>
            </Content>
            <footer>footer copyright</footer>
        </Layout>
    </>
}