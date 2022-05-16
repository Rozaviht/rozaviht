import { extendType, inputObjectType, objectType } from 'nexus'
import { validateShippingForm } from '../../middleware/validateShippingForm'

export const CustomerInformation = objectType({
  name: 'customerInformation',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('lastName')
    t.nonNull.string('phone')
    t.string('cif')
    t.nonNull.string('email')
    t.nonNull.string('address')
    t.nonNull.string('provincie')
    t.nonNull.string('city')
    t.string('shippingComment')
  }
})


const ShippingFormData = inputObjectType({
  name: 'shippingFormData',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('lastName')
    t.nonNull.string('phone')
    t.string('cif')
    t.nonNull.string('email')
    t.nonNull.string('address')
    t.nonNull.string('provincie')
    t.nonNull.string('city')
    t.string('shippingComment')
  }
})

const ShippingFormResponse = objectType({
  name: 'shippingFormResponse',
  definition(t) {
    t.nonNull.string('message')
    t.nonNull.boolean('error')
  }
})

export const  createOrder = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('validateShippingForm', {
      type: ShippingFormResponse,
      args: { shippingFormData: ShippingFormData},
      resolve: validateShippingForm,
    })
  } 
})