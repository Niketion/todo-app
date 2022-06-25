<template>
<div>
    <div class="title-completed">
        task completate
    </div>
    
    <div class="filter-input">
        <input v-model="filter" placeholder="Cerca tra le task">
    </div>

    <div class="select-user">
        <div class="select-text">Hai selezionato: {{ selected }}</div>

        <select v-model="selected">
            <option disabled value="Tutti">Scegli un utente</option>
            <option v-for="user in users">
                {{user.name}}
            </option>
            <option>Tutti</option>
        </select>
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
            if (localStorage.getItem("completed") == undefined) return [];
            
            if (this.selected == "Tutti") {
                if (this.filter != "") {
                    return JSON.parse(localStorage.getItem("completed"))
                    .filter(task => 
                        task.title.toLowerCase().includes(this.filter.toLowerCase()) || 
                        task.user.toLowerCase().includes(this.filter.toLowerCase())
                    )
                }

                return JSON.parse(localStorage.getItem("completed"));
            }
            
            if (this.filter != "") {
                return JSON.parse(localStorage.getItem("completed"))
                    .filter(task => task.user == this.selected)
                    .filter(task => 
                    task.title.toLowerCase().includes(this.filter.toLowerCase()) ||
                    task.user.toLowerCase().includes(this.filter.toLowerCase())
                )
            }

            return JSON.parse(localStorage.getItem("completed"))
                .filter(task => task.user == this.selected)
        },
        users() {
            if (localStorage.getItem("users") == undefined) return []
            
            return JSON.parse(localStorage.getItem("users"))
        }
    },
    data() {
        return {
            selected: 'Tutti',
            filter: ''
        }
    }
}
</script>

<style>

    .select-text {
        margin-bottom: 10px;
    }

    .title-completed {
        text-transform: uppercase;
        margin-left: 20px;
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

    .select-user {
        margin-left: 20px;
        margin-bottom: 20px;
    }

    .filter-input {
        margin-bottom: 20px;
        margin-left: 20px;
    }

</style>