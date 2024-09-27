import { IsEqual } from 'type-fest'
import { BaseSchema, InferInput, InferOutput } from 'valibot'

export type HTTPPath = `/${string}`
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type HTTPStatus = number

export type Schema = BaseSchema<any, any, any>
export type SchemaInput<T extends Schema, TFallback = unknown> = IsEqual<T, Schema> extends true
  ? TFallback
  : InferInput<T>
export type SchemaOutput<T extends Schema, TFallback = unknown> = IsEqual<T, Schema> extends true
  ? TFallback
  : InferOutput<T>

export type ServerContext = Record<string, unknown>
export type MergeServerContext<TA extends ServerContext, TB extends ServerContext> = IsEqual<
  TA,
  ServerContext
> extends true
  ? TB
  : IsEqual<TB, ServerContext> extends true
  ? TA
  : Omit<TA, keyof TB> & TB
