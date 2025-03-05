import Questions from "../Questions.vue"
import { expect, it } from "vitest"
import { mount } from "@vue/test-utils"

const mockQuestions = [{
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
]
// 首次进入正确展示对应的问题
it('首次进入正确展示对应的问题', async () => {
  const wrapper = mount(Questions, {
    attachTo: document.body,
    props: {
      questions: mockQuestions,
      questionsAnswered: 0
    }
  })

  const questions = wrapper.findAll('[data-test="questions-text"]')
  const visibleQuestions = questions.filter(q => {
    
    console.log('🚀 ~ it ~ q:', q.isVisible())
    console.log('🚀 ~ it ~ q:', q.text())
    return q.isVisible()
  })


  expect(visibleQuestions.length).toBe(1)
  expect(visibleQuestions[0].text()).toBe(mockQuestions[0].q)
})

// 进入下一题问题正确展示
it('进入下一题问题正确展示', async () => {
  const wrapper = mount(Questions, {
    attachTo: document.body,
    props: {
      questions: mockQuestions,
      questionsAnswered: 1
    }
  })

  const questions = wrapper.findAll('[data-test="questions-text"]')
  const visibleQuestions = questions.filter(q => q.isVisible())
  expect(visibleQuestions.length).toBe(1)
  expect(visibleQuestions[0].text()).toBe(mockQuestions[1].q)
})

// 点击后发出事件
it('点击选项后emit 事件', async () => {
  const wrapper = mount(Questions, {
    attachTo: document.body,
    props: {
      questions: mockQuestions,
      questionsAnswered: 0
    }
  })

  const answerWrap = wrapper.get('[data-test="answer-wrap"]')
  await answerWrap.find('[data-test="answer"]').trigger('click')

  expect(wrapper.emitted()['question-answered']).toHaveLength(1)
})

