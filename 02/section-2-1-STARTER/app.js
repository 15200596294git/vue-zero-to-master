const vm = Vue.createApp({
    data() {
        return {
            firstName: 'John',
            middleName: '',
            lastName: 'doe',
            url: 'https://google.com',
            raw_url: `<a href="https://google.com" target="_blank">goole</a>`,
            age: 20,
        }
    },
    methods: {
        increment() {
            this.age++
        },
        updateLastName(msg, e) {
            // e.preventDefault()
            console.log(msg);
            this.lastName = e.target.value
        },
        updateMiddleName(e) {
            this.middleName = e.target.value
        }
    },
    computed: {
        fullName() {
            console.log('fullName is called');
            return `${this.firstName} ${this.middleName} ${this.lastName.toUpperCase()}`
        },
    },
    watch: {
        age(nVal) {
            setTimeout(() => {
                this.age = 20
            }, 3000);
        }
    }
}).mount('#app')

// setTimeout(() => {
//     vm.firstName = 'Bob'
// }, 2000);

// Vue.createApp({
//     data() {
//         return {
//             lastName: 'jg'
//         }
//     }
// }).mount('#app2')