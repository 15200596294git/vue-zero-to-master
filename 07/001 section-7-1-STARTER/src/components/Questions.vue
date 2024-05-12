<template>
    <div class="questions-ctr">
        <div class="progress">
            <div class="bar" :style="bar_styles"></div>
            <div class="status">{{ currentIndexQue + 1 }} out of {{ totalQue }} questions answered</div>
        </div>
        <Transition name="fade" mode="out-in">
            <div class="single-question" :key="currentIndexQue">
                <div class="question">{{ currentQue.q }}</div>
                <div class="answers">
                    <div class="answer" v-for="answer in currentQue.answers" :key="answer.text"
                        @click.prevent="answerQuestion(answer)">
                        {{ answer.text }}
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
<script>
export default {
    name: 'Questions',
    props: ['totalQue', 'currentIndexQue', 'currentQue'],
    emits: ['answer-question'],
    methods: {
        answerQuestion(answer) {
            this.$emit('answer-question', answer)
        }
    },
    computed: {
        bar_styles() {
            return {
                width: `${this.currentIndexQue / this.totalQue * 100}%`
            }
        }
    }
}
</script>
<style scoped>
.bar {
    transition: width .25s ease;
}

.fade-enter-from , .fade-leave-to{
    opacity: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .25s ease-in;
}
</style>