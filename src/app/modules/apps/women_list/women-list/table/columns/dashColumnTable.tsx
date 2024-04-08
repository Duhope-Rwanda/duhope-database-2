// @ts-nocheck
import { Column } from 'react-table'
import { UserCustomHeader } from './UserCustomHeader'
import { UserSelectionHeader } from './UserSelectionHeader'
import { User } from '../../core/_models'

const productsColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    // accessor: 'id',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    accessor: 'name',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Price' className='min-w-125px' />,
    accessor: 'price',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Quantity' className='min-w-125px' />
    ),
    id: 'quantity',
    accessor: 'quantity'
  },
]

export { productsColumns }
