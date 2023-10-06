<template>
    <h1>To-do Page</h1>
    <div v-if="loading">
        Loading...
    </div>
    <form 
    v-else
    @submit.prevent="onSave"
    >
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input 
                        v-model="todo.subject" 
                        type="text" 
                        class="form-control"
                    > 
                </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button
                            class="btn"  
                            :class="todo.completed? 'btn-success' : 'btn-danger'"
                            @click="togglTodoStatus"
                        >
                            {{todo.completed? 'Completed': 'Incomplete'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <button 
            type="submit"
            class="btn btn-primary"
            :disabled="!todoUpdated"   
        >    
            Save
        </button>
        <button 
            class="btn btn-outline-dark ml-2"
            @click="moveTodoListPage"
        >        
            Cancel
        </button>
    </form>
    <Toast 
        v-if="showToast" 
        :message="toastMessage"
        :type="toastAlertType"
    />
    <div id="kossie"></div>
</template>

<script>
import {ref, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue';
import {useRoute,useRouter} from 'vue-router';
import axios from 'axios'
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
export default {
    components: {
        Toast
    }, 
    setup() {
        // DOM에 마운트 되기 전 사용
        onBeforeMount(() => {
            console.log(document.querySelector('#kossie')); //null
        });
        //DOM에 마운트 됐을 때 사용 
        onMounted(() => {
            console.log(document.querySelector('#kossie')); //<div id="kossie"></div>
        });
        //state가 업데이트 되기 전에 실행됨
        onBeforeUpdate(() => {
            console.log('before update');
        });
        //state가 업데이트 되었을 때 사용
        onUpdated(() => {
            console.log('updated');
        });
        //컴포넌트가 돔에서 빠지기 전에 실행됨
        onBeforeUnmount(() => {
            console.log('before unmount');
        });
        //컴포넌트가 돔에서 빠졌을 때
        onUnmounted(() => {
            console.log('unmount');
        });

        console.log('hello');//onBeforeMount보다 먼저 찍힘

        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const todoId = route.params.id
        const showToast = ref(false)
        const toastMessage = ref('');
        const toastAlertType = ref('');
        const getTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);           
                todo.value = {...res.data};
                originalTodo.value = {...res.data};
                loading.value = false;
            } catch(error) {
                console.log(error);
                triggerToast('Something went wrong', 'danger');
            }
        }
        getTodo();

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);
        });

        const toggleTodoStatus = () => {
            todo.value.complted = !todo.value.completed;
        }

        const moveTodoListPage = () => {
            router.push({
                name:'Todos'
            })
        };

        const triggerToast = (message, type= 'success') => {
            toastMessage.value = message;
            toastAlertType.value = type;
            showToast.value = true;
            setTimeout(() => {
                toastMessage.value = '';
                toastAlertType.value = '';
                showToast.value = false;
            }, 3000)
        }

        const onSave = async () => {
            try {
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject: todo.value.subject,
                completed:todo.value.completed
                });
                console.log(res);
                originalTodo.value = {...res.data};
                triggerToast('Successfully saved!');
            } catch(error) {
                console.log(error);
                triggerToast('Something went wrong', 'danger');
            }
        }
        return {
            todo,
            loading,
            toggleTodoStatus,
            moveTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType
        }
    }
}
</script>

<style>

</style>
