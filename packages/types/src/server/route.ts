import { Promisable } from 'type-fest'
import { ContractRoute } from '../contract/route'
import {
  HTTPMethod,
  HTTPPath,
  MergeServerContext,
  SchemaInput,
  SchemaOutput,
  ServerContext,
} from '../types'

export type ServerRoute<
  TContext extends ServerContext = ServerContext,
  TContract extends ContractRoute = ContractRoute,
  TExtraContext extends ServerContext = ServerContext,
  THandlerOutput extends TContract extends ContractRoute<any, infer TOutputSchema>
    ? SchemaInput<TOutputSchema>
    : never = any
> = {
  __sr: {
    contract: TContract
    handler: ServerRouteHandler<
      MergeServerContext<TContext, TExtraContext>,
      TContract,
      THandlerOutput
    >
  }
}

export type ServerRouteHandler<
  TContext extends ServerContext = ServerContext,
  TContract extends ContractRoute = ContractRoute,
  THandlerOutput extends TContract extends ContractRoute<any, infer TOutputSchema>
    ? SchemaInput<TOutputSchema>
    : never = any
> = {
  (
    input: TContract extends ContractRoute<infer TInputSchema> ? SchemaOutput<TInputSchema> : never,
    context: TContext,
    meta: {
      method: HTTPMethod
      path: HTTPPath
    }
  ): Promisable<THandlerOutput>
}
