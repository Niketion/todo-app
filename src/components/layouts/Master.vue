<template>
  <div id="app">
    <ul class="nav">
      <li><router-link :to="{ name: 'todo' }">App</router-link></li>
      <li><router-link :to="{ name: 'login' }">Login</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Arial;
  }

  .flex-center {
    display: flex;
    justify-content: center;
  }

  .nav {
    display: flex;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    background: darkred;
    margin-bottom: 24px;
  }

  .nav a {
    color: white;
    padding: 0 25px;
    text-decoration: none;
    text-transform: uppercase;
  }

</style>
