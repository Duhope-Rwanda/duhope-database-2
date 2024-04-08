// @ts-nocheck
import { Column } from 'react-table';
import { GroupActionsCell } from './GroupsActionsCell';
import { UserCustomHeader } from './UserCustomHeader';
import { User } from '../../core/_models';

const usersColumns: ReadonlyArray<Column<User>> = [
  // {
  // 	Header: (props) => <UserSelectionHeader tableProps={props} />,
  // 	id: 'selection',
  // 	Cell: ({ ...props }) => <UserSelectionCell id={props.data[props.row.index].id} />
  // },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="Name" className="min-w-125px" />,
    accessor: 'name'
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Image" className="min-w-125px" />
    ),
    accessor: 'image'
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <GroupActionsCell id={props.data[props.row.index].id} />
  }
];

export { usersColumns };
