import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { validateCreateUser } from '../../middleware/validateCreateUser'


export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
    t.nonNull.string('email')
  }
})

export const PopUpResponse = objectType({
  name: 'popUpResponse',
  definition(t) {
    t.nonNull.list.string('message')
    t.nonNull.boolean('error')
  }
})

export const createUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: PopUpResponse,
      args: { email: nonNull(stringArg()) },
      resolve: validateCreateUser,
    })
  }
})