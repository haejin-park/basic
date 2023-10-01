<template>
  <div class="container">
    <h2>To-Do List</h2>
    <h4>count : {{ count }}</h4>
    <h4>double Count Compted: {{ doubleCountComputed }}</h4>
    <h4>double Count Compted: {{ doubleCountComputed }}</h4>
    <h4>double Count Method: {{ doubleCountMethod() }}</h4>
    <h4>double Count Method: {{ doubleCountMethod() }}</h4>
    <button @click="count++">Add One</button>
    <TodoSimpleForm
      @add-todo="addTodo"
    />
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>

</template>
 
<script>
import {ref, computed} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([]);
    const addTodo = (todo) => { 
      todos.value.push(todo);
    }
    const toggleTodo = (index) => {//체크박스 클릭 전 후 completed바뀌는지 확인 
      todos.value[index].completed = !todos.value[index].completed
    }
    const deleteTodo = (index) => {
      todos.value.splice(index,1);
    }
    const count = ref(1);
    const doubleCountComputed = computed(() => {
      console.log(count.value);
      return count.value * 2;
    });
    const doubleCountMethod = () => {
      console.log(count.value);
      return count.value * 2;
    }
    return {
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      count,
      doubleCountComputed,
      doubleCountMethod
    };
  },
}
</script>
<style>
  .todo {
    color:gray;
    text-decoration:line-through;
  }
</style>