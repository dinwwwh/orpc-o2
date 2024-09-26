import { HTTPMethod, MergeServerContext, ServerContext } from '../types'

export type ServerMiddleware<
  TContext extends ServerContext = ServerContext,
  TExtraContext extends ServerContext = ServerContext,
  TInput = unknown
> = {
  (
    input: TInput,
    context: TContext,
    meta: {
      method: HTTPMethod
      path: string
    }
  ): { context?: TExtraContext } | void
}

export type ExtendedServerMiddleware<
  TContext extends ServerContext = ServerContext,
  TExtraContext extends ServerContext = ServerContext,
  TInput = unknown
> = ServerMiddleware<TContext, TExtraContext, TInput> & {
  concat<UExtraContext extends ServerContext, UInput>(
    middleware: ServerMiddleware<
      MergeServerContext<TContext, TExtraContext>,
      UExtraContext,
      UInput & TInput
    >
  ): ExtendedServerMiddleware<
    TContext,
    MergeServerContext<TExtraContext, UExtraContext>,
    UInput & TInput
  >

  concat<UExtraContext extends ServerContext, UMappedInput extends TInput>(
    middleware: ServerMiddleware<
      MergeServerContext<TContext, TExtraContext>,
      UExtraContext,
      UMappedInput
    >,
    mapInput: (input: TInput) => UMappedInput
  ): ExtendedServerMiddleware<TContext, MergeServerContext<TExtraContext, UExtraContext>, TInput>
}
