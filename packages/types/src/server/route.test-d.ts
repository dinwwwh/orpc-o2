import { date, number, object, string } from 'valibot'
import { expectTypeOf } from 'vitest'
import { ContractRoute, RouteResponse } from '../contract/route'
import { ServerRouteBuilder } from './route'

const QuerySchema = object({
  page: number(),
  size: number(),
})

const UserSchema = object({
  id: string(),
  name: string(),
  dob: date(),
})

const userRouteContract = {} as ContractRoute<{
  method: 'GET'
  path: '/user'
  params: typeof QuerySchema
  response:
    | RouteResponse<{
        status: 200
        body: typeof UserSchema
      }>
    | RouteResponse<{
        status: 201
        body: typeof UserSchema
      }>
}>

const userRouteBuilder = {} as ServerRouteBuilder<{
  contract: typeof userRouteContract
}>

userRouteBuilder.handler(async ({ params }) => {
  expectTypeOf(params).toEqualTypeOf<{
    page: number
    size: number
  }>()

  return {
    status: 200,
    body: {
      id: '123',
      name: 'dinwwwh',
      dob: new Date(),
    },
  }
})

// @ts-expect-error invalid status
userRouteBuilder.handler(async () => {
  return {
    status: 202,
    body: {
      id: '123',
      name: 'dinwwwh',
      dob: new Date(),
    },
  }
})
