import { arg, extendType, inputObjectType, objectType } from 'nexus'
import { validateShippingForm } from '../../middleware/validateShippingForm'
import { validateBillingForm } from '../../middleware/validateBillingForm'
import { SuccessResponse } from './OrderNumber'
import { createCustomer } from 'middleware/createCustomer'


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

export const CustomerInformationInputs = inputObjectType({
  name: 'customerInformationInputs',
  definition(t) {
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

const CheckoutFormResponse = objectType({
  name: 'checkoutFormResponse',
  definition(t) {
    t.nonNull.list.string('message')
    t.nonNull.boolean('error')
  }
})

const CreateCustomerResponse = objectType({
  name: 'createCustomerResponse',
  definition(t) {
    t.nonNull.boolean('success')
    t.nonNull.string('customerName')
    t.nonNull.string('customerPhone')
    t.nonNull.string('customerEmail')
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

export const CreateUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createCustomer', {
      type: SuccessResponse,
      args: {
        input: arg({
          type: CustomerInformationInputs
        })
      },
      resolve: createCustomer,
    })
  } 
})