<template>
<div>
    <div class="flex-center">
        <div class="title-completed">
            task completate
        </div>
    </div>

    <ul class="todo-completed" v-for="todo in todosCompleted">
        <li>{{todo.title}}</li>
        <div v-if="todo.user != 'anonimo'" class="author">
            (completata da {{ todo.user }})
        </div>
    </ul>
</div>
</template>
 
<script>

export default {
    name: 'completed-list',
    computed: {
        todosCompleted() {
            if (localStorage.getItem("completed") == undefined) {
                return [];
            }

            return JSON.parse(localStorage.getItem("completed"));
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

    .author {
        font-size: 10px;
        margin-left: 20px;
    }

</style>