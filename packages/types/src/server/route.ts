import { Promisable } from 'type-fest'
import { ContractRoute } from '../contract/route'
import {
  HTTPMethod,
  HTTPPath,
  MergeServerContext,
  ServerContext,
  ValidationInferInput,
  ValidationInferOutput,
} from '../types'

export type ServerRoute<
  TContext extends ServerContext = ServerContext,
  TContract extends ContractRoute = ContractRoute,
  TExtraContext extends ServerContext = ServerContext
> = {
  __sr: {
    contract: TContract
    handler: ServerRouteHandler<MergeServerContext<TContext, TExtraContext>, TContract>
  }
}

export type ServerRouteHandler<
  TContext extends ServerContext = ServerContext,
  TContract extends ContractRoute = ContractRoute
> = {
  (
    input: TContract extends ContractRoute<infer TInputSchema>
      ? ValidationInferOutput<TInputSchema>
      : never,
    context: TContext,
    meta: {
      method: HTTPMethod
      path: HTTPPath
    }
  ): Promisable<
    TContract extends ContractRoute<any, infer TOutputSchema>
      ? ValidationInferInput<TOutputSchema>
      : never
  >
}
