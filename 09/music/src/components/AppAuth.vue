<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" :class="hiddenClass" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="closeModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <!-- TODO Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                @click.prevent="togglePane(PANES.LOGIN)"
                :class="{
                  'bg-blue-600 text-white': paneType === PANES.LOGIN
                }"
                class="block rounded py-3 px-4 transition"
                href="#"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                @click="togglePane(PANES.REGISTER)"
                :class="{
                  'bg-blue-600 text-white': paneType === PANES.REGISTER
                }"
                class="block rounded py-3 px-4 transition"
                href="#"
                >Register</a
              >
            </li>
          </ul>

          <LoginForm v-if="paneType === PANES.LOGIN"></LoginForm>
          <RegisterForm v-else-if="paneType === PANES.REGISTER"></RegisterForm>

 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useModal from '../stores/modal'
import { mapState, mapWritableState } from 'pinia'

import RegisterForm from './RegisterForm.vue';
import LoginForm from './LoginForm.vue';
const PANES = {
  LOGIN: 'Login',
  REGISTER: 'Register'
}
export default {
  name: 'AppAuth',
  components: {
    RegisterForm,
    LoginForm,
  },
  data() {
    return {
      PANES,
      paneType: PANES.LOGIN,
    }
  },
  computed: {
    ...mapState(useModal, ['hiddenClass']),
    ...mapWritableState(useModal, ['isOpen'])
  },
  methods: {
    togglePane(type) {
      this.paneType = type
    },
    closeModal() {
      this.isOpen = false
    }
  }
}
</script>
<style></style>
