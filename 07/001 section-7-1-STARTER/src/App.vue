<template>
  <div class="ctr">
    <Transition name="fade">
      <Questions 
        v-if="isAnswering"
        :total-que="totalQue" 
        :current-index-que="currentIndexQue" 
        :current-que="currentQue"
        @answer-question="answerQuestion"
        ></Questions>
  
        <template v-else>
          <div>
            <Result 
              :title="titleResult"
              :description="descriptionResult"
              ></Result>
            <button type="button" class="reset-btn" @click="reset">Reset</button>
          </div>
        </template>
    </Transition>
    
  </div>
</template>

<script>
import Questions from './components/Questions.vue'
import Result from './components/Result.vue'
export default {
  name: "App",
  components: {
    Questions,
    Result,
  },
  data() {
    return {
      flag: false,

      isAnswering: true, // 是否正在答题
      correctCount: 0, // 答对题目的数量
      titleResult: '', // 结果
      descriptionResult: '', // 结果
      currentIndexQue: 0, // 答题进度
      questions: {
        questions: [
          {
            q: 'What is 2 + 2?',
            answers: [
              {
                text: '4',
                is_correct: true
              },
              {
                text: '3',
                is_correct: false
              },
              {
                text: 'Fish',
                is_correct: false
              },
              {
                text: '5',
                is_correct: false
              }
            ]
          },
          {
            q: 'How many letters are in the word "Banana"?',
            answers: [
              {
                text: '5',
                is_correct: false
              },
              {
                text: '7',
                is_correct: false
              },
              {
                text: '6',
                is_correct: true
              },
              {
                text: '12',
                is_correct: false
              }
            ]
          },
          {
            q: 'Find the missing letter: C_ke',
            answers: [
              {
                text: 'e',
                is_correct: false
              },
              {
                text: 'a',
                is_correct: true
              },
              {
                text: 'i',
                is_correct: false
              }
            ]
          },
        ],
        results: [
          {
            min: 0,
            max: 2,
            title: "Try again!",
            desc: "Do a little more studying and you may succeed!"
          },
          {
            min: 3,
            max: 3,
            title: "Wow, you're a genius!",
            desc: "Studying has definitely paid off for you!"
          }
        ]
      }
    }
  },
  computed: {
    totalQue() {
      return this.questions.questions.length
    },
    // 根据答题进度计算当前答的题目，传递给子组件
    currentQue() {
      return this.questions.questions[this.currentIndexQue]
    }
  },
  methods: {
    getResult() {
      const result = this.questions.results.find((opt)=> this.correctCount >= opt.min && this.correctCount <= opt.max)
      if(!result) {
        throw(`CorrectCount is ${this.correctCount}, but is dose't match.`)
      }
      return result
    },
    answerQuestion(answer) {
      this.currentIndexQue++

      if(answer.is_correct) {
        this.correctCount++
      }

      if(this.currentIndexQue >= this.totalQue) {
        const {title, desc} = this.getResult()
        this.titleResult = title
        this.descriptionResult = desc
        this.isAnswering = false

      }
    },

    reset() {
      this.currentIndexQue = 0
      this.correctCount = 0
      this.resultMsg = ''
      this.isAnswering = true
    }
  }
}
</script>

<style>
.fade-enter-from , .fade-leave-to{
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s ease-in;
}
</style>
