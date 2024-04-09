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
    Header: (props) => <WomenCustomHeader tableProps={props} title="First Name" className="min-w-125px" />,
    id: 'firstName',
    accessor: 'firstName'
  },
  {
    Header: (props) => <WomenCustomHeader tableProps={props} title="Last Name" className="min-w-125px" />,
    id: 'lastName',
    accessor: 'lastName'
  },
  {
    Header: (props) => (
      <WomenCustomHeader tableProps={props} title="Image" className="min-w-125px" />
    ),
    accessor: 'main_image_url'
  },
  {
    Header: (props) => (
      <WomenCustomHeader tableProps={props} title="Age" className="max-w-125px" />
    ),
    id: 'age',
    accessor: 'age'
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
