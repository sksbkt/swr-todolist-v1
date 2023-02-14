import { addTodo, updateTodo, deleteTodo } from "../api/todosApi";







export async function addMutation(newTodo, todos) {
    const added = await addTodo(newTodo);
    return [...todos, added].sort((a, b) => b.id - a.id);
}
export function addTodoOptions(newTodo, todos) {
    return {
        optimisticData: [...todos, newTodo]
            .sort((a, b) => b.id - a.id),
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
    }
}

