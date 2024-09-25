import { Promisable } from 'type-fest'
import { ContractRoute, InferRouteRequestOutput, InferRouteResponseInput } from '../contract/route'

export type ServerRouteBuilder<
  T extends {
    contract: ContractRoute<any>
  }
> = {
  handler(
    handler: (
      input: T['contract'] extends ContractRoute<infer T> ? InferRouteRequestOutput<T> : never
    ) => Promisable<
      T['contract'] extends ContractRoute<infer T> ? InferRouteResponseInput<T> : never
    >
  ): void
}
