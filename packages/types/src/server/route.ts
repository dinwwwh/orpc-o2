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
          opts: TContract extends ContractRoute<infer TMethod, infer TPath, infer TInput>
            ? {
                method: TMethod
                path: TPath
                input: ValidationInferOutput<TInput>
                context: TCurrentContext
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
          opts: TContract extends ContractRoute<infer TMethod, infer TPath>
            ? {
                method: TMethod
                path: TPath
                input: TMappedInput
                context: TCurrentContext
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
      opts: TContract extends ContractRoute<infer TMethod, infer TPath, infer TInput>
        ? {
            method: TMethod
            path: TPath
            input: ValidationInferOutput<TInput>
            context: TCurrentContext
          }
        : never
    ) => Promisable<
      TContract extends ContractRoute<any, any, any, infer TOutput>
        ? ValidationInferInput<TOutput>
        : never
    >
  ): void
}
