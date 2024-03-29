import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import useSWR from 'swr';

import {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    todosUrlEndpoint as cacheKey
} from '../../api/todosApi';

import {
    // addMutation as addTodo,
    addTodoOptions,
    updateTodoOptions,
} from '../../api/todosMutationOptions'
import Todo from '../../component/Todo';
import SkeletonTodo from '../../component/skeleton/SkeletonTodo'
function TodoList() {
    const [newTodo, setNewTodo] = useState('');

    const {
        isLoading,
        error,
        data: todos,
        mutate
    } = useSWR(cacheKey, getTodos, {
        onSuccess: data => data.sort(
            //? we sort like this so the most recent todo goes on top of the list
            (a, b) => b.id - a.id),
        revalidateOnFocus: false,
        dedupingInterval: 2000,
        suspense: true,
    });


    async function addTodoMutation(newTodo) {
        try {
            await mutate(
                addTodo(newTodo),
                addTodoOptions(newTodo)
            )
            toast.success("Success! Added new item", {
                duration: 1000,
                icon: '🎉'
            })
        } catch (error) {
            console.log(error);
            toast.error('Failed to add the new item', {
                duration: 1000
            });
        }
    }

    async function updateTodoMutation(updatedTodo) {

        try {
            mutate(
                updateTodo(updatedTodo),
                updateTodoOptions(updatedTodo)
            );
            toast.success("Success! updated item", {
                duration: 1000,
                icon: '🚀'
            })
        } catch (error) {
            toast.error('Failed to update the item', {
                duration: 1000
            });
        }

    }
    async function deleteTodoMutation({ id }) {
        try {
            await deleteTodo({ id });
            mutate();

            toast.success("Success! Delete the item", {
                duration: 1000
            })
        } catch (error) {
            toast.error('Failed to delete the item', {
                duration: 1000
            });
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        addTodoMutation({ userId: 1, title: newTodo, completed: false, id: 9999 });
        setNewTodo('')
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">
            </label>
            <div className="new-todo">
                <input type="text" id="new-todo" onChange={(e) => setNewTodo(e.target
                    .value)}
                    value={newTodo}
                    placeholder="Enter new code"
                />
            </div>
            <button>
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    );
    let content;
    if (isLoading) {
        // content = <p>Loading...</p>
        content = <SkeletonTodo />

    } else if (error) {
        content = <p>{error.message}</p>
    } else {
        content = todos.map((todo) => {
            return (
                <Todo
                    todo={todo}
                    key={todo.id}
                    onDelete={(id) => deleteTodoMutation({ id: id })}
                    onUpdate={(updatedTodo) => updateTodoMutation(updatedTodo)}
                />

            )
        });
    }
    return (<main>
        <Toaster toastOptions={{ position: 'top-center' }} />
        <h1>Todo List</h1>
        {newItemSection}
        {content}
    </main>);
}

export default TodoList;
