import axios from 'axios';
import {useNavigate} from "react-router";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
});
export const getTodos = async () => {
    return await instance.get('todos');
}

export const addTodos = async (todo) => {
    return await instance.post('todos', todo);
}

export const deleteTodos = async (id) => {
    return await instance.delete(`todos/${id}`);
}

export const updateTodos = async (id, todo) => {
    return await instance.put(`todos/${id}`, todo);
}

instance.interceptors.response.use(
    (response) => {
        console.log("请求数据:", response)
        console.log('请求时间:' + (Date.now() - response.config.metadata.startTime) + 'ms')
        return response;
    },
    (error) => {
        // handle response error
        const {status, data} = error.response;
        if (status === 404) {
            const navigate = useNavigate();
            alert(`response Error ${status} ${data}`)
            console.log(error.response)
            navigate('/home');
        }
        return Promise.reject(error);
    }
);

instance.interceptors.request.use(
    (config) => {
        // request configuration
        console.log("请求成功", config)
        config.metadata = {
            startTime: Date.now()
        }
        return config;
    },
    (error) => {
        // handle request error
        const navigate = useNavigate();
        navigate('/home')
        return Promise.reject(error);
    }
);