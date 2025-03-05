import App from "@/App.vue";
import Questions from "@/components/Questions.vue";
import Result from "@/components/Result.vue";

import { expect, it } from "vitest";
import { mount } from "@vue/test-utils";

const questionsCompSel = '[data-test="questions-comp"]'
const resultCompSel = '[data-test="result-comp"]'

it('根据条件渲染不同组件', async() => {
  const wrapper = mount(App)
  

  expect(wrapper.getComponent(Questions).isVisible()).toBe(true)
  expect(()=> wrapper.getComponent(Result)).toThrowError()

  await wrapper.setData({ questionsAnswered: wrapper.vm.$data.questions.length })

  expect(()=> wrapper.getComponent(Questions)).toThrowError()
  expect(wrapper.getComponent(Result).isVisible()).toBe(true)
})


