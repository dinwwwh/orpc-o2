import { HTTPMethod, HTTPPath, Schema } from '../types'

export type ContractRoute<
  TInputSchema extends Schema = Schema,
  TOutputSchema extends Schema = Schema,
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
