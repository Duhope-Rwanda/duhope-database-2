// @ts-nocheck
import { Column } from 'react-table'
import { ProductActionsCell } from './ProductActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { User } from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'label',
    accessor: 'label',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Price' className='min-w-125px' />,
    accessor: 'price',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Image" className="min-w-125px" />
    ),
    accessor: 'image'
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Stock' className='min-w-125px' />
    ),
    id: 'stock',
    accessor: 'stock',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <ProductActionsCell id={props.data[props.row.index].value} />,
  },
]

export { usersColumns }
