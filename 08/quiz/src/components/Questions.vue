<script>
export default {
  name: 'Questions',
  props: ['questions', 'questionsAnswered'],
  emits: ['question-answered'],
  methods: {
    questionAnswered() {
      this.$emit('question-answered')
    }
  }
}

</script>
<template>
  <div class="questions-ctr">
    <!-- <div class="progress">
      <div class="bar"></div>
      <div class="status">1 out of 3 questions answered</div>
    </div> -->
    <div data-test="answer-wrap" class="single-question" v-for="(question, qi) in questions" :key="question.q" v-show="questionsAnswered === qi">
      <div data-test="questions-text" class="question">{{ question.q }}</div>
      <div class="answers">
        <div @click="questionAnswered" v-for="answer in question.answers" :key="answer.text" data-test="answer" class="answer">{{ answer.text }}</div>
      </div>
    </div>
  </div>
</template>