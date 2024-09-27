import { ContractRoute } from '../contract/route'
import { MergeServerContext, ServerContext, ValidationInferInput } from '../types'
import { ServerMiddleware } from './middleware'
import { ServerRoute, ServerRouteHandler } from './route'

export type ServerRouteBuilder<
  TContext extends ServerContext = ServerContext,
  TContract extends ContractRoute = ContractRoute,
  TExtraContext extends ServerContext = ServerContext
> = {
  use<UExtraContext extends ServerContext>(
    middleware: ServerMiddleware<
      MergeServerContext<TContext, TExtraContext>,
      UExtraContext,
      TContract extends ContractRoute<infer TInputSchema>
        ? ValidationInferInput<TInputSchema>
        : never
    >
  ): ServerRouteBuilder<TContext, TContract, MergeServerContext<TExtraContext, UExtraContext>>

  use<
    UExtraContext extends ServerContext,
    UMappedInput = TContract extends ContractRoute<infer TInputSchema>
      ? ValidationInferInput<TInputSchema>
      : never
  >(
    middleware: ServerMiddleware<
      MergeServerContext<TContext, TExtraContext>,
      UExtraContext,
      UMappedInput
    >,
    mapInput: (
      input: TContract extends ContractRoute<infer TInputSchema>
        ? ValidationInferInput<TInputSchema>
        : never
    ) => UMappedInput
  ): ServerRouteBuilder<TContext, TContract, MergeServerContext<TExtraContext, UExtraContext>>

  handler(
    handler: ServerRouteHandler<MergeServerContext<TContext, TExtraContext>, TContract>
  ): ServerRoute<TContext, TContract, TExtraContext>
}
