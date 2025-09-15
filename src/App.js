import {useReducer} from "react";
import './App.css';
import {initialState, todoReducer} from "./reducers/todoReducer";
import {createBrowserRouter, RouterProvider, useParams} from "react-router";
import TodoList from "./components/TodoList";
import {TodoContext} from "./contexts/TodoContext";
import {DefaultLayout} from "./components/DefaultLayout";


function TodoDetail() {
    const {key} = useParams();
    return <h1>detail of {key}</h1>
}

const routes = [
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [{
            path: '',
            element: <h1>Home Page</h1>,
        }, {
            path: 'about',
            element: <h1>About us</h1>
        }, {
            path: 'todoList',
            element: <TodoList/>
        }, {
            path: 'todoList/:key',
            element: <TodoDetail/>
        }, {
            path: 'errorPage',
            element: <h1>Error Page</h1>
        }, {
            path: 'donePage',
            element: <h1>Done Page</h1>
        }]
    }
]
const router = createBrowserRouter(routes);

function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const value = {state, dispatch};
    return (
        <div className="App">
            <TodoContext.Provider value={value}>
                <RouterProvider router={router}></RouterProvider>
            </TodoContext.Provider>
        </div>
    );
}

export default App;
