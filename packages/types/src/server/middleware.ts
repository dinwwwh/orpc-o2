import { IsUnknown, Promisable } from 'type-fest'
import { HTTPMethod, MergeServerContext, ServerContext } from '../types'

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

  concat<UExtraContext extends ServerContext, UInput extends Partial<TInput>>(
    middleware:
      | ServerMiddleware<
          MergeServerContext<TContext, TExtraContext>,
          UExtraContext,
          IsUnknown<TInput> extends true ? unknown : UInput
        >
      | ServerMiddleware<MergeServerContext<TContext, TExtraContext>, UExtraContext>
      | ((
          input: TInput,
          context: TContext,
          meta: {
            method: HTTPMethod
            path: string
          }
        ) => Promisable<{
          context?: UExtraContext
        } | void>)
  ): ServerMiddleware<TContext, MergeServerContext<TExtraContext, UExtraContext>, TInput>

  concat<UExtraContext extends ServerContext, UMappedInput = TInput>(
    middleware:
      | ServerMiddleware<MergeServerContext<TContext, TExtraContext>, UExtraContext, UMappedInput>
      | ((
          input: UMappedInput,
          context: TContext,
          meta: {
            method: HTTPMethod
            path: string
          }
        ) => Promisable<{
          context?: UExtraContext
        } | void>),
    mapInput: (input: TInput) => UMappedInput
  ): ServerMiddleware<TContext, MergeServerContext<TExtraContext, UExtraContext>, TInput>
}
