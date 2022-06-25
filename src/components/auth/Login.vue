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
    /**
     * Check if the user is logged in from sessionStorage, 
     * if a value is present they are logged in
     */
    logged() {
      if (sessionStorage.getItem("user") == undefined) return false;
      else return true;      
    }
  },
  methods: {
    /**
     * The operation of "login" is set a user in the sessionStorage, 
     * in logout it is simply removed. If it isn't in the 
     * "users" list in localStorage it is added, for select in "Completed"
     * @see logout
     */
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
      
      /**
       * Remove the user from the sessionStorage, 
       * reload the page to run the authentication
       */
      sessionStorage.setItem("user", this.user)
      window.location.reload();
    },

    /**
     * Remove the user from the sessionStorage
     */
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