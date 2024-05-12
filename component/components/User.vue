<template >
    <div>
        <p>The user is {{ age }} years old</p>
        <button @click="updateAge">Update age</button>
    </div>
</template>
<script>
export default {
    name: 'User',
    props: ['age'],
    emits: ['age-change'],
    methods: {
        updateAge() {
            this.$emit('age-change')
        }
    }   
}
</script>
<style lang="">
    
</style>