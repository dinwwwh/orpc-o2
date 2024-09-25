import { Simplify } from 'type-fest'
import { MergeUnionByKey, ValidationSchema } from '../types'
import { ContractRoute, RouteResponse } from './route'

export type ContractPlugin<
  T extends {
    response?: RouteResponse<any>
    params?: ValidationSchema
    query?: ValidationSchema
    headers?: ValidationSchema
    body?: ValidationSchema
  }
> = {
  __cp: T
}

export type ContractRouteUsePlugin<
  TRoute extends ContractRoute<any>,
  TPlugin extends ContractPlugin<any>
> = TRoute extends ContractRoute<infer T>
  ? TPlugin extends ContractPlugin<infer Y>
    ? ContractRoute<Simplify<Omit<T, 'response'> & MergeUnionByKey<T, Y, 'response'>>>
    : never
  : never
