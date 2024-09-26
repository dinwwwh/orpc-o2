import { date, number, object, string } from 'valibot'
import { expectTypeOf } from 'vitest'
import { ContractRoute } from '../contract/route'
import { ServerMiddleware } from './middleware'
import { ServerRouteBuilder } from './route'

const InputSchema = object({
  page: number(),
  size: number(),
})

const OutputSchema = object({
  id: string(),
  name: string(),
  dob: date(),
})

const userRouteContract = {} as ContractRoute<
  'GET',
  '/user',
  typeof InputSchema,
  typeof OutputSchema
>

const userRouteBuilder = {} as ServerRouteBuilder<{}, typeof userRouteContract>

userRouteBuilder.handler(async ({ input }) => {
  expectTypeOf(input).toEqualTypeOf<{
    page: number
    size: number
  }>()

  return {
    id: '123',
    name: 'dinwwwh',
    dob: new Date(),
  }
})

// @ts-expect-error invalid status
userRouteBuilder.handler(async () => {
  return {
    id: 123,
    name: 'dinwwwh',
    dob: new Date(),
  }
})

const middleware = {} as ServerMiddleware<{ b: number }, { mid: number }>
const middleware2 = {} as ServerMiddleware<{ b: number }, { mid: number }, { z: number }>

//
;(
  ({}) as ServerRouteBuilder<
    {
      a: number
    },
    typeof userRouteContract
  >
)
  .use(({ input, context }) => {
    return {
      context: {
        b: 123,
      },
    }
  })
  .use(
    ({ input }: { input: { z: number } }) => {
      expectTypeOf(input).toEqualTypeOf<{
        z: number
      }>()

      return {
        context: {
          b: 123,
        },
      }
    },
    () => ({ z: 123 })
  )
  // @ts-expect-error invalid input
  .use(({ input: _input }: { input: { z: number } }) => {
    return {
      context: {
        b: 123,
      },
    }
  })
  .use(middleware)
  .use(middleware2, () => ({ z: 5 }))
  // @ts-expect-error invalid input
  .use(middleware2)
  .handler(async ({ input: _input, context }) => {
    expectTypeOf(context).toMatchTypeOf<{
      a: number
      b: number
      mid: number
    }>()

    return {
      id: '123',
      name: 'dinwwwh',
      dob: new Date(),
    }
  })
