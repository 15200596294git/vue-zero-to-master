import { mount } from "@vue/test-utils";
import TodoApp from "../TodoApp.vue";
import { describe, expect, it } from "vitest";

// 输入框测试
const todoInputSelector = '[data-test="todo-input"]'
const addButtonSelector = '[data-test="todo-submit"]'
const todoItemSelector = '[data-test="todo-item"]'
const todoTextSel = '[data-test="todo-text"]'
const completesSel = '[data-test="todo-completes"]'
const delButtonSel = '[data-test="todo-delete"]'

describe('add new todo', async () => {
  const wrapper = mount(TodoApp)

  it('input 输入框测试', async () => {
    // 如果input内容为空，不会新增
    // input内容不为空时，点击按钮新增；
    // todos内容新增；input内容重置为空
    await wrapper.get(addButtonSelector).trigger('click')
    expect(wrapper.findAll(todoItemSelector).length).toBe(0)

    await wrapper.get(todoInputSelector).setValue('Finish work')
    await wrapper.get(addButtonSelector).trigger('click')
    expect(wrapper.findAll(todoItemSelector).length).toBe(1)
    expect(wrapper.get(todoInputSelector).element.textContent).toBe('')
  })
})

describe('completes', () => {
  const wrapper = mount(TodoApp)
  it('完成', async () => {
    // 点击checkbox状态改为完成；新增completed css类
    // 再次点击可反转状态

    // 添加一条数据
    await wrapper.get(todoInputSelector).setValue('Finish work')
    await wrapper.get(addButtonSelector).trigger('click')

    await wrapper.get(completesSel).setValue(true)
    expect(wrapper.get(todoItemSelector).classes()).contain('completed')
  })
})

describe('delete', () => {
  it('普通删除', async () => {
    // 点击按钮进行删除；页面数据减一
    const wrapper = mount(TodoApp)

    await wrapper.get(todoInputSelector).setValue('Task1')
    await wrapper.get(addButtonSelector).trigger('click')

    await wrapper.get(delButtonSel).trigger('click')
    expect(wrapper.findAll(todoItemSelector).length).toBe(0)
  })



  it('多项时删除1', async () => {
    const wrapper = mount(TodoApp)

    // 添加多条数据
    await wrapper.get(todoInputSelector).setValue('Task1')
    await wrapper.get(addButtonSelector).trigger('click')
    await wrapper.get(todoInputSelector).setValue('Task2')
    await wrapper.get(addButtonSelector).trigger('click')


    await wrapper.findAll(delButtonSel)[0].trigger('click')
    expect(wrapper.get(todoTextSel).text()).toBe('Task2')
  })

  it('多项时删除2', async () => {
    const wrapper = mount(TodoApp)

    // 添加多条数据
    await wrapper.get(todoInputSelector).setValue('Task1')
    await wrapper.get(addButtonSelector).trigger('click')
    await wrapper.get(todoInputSelector).setValue('Task2')
    await wrapper.get(addButtonSelector).trigger('click')

    wrapper.findAll(delButtonSel)[1].trigger('click')
    expect(wrapper.get(todoTextSel).text()).toBe('Task1')
  })
})