<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="reg_alert_variant"
    v-if="reg_show_alert"
  >
    {{ reg_alert_msg }}
  </div>
  <!-- Registration Form -->
  <VeeForm @submit="register" :validation-schema="schema" :initial-values="userData">
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
      <VeeField v-slot="{ errors, field }" :bails="false" name="password">
        <input
          v-bind="field"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
        <div v-for="err in errors" :key="err" class="text-red-600">
          {{ err }}
        </div>
      </VeeField>
      <!-- <ErrorMessage class="text-red-600" name="password"></ErrorMessage> -->
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
      <VeeField
        as="input"
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <ErrorMessage class="text-red-600" name="tos"></ErrorMessage>
      <label class="inline-block">Accept terms of service</label>
    </div>
    <button
      :disabled="reg_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>
<script>
import { auth, usersCollection } from '@/includes/firebase'

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:4|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:9|max:100|excluded:password',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos'
      },
      userData: {
        country: 'USA'
      },
      reg_show_alert: false,
      reg_in_submission: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created!'
    }
  },
  methods: {
    async register(values) {
      this.reg_in_submission = true
      this.reg_show_alert = true
      this.reg_alert_msg = 'Please wait! Your account is being created.'
      this.reg_alert_variant = 'bg-blue-500'

      let userCred = null
      try {
        userCred = await auth().createUserWithEmailAndPassword(values.email, values.password)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = 'An unexpected error occured. Please try again later.'
        this.reg_show_alert = true
        return
      }

      try {
        await usersCollection.add({
          age: values.age,
          naem: values.name,
          country: values.country,
          email: values.email
        })
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = 'An unexpected error occured. Please try again later.'
        this.reg_show_alert = true
        return
      }

      this.reg_in_submission = false
      this.reg_alert_msg = 'Success!'
      this.reg_alert_variant = 'bg-green-500'

      console.log('🚀 ~ register ~ userCred:', userCred)
    }
  }
}
</script>
