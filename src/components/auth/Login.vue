<template>
  <div>
    <div class="flex-center">
      Pagina di autenticazione
    </div>

    <div class="login-input" id="input">
        <input v-if="!logged" type="text"
            placeholder="Nome utente"
            v-model="user"
            @keyup.enter="setUser">
        <div v-else>
          Sei autenticato!

          <button type="button" class="logout" @click="logout()">Logout</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: '',
      users: []
    }
  },
  computed: {
    logged() {
      if (sessionStorage.getItem("user") == undefined) return false;
      else return true;      
    }
  },
  methods: {
    setUser() {
      if (localStorage.getItem("users") != undefined) {
        this.users = JSON.parse(localStorage.getItem("users"))
      }

      if (this.users.filter(user => user.name == this.user).length == 0) {
        this.users.push({
          name: this.user
        })
        localStorage.setItem("users", JSON.stringify(this.users));
      }
      
      sessionStorage.setItem("user", this.user)
      document.getElementById("input").innerHTML = "Autenticato con successo!";
    },

    logout() {
      sessionStorage.removeItem("user");
      window.location.reload();
    }
  }
}
</script>

<style>

  .login-input {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

</style>