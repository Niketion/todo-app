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

        removeTodo(id) {
            const index = this.indexFromID(id);
            const indexCompleted = this.completed.findIndex((item) => item.id == id)

            this.todos.splice(index, 1)
            this.completed.splice(indexCompleted, 1)

            localStorage.setItem('todos', JSON.stringify(this.todos))
            localStorage.setItem('completed', JSON.stringify(this.completed));
        },

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