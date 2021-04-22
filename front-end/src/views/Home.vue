<template>
  <div class="wrapper">
    <h1>Find your City</h1>
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
};
</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 50%;
  }

  form {
    display: table;
    width: 100%;
  }

  i {
    display: table-cell;
    padding-left: 10px;
    width: 1px;
  }
</style>
