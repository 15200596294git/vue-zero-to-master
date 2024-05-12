<template>
    <div class="result">
        <div class="title">{{ title }}</div>
        <div class="desc">
            {{ description }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'Result',
    props: ['title', 'description']
}
</script>
<style lang="">

</style>