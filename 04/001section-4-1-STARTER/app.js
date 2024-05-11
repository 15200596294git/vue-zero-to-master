let vm = Vue.createApp({
  
})

vm.component('hello', {
  data() {
    return {
      message: 'Hello World!'
    }
  },
  template: `<h1>{{message}}</h1>`
})

vm.mount('#app')