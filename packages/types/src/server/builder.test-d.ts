import { object, string } from 'valibot'
import { ContractRoute } from '../contract/route'
import { ServerBuilder } from './builder'
import { ServerMiddleware } from './middleware'
const serverBuilder = {} as ServerBuilder<{ auth?: { id: string } }>

const Schema1 = object({
  postId: string(),
})

const Schema2 = object({
  postId: string(),
  title: string(),
})

serverBuilder
  .use(
    {} as ServerMiddleware<{ auth?: { id: string } }, { isAuth: boolean }, { postId: string }>,
    () => ({
      postId: '123',
    })
  )
  .contract({} as ContractRoute<'DELETE', '/post/{postId}', typeof Schema1, typeof Schema2>)
  .handler(async (input, context) => {
    return {
      postId: input.postId,
      title: '123',
    }
  })
