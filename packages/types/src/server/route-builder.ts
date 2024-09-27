import { ContractRoute } from '../contract/route'
import { MergeServerContext, SchemaInput, ServerContext } from '../types'
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
      TContract extends ContractRoute<infer TInputSchema> ? SchemaInput<TInputSchema> : never
    >
  ): ServerRouteBuilder<TContext, TContract, MergeServerContext<TExtraContext, UExtraContext>>

  use<
    UExtraContext extends ServerContext,
    UMappedInput = TContract extends ContractRoute<infer TInputSchema>
      ? SchemaInput<TInputSchema>
      : never
  >(
    middleware: ServerMiddleware<
      MergeServerContext<TContext, TExtraContext>,
      UExtraContext,
      UMappedInput
    >,
    mapInput: (
      input: TContract extends ContractRoute<infer TInputSchema> ? SchemaInput<TInputSchema> : never
    ) => UMappedInput
  ): ServerRouteBuilder<TContext, TContract, MergeServerContext<TExtraContext, UExtraContext>>

  handler<
    UHandlerOutput extends TContract extends ContractRoute<any, infer TOutputSchema>
      ? SchemaInput<TOutputSchema>
      : never
  >(
    handler: ServerRouteHandler<
      MergeServerContext<TContext, TExtraContext>,
      TContract,
      UHandlerOutput
    >
  ): ServerRoute<TContext, TContract, TExtraContext, UHandlerOutput>
}
