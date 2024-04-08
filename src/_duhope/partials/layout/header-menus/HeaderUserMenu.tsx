import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../app/modules/auth'
import * as authHelper from '../../../../app/modules/auth/core/AuthHelpers'
import { toAbsoluteUrl } from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const { currentUser } = useAuth()
  const logoutClick = async (e: any) => {
    e.preventDefault()
    authHelper.removeAuth()
    window.location.reload()
  }

  return (
    <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true">
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            {currentUser && currentUser.photoURL && <img src={currentUser.photoURL} alt="User Avatar" />}

            {!currentUser?.photoURL && <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt="Metronic" />}
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {currentUser?.firstName ? (
                <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">{currentUser?.firstName + ' ' + currentUser?.lastName}</span>
              ) : (
                <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">{currentUser?.displayName}</span>
              )}
            </div>
            <a href="/" className="fw-bold text-muted text-hover-primary fs-7">
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      {/* <div className='menu-item px-5'>
        <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
          My Profile
        </Link>
      </div> */}

      <div className="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start" data-kt-menu-flip="bottom"></div>

      <div className="menu-sub menu-sub-dropdown w-175px py-4"></div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5 my-1">
        <Link to="/crafted/account/settings" className="menu-link px-5">
          Account Settings
        </Link>
      </div>

      <div className="menu-item px-5">
        <p onClick={(e) => logoutClick(e)} className="menu-link px-5">
          Sign Out
        </p>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
