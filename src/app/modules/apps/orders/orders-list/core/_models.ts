import { ID, Response } from '../../../../../../_duhope/helpers'
export type Order = {
  id?: ID
  paymentMethod?: string
  name?: string
  avatar?: string
  email?: string

}

export type UsersQueryResponse = Response<Array<Order>>

export const initialUser: Order = {
  avatar: 'avatars/300-6.jpg',
  name: '',
  email: '',
}
