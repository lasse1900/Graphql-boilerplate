import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: 'Timo Mäki',
    email: 'timo@example.com',
    password: bcrypt.hashSync('secret123')
  },
  user: undefined,
  jwt: undefined
}

const userTwo = {
  input: {
    name: 'Juha Tommila',
    email: 'juha@example.com',
    password: bcrypt.hashSync('secret123')
  },
  user: undefined,
  jwt: undefined
}

const seedDatabse = async () => {
  // delete testData
  await prisma.mutation.deleteManyUsers()

  // create userOne
  userOne.user = await prisma.mutation.createUser({ data: userOne.input })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  // create userTwo
  userTwo.user = await prisma.mutation.createUser({ data: userTwo.input })
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

}
export { seedDatabse as default, userOne, userTwo }