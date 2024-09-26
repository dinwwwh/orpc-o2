import { Promisable } from 'type-fest'
import { ContractRoute } from '../contract/route'
import {
  MergeServerContext,
  ServerContext,
  ValidationInferInput,
  ValidationInferOutput,
} from '../types'
import { ServerMiddleware } from './middleware'

export type ServerRouteBuilder<
  TContext extends ServerContext = ServerContext,
  TContract extends ContractRoute = ContractRoute,
  TExtraContext extends ServerContext = ServerContext
> = {
  use<UExtraContext extends ServerContext>(
    middleware: ServerMiddleware<
      MergeServerContext<TContext, TExtraContext>,
      UExtraContext,
      TContract extends ContractRoute<any, any, infer TInput> ? ValidationInferInput<TInput> : never
    >
  ): ServerRouteBuilder<TContext, TContract, MergeServerContext<TExtraContext, UExtraContext>>

  use<
    UExtraContext extends ServerContext,
    UMappedInput = TContract extends ContractRoute<any, any, infer TInput>
      ? ValidationInferInput<TInput>
      : never
  >(
    middleware: ServerMiddleware<
      MergeServerContext<TContext, TExtraContext>,
      UExtraContext,
      UMappedInput
    >,
    mapInput: (
      input: TContract extends ContractRoute<any, any, infer TInput>
        ? ValidationInferInput<TInput>
        : never
    ) => UMappedInput
  ): ServerRouteBuilder<TContext, TContract, MergeServerContext<TExtraContext, UExtraContext>>

  handler(
    handler: (
      input: TContract extends ContractRoute<any, any, infer TInput>
        ? ValidationInferOutput<TInput>
        : never,
      context: MergeServerContext<TContext, TExtraContext>,
      meta: TContract extends ContractRoute<infer TMethod, infer TPath>
        ? {
            method: TMethod
            path: TPath
          }
        : never
    ) => Promisable<
      TContract extends ContractRoute<any, any, any, infer TOutput>
        ? ValidationInferInput<TOutput>
        : never
    >
  ): void
}
