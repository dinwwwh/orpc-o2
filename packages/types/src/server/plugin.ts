import { ContractPlugin } from '../contract/plugin'
import { InferRouteRequestOutput, InferRouteResponseInput } from '../contract/route'
import { ServerRouteBuilder } from './route'

export type ServerPlugin<
  T extends {
    contract: ContractPlugin<any>
  }
> = {
  middleware(
    mid: (
      input: T['contract'] extends ContractPlugin<infer T> ? InferRouteRequestOutput<T> : never
    ) => Promise<T['contract'] extends ContractPlugin<infer T> ? InferRouteResponseInput<T> : never>
  ): void
}

export type ServerRouteBuilderUsePlugin<
  TRoute extends ServerRouteBuilder<any>,
  TPlugin extends ServerPlugin<any>
> = TRoute
