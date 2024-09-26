import { IsEqual } from 'type-fest'
import { BaseSchema, InferInput, InferOutput } from 'valibot'

export type HTTPPath = `/${string}`
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type HTTPStatus = number

export type ValidationSchema = BaseSchema<any, any, any>
export type ValidationInferInput<T> = T extends ValidationSchema ? InferInput<T> : never
export type ValidationInferOutput<T> = T extends ValidationSchema ? InferOutput<T> : never

export type ServerContext = Record<string, unknown>
export type MergeServerContext<TA extends ServerContext, TB extends ServerContext> = IsEqual<
  TA,
  ServerContext
> extends true
  ? TB
  : IsEqual<TB, ServerContext> extends true
  ? TA
  : Omit<TA, keyof TB> & TB
