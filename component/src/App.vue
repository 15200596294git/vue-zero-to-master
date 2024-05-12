<script>
import Greeting from '../components/Greeting.vue'
import User from '../components/User.vue'
export default {
  name: 'App',
  components: {
    Greeting,
    User,
  },
  data() {
    return {
      age: 20
    }
  },
  methods: {
    ageChange() {
      this.age ++
    }
  }
}
</script>

<template>
  <div>
    <Greeting :age="age"></Greeting>
    <User :age="age" @age-change="ageChange"></User>
  </div>
</template>
