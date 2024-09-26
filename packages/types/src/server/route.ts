import { Promisable } from 'type-fest'
import { ContractRoute } from '../contract/route'
import {
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
    input: TContract extends ContractRoute<any, any, infer TInput>
      ? ValidationInferOutput<TInput>
      : never,
    context: TContext,
    meta: TContract extends ContractRoute<infer TMethod, infer TPath>
      ? {
          method: TMethod
          path: TPath
        }
      : never
  ): Promisable<
    TContract extends ContractRoute<any, any, any, infer TOutput>
      ? ValidationInferInput<TOutput>
      : never
  >
}
