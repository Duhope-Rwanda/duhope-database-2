/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useSelector } from 'react-redux'

type Props = {
  className: string
  description: string
  icon: boolean
  stats: number
  labelColor: string
  textColor: string
}

const CardsWidget7 = ({ className, description, icon, stats, labelColor, textColor }: Props) => {

  const { users } = useSelector(
    (state: any) => state.users
  );

  return (
    <div className={`card card-flush ${className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <div className='card-title d-flex flex-column'>
            <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{users && users.length}</span>
            <span className='text-gray-400 pt-1 fw-semibold fs-6'>{description}</span>
          </div>
        </div>
      </div>
      <div className='card-body d-flex flex-column justify-content-end pe-0'>
        <span className='fs-6 fw-bolder text-gray-800 d-block mb-2'>Today’s Heroes</span>
        <div className='symbol-group symbol-hover flex-nowrap'>
          {users.slice(0, 6).map((item, index) => (
            <div
              className='symbol symbol-35px symbol-circle'
              data-bs-toggle='tooltip'
              title={item.names ? item.names : item.email}
              key={`cw7-item-${index}`}
            >
              {item.profile_url && <img alt='Pic' src={item.profile_url} />}
              {(!item.profile_url || item.profile_url === '') ? (
                <span
                  className={clsx(
                    'symbol-label fw-bold',
                    index % 2 === 0 ? 'bg-primary' : 'bg-danger',
                    'text-inverse-primary'
                  )}
                >
                  {item.email[0].toUpperCase()}
                </span>
              ) : null}
            </div>
          ))}

          <a href='#' className='symbol symbol-35px symbol-circle'>
            <span
              className={clsx('symbol-label fs-8 fw-bold', 'bg-' + labelColor, 'text-' + textColor)}
            >
              +{users.length - 6}
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
export { CardsWidget7 }