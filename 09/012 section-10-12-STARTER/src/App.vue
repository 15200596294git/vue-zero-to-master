<template>
  <div id="app">
    <HelloWorld #default="{user ,favorites}">
      <p>{{ user.name }}</p>
      <ul>
        <li v-for="f in favorites" :key="f">{{ f }}</li>
      </ul>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
