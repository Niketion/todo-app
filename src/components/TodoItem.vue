<template>
    <div class="todo-item">
        <input class="todo-checkbox" type="checkbox" v-model="completed" @click="executeTask()">
        <div class="todo-item-left">
            <div v-if="!editing" class="todo-item-label" :class="{ completed : completed }">
                {{ title }}
            </div>
            <input v-else @keyup.enter="doneEdit()" class="todo-item-edit" type="text" v-model="title">
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
            'beforeEditCache': '',
        }
    },
    methods: {
        executeTask() {
            this.$emit('executedTask', this.id)
        },

        removeTodo() {
            this.$emit('removedTodo', this.id)
        },

        editTodo() {
            if (document.getElementById(this.id).innerText == "annulla") {
                this.cancelEdit(this)
                return;
            }

            this.beforeEditCache = this.title
            this.editing = true;
            document.getElementById(this.id).innerText = "annulla"
        },

        cancelEdit() {
            document.getElementById(this.id).innerText = "modifica"
            this.title = this.beforeEditCache;
            this.editing = false;
        },

        doneEdit() {
            this.editing = false;
            this.$emit('editDone', this.id, this.title)
        }
    }
}
</script>
