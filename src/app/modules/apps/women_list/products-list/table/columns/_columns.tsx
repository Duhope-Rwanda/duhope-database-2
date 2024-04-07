// @ts-nocheck
import { Column } from 'react-table';
import { ProductActionsCell } from './ProductActionsCell';
import { UserCustomHeader } from './UserCustomHeader';
import { User } from '../../core/_models';

const usersColumns: ReadonlyArray<Column<User>> = [
  // {
  // 	Header: (props) => <UserSelectionHeader tableProps={props} />,
  // 	id: 'selection'
  // 	// accessor: 'id',
  // },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="Name" className="min-w-125px" />,
    id: 'name',
    accessor: 'name'
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Image" className="min-w-125px" />
    ),
    accessor: 'main_image_url'
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Description" className="max-w-125px" />
    ),
    id: 'description',
    accessor: 'description'
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Stock" className="min-w-125px" />
    ),
    accessor: 'stock'
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <ProductActionsCell id={props.data[props.row.index].id} />
  }
];

export { usersColumns };
