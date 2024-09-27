import { ContractRoute } from '../contract/route'
import { SchemaInput, ServerContext } from '../types'
import { ServerMiddleware } from './middleware'
import { ServerRoute, ServerRouteHandler } from './route'
import { ServerRouteBuilder } from './route-builder'

export type ServerRouteBuilderBuilder<
  TContext extends ServerContext = ServerContext,
  TContract extends ContractRoute = ContractRoute
> = {
  __srcb: {
    contract: TContract
  }

  /** list proxy of contract route methods here */

  use<UExtraContext extends ServerContext>(
    middleware: ServerMiddleware<
      TContext,
      UExtraContext,
      TContract extends ContractRoute<infer TInputSchema> ? SchemaInput<TInputSchema> : never
    >
  ): ServerRouteBuilder<TContext, TContract, UExtraContext>

  use<
    UExtraContext extends ServerContext,
    UMappedInput = TContract extends ContractRoute<infer TInputSchema>
      ? SchemaInput<TInputSchema>
      : never
  >(
    middleware: ServerMiddleware<TContext, UExtraContext, UMappedInput>,
    mapInput: (
      input: TContract extends ContractRoute<infer TInputSchema> ? SchemaInput<TInputSchema> : never
    ) => UMappedInput
  ): ServerRouteBuilder<TContext, TContract, UExtraContext>

  handler(handler: ServerRouteHandler<TContext, TContract>): ServerRoute<TContext, TContract>
}
