import { ServerContext } from '../types'

export type ServerMiddleware<
  TContext extends ServerContext = ServerContext,
  TExtraContext extends ServerContext = ServerContext,
  TInput = unknown
> = {
  __sm: {
    fn: (opts: { context: TContext; input: TInput }) => { context?: TExtraContext } | void
  }
}
