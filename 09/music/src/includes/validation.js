import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  defineRule,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as notOneOf
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('email', email)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', notOneOf)
    defineRule('country_excluded', notOneOf)

    configure({
      generateMessage(ctx) {
        const field = ctx.field
        const messages = {
          required: `The field ${field} is required.`,
          min: `The field ${field} is too short.`,
          max: `The field ${field} is too long.`,
          alpha_spaces: `The field ${field} may only contain alphabetical characters and spaces`,
          emial: `The field ${field} must be a field email.`,
          min_value: `The field ${field} is too low.`,
          max_value: `The field ${field} is too high.`,
          excluded: `You are not allowed to use this value for the field ${field}.`,
          country_excluded: `Due to restrictions, we do not accept users from this location`,
          passwords_mismatch: 'The passwords do not match',
          tos: 'You mus accept the Terms of Service.'
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${field} is invalid`

        return message
      }
    })
  }
}
