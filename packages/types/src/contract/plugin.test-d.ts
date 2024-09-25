import { date, object, string } from 'valibot'
import { expectTypeOf } from 'vitest'
import { ContractPlugin, ContractRouteUsePlugin } from './plugin'
import { ContractRoute, RouteResponse } from './route'

const UserSchema = object({
  id: string(),
  name: string(),
  dob: date(),
})

type Plugin1 = ContractPlugin<{
  response: RouteResponse<{
    status: 200
    body: typeof UserSchema
  }>
}>

type Route1 = ContractRoute<{ method: 'GET'; path: '/test' }>

type Route2 = ContractRouteUsePlugin<Route1, Plugin1>

expectTypeOf<
  Route2 extends ContractRoute<infer T> ? (T extends { response: infer R } ? R : never) : never
>().toEqualTypeOf<{
  status: 200
  body: typeof UserSchema
}>()
