Vue.createApp({
    data() {
        return {
            perspective: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ:0,
        }
    },
    computed: {
        box_styles() {
            return {
                // perspective:`perspective(${this.perspective}px)`,
                transform: `perspective(${this.perspective}px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg)` 
            }
        }
    },
    methods: {
        reset() {
            this.perspective = 0
            this.rotateX = 0
            this.rotateY = 0
            this.rotateZ = 0
        },
        async copy() {
            // console.log(JSON.stringify(this.box_styles)); 
            
            const text = `transform: perspective(${this.perspective}px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg`
            await navigator.clipboard.writeText(text)
            alert('CSS is copied to Clipboard!')
        },
    }
}).mount('#app')