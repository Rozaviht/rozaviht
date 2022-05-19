import { arg, extendType, inputObjectType, objectType } from 'nexus'
import { validateShippingForm } from '../../middleware/validateShippingForm'
import { validateBillingForm } from '../../middleware/validateBillingForm'

export const CustomerInformation = objectType({
  name: 'customerInformation',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('lastName')
    t.nonNull.string('email')
    t.nonNull.string('phone')
    t.string('cif')
    t.nonNull.string('provincie')
    t.nonNull.string('city')
    t.nonNull.string('postalcode')
    t.nonNull.string('address')
    t.nonNull.string('addressNumber')
    t.nonNull.string('door')
    t.string('shippingComment')
  }
})


const ShippingFormInputs = inputObjectType({
  name: 'shippingFormInputs',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('lastName')
    t.nonNull.string('email')
    t.nonNull.string('phone')
    t.nonNull.string('provincie')
    t.nonNull.string('city')
    t.nonNull.string('postalcode')
    t.nonNull.string('address')
    t.nonNull.string('addressNumber')
    t.nonNull.string('door')
    t.string('shippingComment')
  }
})

const BillingFormInputs = inputObjectType({
  name: 'billingFormInputs',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('lastName')
    t.nonNull.string('email')
    t.nonNull.string('phone')
    t.nonNull.string('provincie')
    t.nonNull.string('city')
    t.nonNull.string('postalcode')
    t.nonNull.string('address')
    t.nonNull.string('addressNumber')
    t.nonNull.string('door')
  }
})

const CheckoutFormResponse = objectType({
  name: 'checkoutFormResponse',
  definition(t) {
    t.nonNull.list.string('message')
    t.nonNull.boolean('error')
  }
})

export const ShippingFormValidation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('validateShippingForm', {
      type: CheckoutFormResponse,
      args: {
        input: arg({
          type: ShippingFormInputs
        })
      },
      resolve: validateShippingForm,
    })
  } 
})

export const BillingFormValidation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('validateBillingForm', {
      type: CheckoutFormResponse,
      args: {
        input: arg({
          type: BillingFormInputs
        })
      },
      resolve: validateBillingForm,
    })
  } 
})