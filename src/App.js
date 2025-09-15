import {useReducer} from "react";
import './App.css';
import {initialState, todoReducer} from "./reducers/todoReducer";
import {createBrowserRouter, NavLink, Outlet, RouterProvider} from "react-router";


function  DefaultLayout(){
    return <>
        <header>
            <nav>
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/todoList'}>Todo list</NavLink></li>
                    <li><NavLink to={'/about'}>About</NavLink></li>
                </ul>
            </nav>
        </header>
        <main>
            <h1>xxx</h1>
            <Outlet></Outlet>
        </main>
        <footer>footer copyright</footer>
    </>
}
const routes=[
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [{
            path: '',
            elements: <h1>Home Page</h1>,
        },{
            path: 'about',
            elements: <h1>About us</h1>
        }]
    }
]
const router = createBrowserRouter(routes);
function App() {
    // the Hooks API manage component data state
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const value = {state, dispatch};
    return (
        <div className="App">
            <RouterProvider router={router}></RouterProvider>
            {/*<TodoContext.Provider value={value}>*/}
            {/*    <TodoList/>*/}
            {/*</TodoContext.Provider>*/}
        </div>
    );
}

export default App;
