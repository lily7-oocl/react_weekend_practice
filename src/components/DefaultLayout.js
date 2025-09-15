import {NavLink, Outlet} from "react-router";
import {Layout, Menu} from "antd";
import Content from "antd/es/layout/layout";

const items = [{
    label: <NavLink to={'/'}>Home</NavLink>,
    key: 'home'
}, {
    label: <NavLink to={'/todoList'}>Todo list</NavLink>,
    key: 'todoList'
}, {
    label: <NavLink to={'/about'}>About</NavLink>,
    key: 'about'
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