import { ServerContext } from '../types'

export type ServerMiddleware<
  TContext extends ServerContext = ServerContext,
  TExtraContext extends ServerContext = ServerContext
> = {
  __sm: {
    fn: (opts: { context: TContext }) => { context?: TExtraContext } | void
  }
}
