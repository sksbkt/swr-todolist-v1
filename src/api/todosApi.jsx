import axios from "axios";

const todosApi = axios.create({ baseURL: 'http://localhost:3500' });

//? simulates a delay: MORE INFO ON SWR DOC
async function delay() {
    return new Promise(res => setTimeout(() => res(), 800));
}

export const todosUrlEndpoint = '/todos';

export async function getTodos() {
    await delay();
    const response = await todosApi.get(todosUrlEndpoint);
    return response.data;
}

export async function addTodo({ userId, title, completed }) {
    await delay();
    // if (Math.random() < 0.5) throw new Error('failed to add new item');
    const response = await todosApi.post(todosUrlEndpoint, {
        userId,
        title,
        completed
    });
    return response.data;
}

export async function updateTodo(todo) {
    await delay();
    const response = await todosApi.patch(`${todosUrlEndpoint}/${todo.id}`, todo);
    return response.data;
}

export async function deleteTodo({ id }) {
    await delay();
    return await todosApi.delete(`${todosUrlEndpoint}/${id}`, id);
}