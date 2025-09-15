export const initialState = [
    {id: 1, text: "the first todo", done: false},
    {id: 2, text: "the second todo", done: false},
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'DONE':
            return state.map((todo) => {
                    if (todo.id === action.id) {
                        return {...todo, done: !todo.done};
                    }
                    return todo;
                }
            );
        case 'DELETE':
            return state.filter(todo => todo.id !== action.id);
        case 'ADD':
            const newId = state.length > 0 ? Math.max(...state.map(todo => todo.id)) + 1 : 1;
            return [...state, {id: newId, text: action.text, done: false}];
        case 'LOAD_TODOS':
            return state = action.todos;
    }
    return state;
};
