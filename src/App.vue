<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      >
    <hr/>
    <TodoSimpleForm
      @add-todo="addTodo"
    />
    <div style="color:red">{{ error }}</div>
    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li 
          v-if="currentPage !== 1"
          class="page-item"
        > 
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
        </li>
        <li 
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page? 'active' : ''"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li 
          v-if="currentPage !== numberOfPages"
          class="page-item"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>

</template>
 
<script>
import {ref, computed, reactive, watch} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';
export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });
    // watch(currentPage, (currentPage, prev) => {
    // console.log(currentPage, prev);
    // });
    watch([currentPage, numberOfTodos], (currentPage, prev) => {
      console.log(currentPage, prev);
    });
    const a = reactive({
      b: 1,
      c: 3
    });
    watch(() => [a.b, a.c], (current, prev) => {
      console.log(current, prev);
    });
    a.b = 2;

    const getTodos = async(page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_sort_id&_order=desc&_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch(err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }
    getTodos(1);
    const addTodo = async (todo) => { 
      error.value = '';
      try {
        await axios.post('http://localhost:3000/todos',{
        subject: todo.subject,
        completed: todo.completed
      });
        getTodos(currentPage.value);
      } catch(err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    };
    
    const toggleTodo = async (index) => {//체크박스 클릭 전 후 completed바뀌는지 확인 
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.patch('https://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completeds
      } catch(err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }
    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);
        getTodos(currentPage.value);
      } catch(err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }

    const searchText = ref('');
    const filteredTodos = computed(() => {
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    })

    return {
      todos,
      error,
      getTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      filteredTodos,
      numberOfPages,
      currentPage
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