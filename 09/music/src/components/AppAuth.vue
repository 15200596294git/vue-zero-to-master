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

          <!-- Login Form -->
          <VeeForm v-if="paneType === PANES.LOGIN">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <VeeField
                type="text"
                name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <input
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            >
              Submit
            </button>
          </VeeForm>
          <!-- Registration Form -->
          <VeeForm v-else-if="paneType === PANES.REGISTER"
            :validation-schema="schema"
          >
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <VeeField
                name="name"
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
              />
              <ErrorMessage name="name" class="text-red-600"></ErrorMessage>
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <VeeField
                name="email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
              <ErrorMessage class="text-red-600" name="email"></ErrorMessage>
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <VeeField
                type="number"
                name="age"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Age"
              />
              <ErrorMessage class="text-red-600" name="age"></ErrorMessage>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <VeeField
                name="password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
              />
              <ErrorMessage class="text-red-600" name="password"></ErrorMessage>
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <VeeField
                name="confirm_password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
              />
              <ErrorMessage class="text-red-600" name="confirm_password"></ErrorMessage>
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <VeeField 
                as="select"
                name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              >
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antarctica">Antarctica</option>
              </VeeField>
              <ErrorMessage class="text-red-600" name="country"></ErrorMessage>
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <VeeField as="input" type="checkbox" name="tos" value="1" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
              <ErrorMessage class="text-red-600" name="tos"></ErrorMessage>
              <label class="inline-block">Accept terms of service</label>
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            >
              Submit
            </button>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useModal from '../stores/modal'
import { mapState, mapWritableState } from 'pinia'
const PANES = {
  LOGIN: 'Login',
  REGISTER: 'Register'
}
export default {
  name: 'AppAuth',
  data() {
    return {
      // TODO paneType
      PANES,
      paneType: PANES.LOGIN,
      schema: {
        name: 'required|min:4|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password:'required|min:3|max:100',
        confirm_password: 'confirmed:@password',
        country: 'required|not_one_of:Antarctica',
        tos: 'required'
      }
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
