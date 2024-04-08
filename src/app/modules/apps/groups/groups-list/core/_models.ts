import { ID, Response } from '../../../../../../_duhope/helpers'
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
