import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://68c78c8d5d8d9f51473222a8.mockapi.io/api/',
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