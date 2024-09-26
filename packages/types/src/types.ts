import { IsEqual, Merge } from 'type-fest'
import { BaseSchema, InferInput, InferOutput } from 'valibot'

export type HTTPPath = `/${string}`
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type HTTPStatus = number

export type ValidationSchema = BaseSchema<any, any, any>
export type ValidationInferInput<T> = T extends ValidationSchema ? InferInput<T> : never
export type ValidationInferOutput<T> = T extends ValidationSchema ? InferOutput<T> : never

export type MergeUnionByKey<
  T extends Record<string, any>,
  Y extends Record<string, any>,
  K extends string
> = T extends { [_ in K]: infer T2 }
  ? Y extends { [_ in K]: infer Y2 }
    ? {
        [_ in K]: T2 | Y2
      }
    : {
        [_ in K]: T2
      }
  : Y extends { [_ in K]: infer Y23 }
  ? {
      [_ in K]: Y23
    }
  : {}

export type ServerContext = Record<string, unknown>
export type MergeServerContext<TA extends ServerContext, TB extends ServerContext> = IsEqual<
  TA,
  ServerContext
> extends true
  ? TB
  : IsEqual<TB, ServerContext> extends true
  ? TA
  : Merge<TA, TB>
