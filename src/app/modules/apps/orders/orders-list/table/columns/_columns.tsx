// @ts-nocheck
import { Column } from 'react-table'
import { OrderActionsCell } from './OrderActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { User } from '../../core/_models'

const orderColumns: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <OrderActionsCell tableProps={props} />,
  //   id: 'selection',
  // },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    accessor: 'name'
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Quantity' className='min-w-125px' />,
    id: 'quantity',
    accessor: 'quantity'
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='payment Method' className='min-w-125px' />
    ),
    id: 'paymentMethod',
    accessor: 'paymentMethod',

  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    accessor: 'status',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <OrderActionsCell id={props.data[props.row.index].id} />,
  },
]

export { orderColumns }
