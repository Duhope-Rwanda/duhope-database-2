// @ts-nocheck
import clsx from 'clsx'
import { FC } from 'react'
import { Row } from 'react-table'
import { User } from '../../core/_models'

type Props = {
  row: Row<User>
}

const CustomRow: FC<Props> = ({ row }) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({ 'text-end min-w-100px': cell.column.id === 'actions' })}
        >
          {cell.column.id === 'main_image_url' ? (
            <img src={cell.value} alt="" className="w-50px h-50px rounded" />
          ) : (
            cell.render('Cell')
          )}
        </td>
      )
    })}
  </tr>
)

export { CustomRow }
