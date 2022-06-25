<template>
    <div class="todo-item">
        <input class="todo-checkbox" type="checkbox" v-model="completed" @click="executeTask()">
        <div class="todo-item-left">
            <div v-if="!editing" class="todo-item-label" :class="{ completed : completed }">
                {{ title }} 
            </div>
            <input v-else @keyup.enter="doneEdit()" class="todo-item-edit" type="text" v-model="title">
        </div>

        <div class="todo-author">
            <div v-if="author != 'anonimo'">
                (aggiunto da: {{ author }})
            </div>
        </div>

        <div class="edit-item">
            <button class="edit-button" v-bind:id="id" @click="editTodo()" >
                modifica
            </button>
        </div>

        <div class="remove-item" @click="removeTodo()">
            &times;
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            'id': this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
            'editing': this.todo.editing,
            'author': this.todo.author,
            'beforeEditCache': '',
        }
    },
    methods: {
        /**
         * @see TodoList#executeItem
         */
        executeTask() {
            this.$emit('executedTask', this.id)
        },

        /**
         * @see TodoList#removeTodo
         */
        removeTodo() {
            this.$emit('removedTodo', this.id)
        },

        /**
         * Called when the "modifica" button is clicked
         */
        editTodo() {
            if (document.getElementById(this.id).innerText == "annulla") {
                this.cancelEdit(this)
                return;
            }

            this.beforeEditCache = this.title
            this.editing = true;
            document.getElementById(this.id).innerText = "annulla"
        },

        /**
         * Called when the "annulla" button is clicked
         */
        cancelEdit() {
            document.getElementById(this.id).innerText = "modifica"
            this.title = this.beforeEditCache;
            this.editing = false;
        },

        /**
         * @see TodoList#doneEdit
         */
        doneEdit() {
            this.editing = false; // If I don't change here the editing doesn't finish the input
            this.$emit('editDone', this.id, this.title)
        }
    }
}
</script>

<style>

    .todo-author {
        font-size: 10px;
        margin-left: 20px;
    }
</style>
