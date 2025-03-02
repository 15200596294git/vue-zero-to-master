<script>
import Greeting from '../components/Greeting.vue'
import User from '../components/User.vue'
export default {
  name: 'App',
  components: {
    Greeting,
    User,
  },
  data() {
    return {
      age: 20,
      flag: false
    }
  },
  methods: {
    ageChange() {
      this.age++
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
    <transition name="nested" :duration="500">
      <div v-if="flag">
        <p class="inner1 animate__animated">other</p>
        <p class="inner2">Hello World!</p>
      </div>
    </transition> 
  </div>
</template>

<style scoped>
/* 嵌套 */



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
