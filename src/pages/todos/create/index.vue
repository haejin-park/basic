<template>
    <h1>Create Page</h1>
    <TodoForm :editing="false" />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'
export default {
    components: {
        TodoForm
    }
}
</script>

<style>

</style>