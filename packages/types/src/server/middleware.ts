import { HTTPMethod, ServerContext } from '../types'

export type ServerMiddleware<
  TContext extends ServerContext = ServerContext,
  TExtraContext extends ServerContext = ServerContext,
  TInput = unknown
> = {
  __sm: {
    fn: (
      input: TInput,
      context: TContext,
      meta: {
        method: HTTPMethod
        path: string
      }
    ) => { context?: TExtraContext } | void
  }
}
