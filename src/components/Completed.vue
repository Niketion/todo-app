<template>
<div>
    <div class="flex-center">
        <div class="title-completed">
            task completate
        </div>
    </div>

    <ul class="todo-completed" v-for="todo in todosCompleted">
        <li>{{todo.title}}</li>
    </ul>
</div>
</template>

<script>

export default {
    name: 'completed-list',
    computed: {
        todosCompleted() {
            if (localStorage.getItem("todos") == undefined) {
                return [];
            }

            return JSON.parse(localStorage.getItem("todos"))
                .filter(todo => todo.completed);
        }
    },
}
</script>

<style>

    .title-completed {
        text-transform: uppercase;
        margin-bottom: 20px;
    }

    .todo-completed {
        margin-top: 10px;
        padding-left: 50px;
        display: flex
    }

</style>