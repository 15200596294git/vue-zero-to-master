<template>
  <div>
    <input data-test="todo-input" v-model="newTodo" type="text">
    <button data-test="todo-submit" @click="onSubmit">Add</button>
    <div data-test="todo-item" v-for="(todo, i) in todos" :key="todo.id" :class="{'completed': todo.completed}">
      <span data-test="todo-text">{{ todo.text }}</span>
      <input v-model="todo.completed" type="checkbox" data-test="todo-completes">
      <button @click="onDelete(i)" data-test="todo-delete">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoApp',

  data() {
    return {
      todos: [],
      newTodo: ''
    }
  },
  methods: {
    onSubmit() {
      if(!this.newTodo) return

      const ids = this.todos.map((todo)=> todo.id)
      const maxId = Math.max(...ids)
      this.todos.push({
        id: maxId + 1,
        text: this.newTodo,
        completed: false
      })
      this.newTodo = ''
    },
    onDelete(i) {
      this.todos.splice(i, 1)
    }
  }
}
</script>