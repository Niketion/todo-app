<template>
    <div>
        <input type="text" class="todo-input" 
            placeholder="Cosa devi fare?"
            v-model="newTitle"
            @keyup.enter="addTodo">
        <todo-item v-for="todo in todosSaved" :todo="todo" :key="todo.id" @removedTodo="removeTodo">
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
        todosSaved() {
            if (localStorage.getItem("todos") == undefined) this.todos = []
            else this.todos = JSON.parse(localStorage.getItem("todos"))
            
            return this.todos;
        }
    },
    data() {
        return {
            newTitle: '',
            newID: 1,
            todos: []
        }
    },
    methods: {
        addTodo() {
            if (this.newTitle.trim().length == 0) return
            
            this.todos.push({
                id: this.newID,
                title: this.newTitle,
                completed: false,
                editing: false
            })

            localStorage.setItem('todos', JSON.stringify(this.todos))

            this.newID++;
            this.newTitle = ''
        },

        removeTodo(id) {
            const index = this.todos.findIndex((item) => item.id == id)
            this.todos.splice(index, 1)

            localStorage.setItem('todos', JSON.stringify(this.todos))
        },

        editTodo(todo) {
            if (document.getElementById(todo.id).innerText == "annulla") {
                this.cancelEdit(todo)
                return;
            }

            this.beforeEditCache = todo.title
            todo.editing = true;

            document.getElementById(todo.id).innerText = "annulla"
        },

        cancelEdit(todo) {
            document.getElementById(todo.id).innerText = "modifica"
            todo.title = this.beforeEditCache;
            todo.editing = false;
        },

        doneEdit(todo) {
            if (todo.title.trim().length == 0) {
                todo.title = this.beforeEditCache;
                alert("Il campo non può essere vuoto!")
                return;
            }

            localStorage.setItem('todos', JSON.stringify(this.todos))

            document.getElementById(todo.id).innerText = "modifica"
            todo.editing = false;
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