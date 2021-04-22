<template>
  <div id="app">
    <div class="page">
      <div id="menu">
        <div id="brand">
          <router-link to="/">
            <img src="/images/logo.png">
          </router-link>
        </div>
        <div id="side">
          <router-link to="/browse">
            <div class="menu-item browse">
              <img src="/images/globe.png">
              <p>Browse</p>
            </div>
          </router-link>
          <router-link to="/cart">
            <div class="menu-item">
              <img src="/images/love.png">
              <p>0 items</p>
            </div>
          </router-link>
        </div>
      </div>
      <router-view />
    </div>
    <div class=footer><a href=https://github.com/BYU-CS-260-Winter-2021/lab-3b-grocery-store-hotapplecereal>Github Repository</a></div>
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
