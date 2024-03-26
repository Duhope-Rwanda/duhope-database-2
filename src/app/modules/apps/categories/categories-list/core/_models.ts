import { ID, Response } from '../../../../../../_powr/helpers'
export type User = {
  id?: ID
  name?:string
  color?: string
  img?: string
  
  
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {

  name: '',

}
