import { addTodo, updateTodo, deleteTodo } from "./todosApi";


// export async function addMutation(newTodo, todos) {
//     const added = await addTodo(newTodo);
//     return [...todos, added].sort((a, b) => b.id - a.id);
// }
export function addTodoOptions(newTodo) {
    return {
        optimisticData: (todos) => [...todos, newTodo]
            .sort((a, b) => b.id - a.id),
        rollbackOnError: true,
        //? in populate cache we add the new item to the array
        populateCache: (added, todos) => [...todos, added]
            .sort((a, b) => b.id - a.id),
        revalidate: false,
    }
}

export function updateTodoOptions(updatedTodo) {
    return {
        optimisticData: (todos) => {
            const prevTodos = todos.filter(todo => todo.id !== updatedTodo.id);
            return [...prevTodos, updateTodo]
                .sort((a, b) => b.id - a.id);
        },
        rollbackOnError: true,
        //? in populate cache we add the new item to the array
        populateCache: (updated, todos) => {
            const prevTodos = todos.filter(todo => todo.id !== updatedTodo.id);
            return [...prevTodos, updated]
                .sort((a, b) => b.id - a.id);
        },
        revalidate: false,
    }
}


export function deleteTodoOptions(deletedTodo) {
    return {
        optimisticData: (todos) => {
            const prevTodos = todos.filter(todo => todo.id !== updatedTodo.id);
            return [...prevTodos, updateTodo]
                .sort((a, b) => b.id - a.id);
        },
        rollbackOnError: true,
        //? in populate cache we add the new item to the array
        populateCache: (deleted, todos) => {
            const prevTodos = todos.filter(todo => todo.id !== deleted.id);
            return [...prevTodos, updated]
                .sort((a, b) => b.id - a.id);
        },
        revalidate: false,
    }
}

