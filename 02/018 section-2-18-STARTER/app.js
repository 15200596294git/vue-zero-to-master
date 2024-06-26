let vm = Vue.createApp({
    data() {
        return {
            isPurple: false,
            selectedColor: '',
            size: 100,
        }
    },
    computed: {
        circle_classes() {
            return { purple: this.isPurple }
        },
        circle_styles() {
            return [
                { width: this.size + 'px', height: this.size + 'px', lineHeight: this.size + 'px' },
                { transform: 'rotate(45deg)' },
            ]
        },
    },
}).mount('#app')