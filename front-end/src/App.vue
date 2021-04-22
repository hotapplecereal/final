<template>
  <div id="app">
    <div class="page">
      <div id="menu">
        <div id="side">
          <router-link to="/">
            <div class="menu-item">
              <p>Home</p>
            </div>
          </router-link>
          <router-link to="/about">
            <div class="menu-item">
              <p>About</p>
            </div>
          </router-link>
          <router-link to="/login">
            <div class="menu-item">
              <p>Login</p>
            </div>
          </router-link>
          <router-link to="/admin">
            <div class="menu-item">
              <p>Administration</p>
            </div>
          </router-link>
        </div>
      </div>
      <router-view />
    </div>
    <div class=footer><a href=https://github.com/hotapplecereal/final>Github Repository</a> 4 hours</div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
