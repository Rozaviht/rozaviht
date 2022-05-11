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

const subcriptionResponse = objectType({
  name: 'subcriptionResponse',
  definition(t) {
    t.nonNull.string('message')
    t.nonNull.boolean('error')
  }
})

export const createUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: subcriptionResponse,
      args: { email: nonNull(stringArg()) },
      resolve: validateCreateUser,
    })
  }
})