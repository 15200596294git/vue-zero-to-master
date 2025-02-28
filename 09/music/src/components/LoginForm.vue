<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="login_alert_variant"
    v-if="login_show_alert"
  >
    {{ login_alert_msg }}
  </div>
  <!-- Login Form -->
  <VeeForm :validation-schema="login_schema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        type="text"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600"></ErrorMessage>
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
      <ErrorMessage name="password" class="text-red-600"></ErrorMessage>
    </div>
    <button
      :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>
<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      login_schema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100|excluded:password',
      },
      login_show_alert: false,
      login_in_submission: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait! We are logging you in!'
    }
  },
  methods: {
    login(values) {

      this.login_in_submission = true
      this.login_show_alert = true
      this.login_alert_msg = 'Please wait! We are logging you in!'
      this.login_alert_variant = 'bg-blue-500'

      this.login_in_submission = false
      this.login_alert_msg = 'Success! You are now logged in.'
      this.login_alert_variant = 'bg-green-500'

      console.log(values)
    }
  }
}
</script>
