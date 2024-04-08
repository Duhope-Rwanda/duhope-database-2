/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import { KTIcon } from '../../../../_duhope/helpers'
import {
  ChartsWidget1,
  ListsWidget5,
  TablesWidget1,
} from '../../../../_duhope/partials/widgets'
import { useAuth } from '../../auth'

export function Overview() {
  const storedImageUrl = localStorage.getItem('imageURL');
  const { currentUser } = useAuth()
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to='/crafted/account/settings' className='btn btn-primary align-self-center'>
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.firstName} {currentUser?.lastName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{currentUser?.email}</span>
            </div>
          </div>

          <div className='row mb-7 d-flex align-items-center'>
            <label className='col-lg-4 fw-bold text-muted'>Profile</label>
            <div className="col-lg-8 d-flex align-items-center">
              {storedImageUrl ? (
                <img src={storedImageUrl} alt='Metronic' style={{ maxWidth: '100px', maxHeight: '100px' }} />
              ) : (
                <div>No image found.</div>
              )}
            </div>
          </div>



          {/* <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Yes</span>
            </div>
          </div> */}

          <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
            <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
                <div className='fs-6 text-gray-600'>
                  Your payment was declined. To start using tools, please
                  <Link className='fw-bolder' to='/crafted/account/settings'>
                    {' '}
                    Add Payment Method
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>


      </div>
    </>
  )
}
