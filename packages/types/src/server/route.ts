import { IsEqual, Promisable } from 'type-fest'
import { ContractRoute } from '../contract/route'
import { ServerContext, ValidationInferInput, ValidationInferOutput } from '../types'
import { ServerMiddleware } from './middleware'

export type ServerRouteBuilder<
  TContext extends ServerContext = ServerContext,
  TContract extends ContractRoute = ContractRoute,
  TCurrentContext extends ServerContext = TContext
> = {
  use<TExtraContext extends ServerContext>(
    middleware:
      | ServerMiddleware<
          TCurrentContext,
          TExtraContext,
          TContract extends ContractRoute<any, any, infer TInput>
            ? ValidationInferInput<TInput>
            : never
        >
      | ((
          input: TContract extends ContractRoute<any, any, infer TInput>
            ? ValidationInferOutput<TInput>
            : never,
          context: TCurrentContext,
          meta: TContract extends ContractRoute<infer TMethod, infer TPath>
            ? {
                method: TMethod
                path: TPath
              }
            : never
        ) => Promisable<{
          context?: TExtraContext
        } | void>)
  ): ServerRouteBuilder<
    TContext,
    TContract,
    TCurrentContext & (IsEqual<TExtraContext, ServerContext> extends true ? {} : TExtraContext)
  >
  use<
    TExtraContext extends ServerContext,
    TMappedInput = TContract extends ContractRoute<any, any, infer TInput>
      ? ValidationInferInput<TInput>
      : never
  >(
    middleware:
      | ServerMiddleware<TCurrentContext, TExtraContext, TMappedInput>
      | ((
          input: TMappedInput,
          context: TCurrentContext,
          meta: TContract extends ContractRoute<infer TMethod, infer TPath>
            ? {
                method: TMethod
                path: TPath
              }
            : never
        ) => Promisable<{
          context?: TExtraContext
        } | void>),
    mapInput: (
      input: TContract extends ContractRoute<any, any, infer TInput>
        ? ValidationInferInput<TInput>
        : never
    ) => TMappedInput
  ): ServerRouteBuilder<
    TContext,
    TContract,
    TCurrentContext & (IsEqual<TExtraContext, ServerContext> extends true ? {} : TExtraContext)
  >

  handler(
    handler: (
      input: TContract extends ContractRoute<any, any, infer TInput>
        ? ValidationInferOutput<TInput>
        : never,
      context: TCurrentContext,
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
