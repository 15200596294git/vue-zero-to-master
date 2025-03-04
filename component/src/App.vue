<script>
import Greeting from '../components/Greeting.vue'
import User from '../components/User.vue'
import gsap from 'gsap';

export default {
  name: 'App',
  components: {
    Greeting,
    User,
  },
  data() {
    return {
      age: 20,
      flag: true,

      state: 'add',

      list: [4,2,5],

      list2: [2,5,46,7,4,8,1,56,42],
      isAnimating: false
    }
  },
  methods: {
    onBeforeEnter3(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    onEnter3(el, done) {
      const self = this
      this.isAnimating = true

      gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete() {
          self.isAnimating = false
          done()
        }
      })
    },
    onLeave3(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete() {
          done()
        }
      })
    },
    onList2Toggle() {
      // if(this.isAnimating) return
      if(this.list2.length) {
        this.list2.length = 0
      } else {
        this.list2 = [2,5,46,7,4,8,1,56,42]
      }
    },
    onAdd() {
      const value = Math.max(...this.list, 0)
      const randomI = Math.floor(Math.random() * this.list.length)
      this.list.splice(randomI, 0, value + 1)
    },
    onRemove() {
      const randomI = Math.floor(Math.random() * this.list.length)
      this.list.splice(randomI, 1)
    },

    changeState(state) {
      this.state = state
    },
    ageChange() {
      this.age++
    },
    onEnter(el, done) {
      gsap.fromTo(el,
        {
          opacity: 0,
          translateX: 200,
        }, {
        opacity: 1,
        translateX: 0,
        onComplete() {
          done()
        }
      })
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        translateX: 200,
        onComplete() {
          done()
        }
      })
    },


    onEnter2(el, done) {
      gsap.fromTo(el, {
        opacity: 0,
        translateY: 200
      }, {
        opacity: 1,
        translateY: 0
      }, { onComplete() { done() } })
    },
    onLeave2(el, done) {
      gsap.to(el, {
        opacity: 1,
        translateY: -0
      }, {
        onComplete() {
          done()
        }
      })
    }
  }
}
</script>

<template>
  <div>
    <!-- <Greeting :age="age"></Greeting>
    <User :age="age" @age-change="ageChange"></User> -->

    <button @click="flag = !flag">Toggle</button>
    <!-- <transition>
      <p v-if="flag">Hello World!</p>
    </transition> -->

    <!-- animation -->
    <!-- use animate.css -->
    <!-- <div style="display: flex; justify-content: center;">
       <transition name="mixed">
         <p class="my-hover" v-if="flag">Hello here is some bouncy text!</p>
       </transition>
     </div> -->

    <!-- 为嵌套元素设置过渡 -->
    <!-- <transition name="nested" :duration="800">
      <div style="display: flex; flex-direction: column;align-items: start; margin-top: 200px;overflow: hidden;" v-if="flag">
        <p class="inner1">other</p>
        <p class="inner2">Hello World!</p>
      </div>
    </transition>  -->

    <!-- 使用js -->
    <Transition @enter="onEnter" @leave="onLeave" appear>
      <div style="margin-top: 40px;" v-if="flag">Hello World!</div>
    </Transition>

    <!-- 元素之间的过渡 -->
    <!-- 使用v-if v-else v-else-if 只要保证一个时间只有一个元素展示，就可以有过渡的效果 -->
    <Transition name="slide-up" mode="out-in">
      <button v-if="state === 'add'" @click="changeState('edit')">add</button>
      <button v-else-if="state === 'edit'" @click="changeState('cancel')">edit</button>
      <button v-else-if="state==='cancel'" @click="changeState('add')">cancel</button>
    </Transition>

    <div>
      <button class="" @click="onAdd">add</button>
      <button @click="onRemove">remove</button>
      <button>shuffle</button>
    </div>

    <TransitionGroup style="width: 300px" name="list" tag="ul" enter-active-class="animate__animated animate__slideInRight" leave-active-class="absolute w-full animate__animated animate__slideOutRight">
      <li class="" v-for="item in list" :key="item">{{ item }}</li>
    </TransitionGroup>
    

    <button @click="onList2Toggle">toggle</button>
    <TransitionGroup tag="ul" appear @before-enter="onBeforeEnter3" @enter="onEnter3" @leave="onLeave3">
      <li v-for="(item, i) in list2" :key="item" :data-index="i">{{ item }}</li>
    </TransitionGroup>

  </div>
</template>

<style>
body {
  overflow-x: hidden;
}
</style>

<style scoped>
/* .list-move, .list-enter-active, .list-leave-active {
  transition: all .3s;
} */

.list-move {
  transition: all .3s;
}
/* 因为leave阶段的时候，元素会添加transition并且改变opacity和transform,此时这个元素会产生过渡
   所以这个元素移除的时候需要一定的时间，所以此时不会导致其他元素的位置发生改变
   然后在当前被移除的元素移除后，其他元素的位置需要改变了，但是这个时候Vue已经认为整个过渡结束了
   因为Vue自动监听了过渡结束的事件，那么list-move也就不会添加到其他元素上了

   所以我们既要保持当前被删除元素的过渡，又要让其他需要移动的元素同事开始过渡，我们就让当前被删除的元素
   提前脱离文档流，这样就能马上触发其他元素的move阶段，从而让其他元素

   添加absolute导致的问题
   在使用animate.css时，过渡使用了100%
   比如在一个例子中，元素占据了整个宽度，但是在添加absolute时，虽然脱离了文档流
   但是添加absolute后，宽度会变小，此时动画移动的距离就变小了，就出现了预期之外的效果
   可以在添加absolute后，再添加一个width:100%; 这样保证脱离文档流的同事也使原有的效果预期进行
*/
.absolute {
  position: absolute;
}
.w-full {
  width: 100%;
}
.list-leave-active {
  position: absolute;
}

/* .list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
} */


.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* 嵌套 */
.nested-enter-active {
  position: relative;
}

.nested-enter-active .inner1 {
  animation: bounceInDown .5s backwards;
}

.nested-leave-active .inner1 {
  animation: bounceOutDown .5s .3s forwards;
}

.nested-enter-active .inner2 {
  animation: bounceInRight .5s .3s backwards;
}

.nested-leave-active .inner2 {
  animation: bounceOutRight .5s forwards;
}



.mixed-enter-active,
.mixed-leave-active {
  animation: bounce .5s;
  /* 动画持续 2 秒 */
  transition: opacity 2s;
  /* 过渡持续 0.5 秒 */
}

.mixed-enter,
.mixed-leave-to {
  opacity: 0;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: all 5s ease;

}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* .my-hover {
  transition: all .1s ease;
  background-color: azure;
}
.my-hover:hover {
  background-color: aqua;
} */

/* .v-enter-from {
  opacity: 0;
  transform: translateX(80px);
}
.v-enter-to{
  opacity: 1;
  transform: translateX(0px);
}
.v-enter-active {
  transition: all .5s ease-out;
}

.v-leave-from {
  transform: translateX(0);
}
.v-leave-to {
  transform: translateX(80px);
}
.v-leave-active {
  transition: all .5s ease-in;
} */

/* .v-enter-active {
  animation: bounce .5s ease-out;
}
.v-leave-active {
  animation: bounce .5s ease-in reverse;
}

@keyframes bounce {
  from {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  to {
    transform: scale(1);
  }
} */
</style>
