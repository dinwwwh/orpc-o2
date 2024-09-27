import { HTTPMethod, HTTPPath, ValidationSchema } from '../types'

export type ContractRoute<
  TInputSchema extends ValidationSchema = ValidationSchema,
  TOutputSchema extends ValidationSchema = ValidationSchema,
  TMethod extends HTTPMethod = HTTPMethod,
  TPath extends HTTPPath = HTTPPath
> = {
  __cr: {
    path?: TPath
    method?: TMethod
    input?: TInputSchema
    output?: TOutputSchema
  }
}
