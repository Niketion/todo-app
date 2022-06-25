<template>
    <div>
        <input type="text" class="todo-input" placeholder="Cosa devi fare?" 
            v-model="newTitle" 
            @keyup.enter="addTodo">

        <todo-item v-for="todo in todosSaved" :todo="todo" :key="todo.id" 
            @editDone="doneEdit" 
            @executedTask="executeTask" 
            @removedTodo="removeTodo">
        </todo-item>
    </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
    name: 'todo-list',
    components: {
        TodoItem,
    },
    computed: {
        /** 
         * I collect all todos from the localStorage 
         * to show them on the home page
         */
        todosSaved() {
            if (localStorage.getItem("todos") == undefined) this.todos = []
            else this.todos = JSON.parse(localStorage.getItem("todos"))
            
            return this.todos;
        }
    },
    data() {
        return {
            newTitle: '',
            todos: [],
            completed: []
        }
    },
    methods: {
        /**
        * When a todo is added it's saved in the localStorage, 
        * the "newTitle" is passed via the v-model and is reset every time 
        * the function is called, the "lastID" is saved in the localStorage 
        * because every time the page is changed (vue-router too) it's reset
        */
        addTodo() {
            if (this.newTitle.trim().length == 0) return
            if (localStorage.getItem("lastID") == undefined) localStorage.setItem("lastID", 1)

            this.todos.push({
                id: localStorage.getItem("lastID"),
                title: this.newTitle,
                completed: false,
                author: sessionStorage.getItem("user") == undefined ? "anonimo" : sessionStorage.getItem("user"),
                editing: false
            })

            localStorage.setItem('todos', JSON.stringify(this.todos))

            localStorage.setItem("lastID", parseInt(localStorage.getItem("lastID"))+1);
            this.newTitle = ''
        },


        /**
         * Remove todo from the todos and completed list, are two separate 
         * lists, one is used for "TodoList" another for "Completed"
         * 
         * @see indexFromID
         * @param {number} id - Todo's ID
         */
        removeTodo(id) {
            const index = this.indexFromID(id);
            const indexCompleted = this.completed.findIndex((item) => item.id == id)

            this.todos.splice(index, 1)
            this.completed.splice(indexCompleted, 1)

            localStorage.setItem('todos', JSON.stringify(this.todos))
            localStorage.setItem('completed', JSON.stringify(this.completed));
        },

        /**
         * This function is called when the checkbox 
         * is clicked, the todo is automatically set into the "completed" 
         * list that will be displayed on the appropriate page
         * ! If the user is not specified it's set anonymous
         * 
         * @see indexFromID
         * @param {number} id - Todo's ID
         */
        executeTask(id) {
            const index = this.indexFromID(id);
            const todo = this.todos[index]

            this.todos[index].completed = !this.todos[index].completed;

            if (this.todos[index].completed) {
                const name = sessionStorage.getItem("user") == null ? "anonimo" : sessionStorage.getItem("user");

                if (localStorage.getItem("completed") == undefined) localStorage.setItem("completed", [])
                else this.completed = JSON.parse(localStorage.getItem("completed"));
                
                this.completed.push({
                    id: todo.id,
                    user: name,
                    title: todo.title
                })

                localStorage.setItem("completed", JSON.stringify(this.completed))
            }

            localStorage.setItem('todos', JSON.stringify(this.todos))
        },

        /**
         * Called when you have edited the todo (via the edit button)
         * 
         * @see indexFromID
         * @param {*} id - Todo's ID
         * @param {*} newTitle - Todo's new title
         */
        doneEdit(id, newTitle) {
            const index = this.indexFromID(id);

            this.todos[index].title = newTitle;
            const todo = this.todos[index]

            if (todo.title.trim().length == 0) {
                todo.title = this.beforeEditCache;
                alert("Il campo non può essere vuoto!")
                return;
            }

            localStorage.setItem('todos', JSON.stringify(this.todos))

            document.getElementById(todo.id).innerText = "modifica"
        },

        /**
         * Via the todo's id takes the index
         * 
         * @param {number} id - Todo's ID
         */
        indexFromID(id) {
            return this.todos.findIndex((item) => item.id == id);
        }
    }
}
</script>

<style>

.todo-item {
    margin-top: 12px;
    display: flex;
}

.todo-item-label {
    font-size: 14px
}

.todo-checkbox {
    margin-left: 20px;
    margin-right: 10px;
}

.remove-item {
    cursor: pointer;
    margin-left: 6px;
    user-select: none;  
}

.edit-item {
    margin-left: 20px;
}

.completed {
    text-decoration: line-through;
    color: grey;
}

.todo-input {
    margin-left: 20px
}

</style>