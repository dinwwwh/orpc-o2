import { Simplify } from 'type-fest'
import {
  HTTPMethod,
  HTTPPath,
  HTTPStatus,
  ValidationInferInput,
  ValidationInferOutput,
  ValidationSchema,
} from '../types'

export type ContractRoute<
  T extends {
    path: HTTPPath
    method: HTTPMethod
    params?: ValidationSchema
    query?: ValidationSchema
    headers?: ValidationSchema
    body?: ValidationSchema
    response?: RouteResponse<any>
  }
> = {
  __cr: T
}

export type RouteResponse<
  T extends {
    status: HTTPStatus
    headers?: ValidationSchema
    body?: ValidationSchema
  }
> = T

export type InferRouteResponseInput<
  T extends {
    response?: RouteResponse<any>
  }
> = T extends { response: infer R }
  ? R extends RouteResponse<infer T>
    ? Simplify<
        T extends { status: infer S }
          ? { status: S }
          : {} & T extends { body: infer B }
          ? { body: ValidationInferInput<B> }
          : {} & T extends { headers: infer H }
          ? { body: ValidationInferInput<H> }
          : {}
      >
    : never
  : void

export type InferRouteRequestOutput<
  T extends {
    params?: ValidationSchema
    query?: ValidationSchema
    headers?: ValidationSchema
    body?: ValidationSchema
  }
> = Simplify<
  T extends { params: infer P }
    ? { params: ValidationInferOutput<P> }
    : {} & T extends { query: infer Q }
    ? { query: ValidationInferOutput<Q> }
    : {} & T extends { headers: infer H }
    ? { headers: ValidationInferOutput<H> }
    : {} & T extends { body: infer B }
    ? { body: ValidationInferOutput<B> }
    : {}
>
