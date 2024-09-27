import { date, number, object, string } from 'valibot'
import { expectTypeOf } from 'vitest'
import { ContractRoute } from '../contract/route'
import { ExtendedServerMiddleware, ServerMiddleware } from './middleware'
import { ServerRouteBuilder } from './route-builder'

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
  typeof InputSchema,
  typeof OutputSchema,
  'GET',
  '/user'
>

const userRouteBuilder = {} as ServerRouteBuilder<{}, typeof userRouteContract>

userRouteBuilder.handler(async (input) => {
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

const middleware1 = {} as ExtendedServerMiddleware<{ b: number }, { mid: number }>

middleware1.concat((input) => {
  expectTypeOf(input).toEqualTypeOf<unknown>()

  return {
    context: {
      uuu: 123,
    },
  }
})

const middleware = {} as ExtendedServerMiddleware<{ b: number }, { mid: number }, { page: number }>
const middleware2 = {} as ExtendedServerMiddleware<{ b: number }, { mid: number }, { z: number }>

//
const ffdfd = {} as ServerRouteBuilder<
  {
    a: number
  },
  typeof userRouteContract
>

ffdfd
  .use((input) => {
    return {
      context: {
        b: 123,
      },
    }
  })
  .use(
    (input: { z: number }) => {
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
  .use(middleware1)
  .use(middleware2, () => ({ z: 5 }))
  // @ts-expect-error invalid input
  .use(middleware2)
  .use(
    middleware2.concat((input) => {
      expectTypeOf(input).toEqualTypeOf<{
        z: number
      }>()
      return {
        context: {
          ddd: 123,
        },
      }
    }),
    () => ({ z: 5 })
  )
  .handler(async (_, context) => {
    expectTypeOf(context).toMatchTypeOf<{
      a: number
      b: number
      mid: number
      ddd: number
    }>()

    return {
      id: '123',
      name: 'dinwwwh',
      dob: new Date(),
    }
  })

//
;(
  ({}) as ServerRouteBuilder<
    {
      b: number
    },
    typeof userRouteContract
  >
)
  // @ts-expect-error invalid input
  .use(middleware1.concat(middleware2))
  .use(
    ({} as ExtendedServerMiddleware<{ b: number }, {}, { page: number; size: number }>).concat(
      {} as ServerMiddleware<{ b: number }, {}, { page: number }>
    )
  )
  .use(
    ({} as ExtendedServerMiddleware<{ b: number }, {}, { page: number }>).concat(
      {} as ServerMiddleware<{ b: number }, {}, { page: number; size: number }>
    )
  )
  .handler(async (_, context) => {
    expectTypeOf(context).toMatchTypeOf<{
      b: number
      mid: number
    }>()

    return {
      id: '123',
      name: 'dinwwwh',
      dob: new Date(),
    }
  })
