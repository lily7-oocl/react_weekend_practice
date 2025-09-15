import {useReducer} from "react";
import './App.css';
import {initialState, todoReducer} from "./reducers/todoReducer";
import {createBrowserRouter, RouterProvider} from "react-router";
import TodoList from "./components/TodoList";
import {TodoContext} from "./contexts/TodoContext";
import {DefaultLayout} from "./components/DefaultLayout";
import {TodoDetail} from "./components/TodoDetail";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '',
                element: <h1>Home Page</h1>,
            },
            {
                path: 'todoList',
                element: <TodoList/>,
            },
            {
                path: 'todoList/:id',
                element: <TodoDetail/>,
            },
            {
                path: 'about',
                element: <h1>About Page</h1>,
            },
            {
                path: 'errorPage',
                element: <h1>Error Page</h1>,
            },
            {
                path: 'donePage',
                element: <h1>Done Page</h1>,
            }
        ]
    }
]);

function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <div className="App">
            <TodoContext.Provider value={{state, dispatch}}>
                <RouterProvider router={router}/>
            </TodoContext.Provider>
        </div>
    );
}

export default App;