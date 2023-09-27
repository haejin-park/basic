<template>
  <div class="name">{{ name }}</div>
  <button 
  class="btn btn-primary"
  v-on:click="updateName"
  >
  Click
  </button>
</template>
 
<script>
export default {
  setup() {
    let name = 'Lucky Haejin'
    const updateName = () => { 
      name = 'Happy Haejin';//반응형이 아니라서 console출력결과만 바뀌고 화면은 바뀌지 않음
      console.log(name)
    }
    return {
      name,
      updateName
    };
  },
}
</script>
<style>
  .name {
    color:red;
  }
</style>