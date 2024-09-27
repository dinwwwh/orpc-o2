import { ContractRoute } from '../contract/route'
import { MergeServerContext, ServerContext } from '../types'
import { ServerMiddleware } from './middleware'
import { ServerRouteBuilder } from './route-builder'

export type ServerBuilder<
  TContext extends ServerContext = ServerContext,
  TExtraContext extends ServerContext = ServerContext
> = {
  __sb: {
    middlewares: ServerMiddleware[]
  }

  context<UContext extends ServerContext>(): ServerBuilder<UContext>

  use<UExtraContext extends ServerContext>(
    middleware: ServerMiddleware<MergeServerContext<TContext, TExtraContext>, UExtraContext>
  ): ServerBuilder<TContext, MergeServerContext<TExtraContext, UExtraContext>>

  use<UExtraContext extends ServerContext, UMappedInput = unknown>(
    middleware: ServerMiddleware<
      MergeServerContext<TContext, TExtraContext>,
      UExtraContext,
      UMappedInput
    >,
    mapInput: (input: unknown) => UMappedInput
  ): ServerBuilder<TContext, MergeServerContext<TExtraContext, UExtraContext>>

  contract<UContract extends ContractRoute>(
    contract: UContract
  ): ServerRouteBuilder<TContext, UContract, TExtraContext>
}
