<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form 
      @submit.prevent="onSubmit"
      >
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input 
          class="form-control"
          type="text" 
          v-model="todo" 
          placeholder="Type new to-do"
          >
        </div>
        <div>
          <button 
            class="btn btn-primary"
            type="submit"
            >
            Add
          </button>
        </div>
      </div>
      <div v-show="hasError" style="color: red">s
        This field cannot be empty
      </div>
    </form>
    <div 
      v-for="todo in todos"
      :key="todo.id"
      class="card mt-2"
    >
      <div class="card-body p-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todo.completed"
          >
          <label 
            class="form-check-label"
            :style="todo.completed? todoStyle: {}"  
          >
            {{ todo.subject }}
          </label>
        </div>
      </div>
    </div>
  </div>

</template>
 
<script>
import {ref} from 'vue';
export default {
  setup() {
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }
    const hasError = ref(false);
    const todo = ref('');
    const todos = ref([]);

    const onSubmit = () => { 
      if(todo.value === ''){
        hasError.value = true;
      } else {
        todos.value.push({
          id:Date.now(),
          subject:todo.value,
          completed:false//true이면 todo 추가시 체크된 상태로 추가됨
        }); 
        hasError.value = false;
        todo.value = '';
      }
    }

    return {
      hasError,
      todo,
      todos,
      onSubmit,
      todoStyle
    };
  },
}
</script>
<style>
</style>