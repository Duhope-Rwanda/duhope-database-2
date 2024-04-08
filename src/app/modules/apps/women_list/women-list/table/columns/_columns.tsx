// @ts-nocheck
import { Column } from 'react-table';
import { WomenActionsCell } from './WomenActionsCell';
import { WomenCustomHeader } from './WomenCustomHeader';
import { User } from '../../core/_models';

const womenColumns: ReadonlyArray<Column<User>> = [
  // {
  // 	Header: (props) => <UserSelectionHeader tableProps={props} />,
  // 	id: 'selection'
  // 	// accessor: 'id',
  // },
  {
    Header: (props) => <WomenCustomHeader tableProps={props} title="Name" className="min-w-125px" />,
    id: 'name',
    accessor: 'name'
  },
  {
    Header: (props) => (
      <WomenCustomHeader tableProps={props} title="Image" className="min-w-125px" />
    ),
    accessor: 'main_image_url'
  },
  {
    Header: (props) => (
      <WomenCustomHeader tableProps={props} title="Description" className="max-w-125px" />
    ),
    id: 'description',
    accessor: 'description'
  },

  {
    Header: (props) => (
      <WomenCustomHeader tableProps={props} title="Stock" className="min-w-125px" />
    ),
    accessor: 'stock'
  },

  {
    Header: (props) => (
      <WomenCustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <WomenActionsCell id={props.data[props.row.index].id} />
  }
];

export { womenColumns };
