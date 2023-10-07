<template>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button 
        class="btn btn-primary"
        @click="moveToCreatePage">
        Create Todo
      </button>
    </div>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
      >
    <hr/>
    <div style="color:red">{{ error }}</div>
    <div v-if="!todos.length">
      There is nothing to display
    </div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <Pagination 
      v-if="todos.length"
      :numberOfPages="numberOfPages"
      :currentPage="currentPage"
      @click="getTodos"
    />
</template>

<script>
import {ref, computed, watch} from 'vue';
import TodoList from '@/components/TodoList.vue';
import axios from '@/axios';
import {useToast} from '@/composables/toast'
import {useRouter} from 'vue-router';
import Pagination from '@/components/Pagination.vue'
export default {
    components: {
      TodoList,
      Pagination
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });
    const { 
          showToast,
          toastMessage,
          toastAlertType,
          triggerToast
          } = useToast();
    
    const getTodos = async(page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
          );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch(err) {
        console.log(err);
        error.value = 'Something went wrong';
        triggerToast('Something went wrong', 'danger');
      }
    }
    getTodos();
    const addTodo = async (todo) => { 
      error.value = '';
      try {
        await axios.post('todos',{
        subject: todo.subject,
        completed: todo.completed
      });
        getTodos(1);
      } catch(err) {
        console.log(err);
        error.value = 'Something went wrong';
        triggerToast('Something went wrong', 'danger');
      }
    };
    
    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.patch('todos/' + id, {
          completed: checked
        });
        todos.value[index].completed = checked
      } catch(err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }
    const deleteTodo = async (id) => {
      error.value = '';
      try {
        await axios.delete('todos/' + id);
        getTodos(currentPage.value);
      } catch(err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }
    let timeout = null;    
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);  
    }
    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000)
    });
    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',

      })
    };

    return {
      todos,
      error,
      searchText,
      getTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      numberOfPages,
      currentPage,
      searchTodo,
      showToast,
      toastMessage,
      toastAlertType,
      moveToCreatePage
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