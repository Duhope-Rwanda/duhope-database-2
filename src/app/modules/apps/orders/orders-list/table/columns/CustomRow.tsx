// @ts-nocheck
import clsx from 'clsx'
import { FC } from 'react'
import { Row } from 'react-table'
import { User } from '../../core/_models'

type Props = {
  row: Row<User>
}

const CustomRow: FC<Props> = ({ row }) => {
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <td
            {...cell.getCellProps()}
            className={clsx({ 'text-end min-w-100px': cell.column.id === 'actions' })}
          >
            {cell.column.id === 'status' ? (
              <div>
                {
                  cell.value === "pending" && <span className='badge badge-light fs-7 fw-bold'>{cell.value}</span>
                }
                {
                  cell.value === "cancelled" && <span className='badge badge-light-danger fs-7 fw-bold'>{cell.value}</span>
                }
                {
                  cell.value === "on delivery" && <span className='badge badge-light-warning fs-7 fw-bold'>{cell.value}</span>
                }
                {
                  cell.value === "completed" && <span className='badge badge-light-success fs-7 fw-bold'>{cell.value}</span>
                }
              </div>
            ) : (
              cell.render('Cell')
            )}
          </td>
        )
      })}
    </tr>
  )
}

export { CustomRow }