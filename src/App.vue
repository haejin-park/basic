<template>
  <div :class="nameClass">{{ name }}</div>
  <input :type="type" :value="name">
  <button 
  class="btn btn-primary"
  @click="updateName"
  >
  Click
  </button>
</template>
 
<script>
import {ref} from 'vue';
export default {
  setup() {
    const name = ref('Lucky Haejin');
    const type = ref('number');
    const nameClass = ref('');

    const updateName = () => { 
      name.value = 'Happy Haejin';
      type.value = 'text';
      nameClass.value = 'name'
    }
    return {
      name,
      type,
      updateName,
      nameClass
    };
  },
}
</script>
<style>
  .name {
    color:red;
  }
</style>