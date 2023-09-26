<template>
  <div class="name">{{name}}</div>
</template>
 
<script>
export default {
  setup() {
    const name = 'Lucky Haejin'
    return {
      name
    };
  },
}
</script>
<style>
  .name {
    color:red;
  }
</style>