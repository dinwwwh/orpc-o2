import { HTTPMethod, HTTPPath, ValidationSchema } from '../types'

export type ContractRoute<
  TMethod extends HTTPMethod = HTTPMethod,
  TPath extends HTTPPath = HTTPPath,
  TInput extends ValidationSchema = ValidationSchema,
  TOutput extends ValidationSchema = ValidationSchema
> = {
  __cr: {
    path: TPath
    method: TMethod
    input: TInput
    output: TOutput
  }
}
