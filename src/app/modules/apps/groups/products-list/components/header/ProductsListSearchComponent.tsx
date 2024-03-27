/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { KTIcon } from '../../../../../../../_duhope/helpers'

const ProductsListSearchComponent = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value); // Passing the search query to the parent component
  };

  // Effect for API call

  return (
    <div className='card-title'>
      <div className='d-flex align-items-center position-relative my-1'>
        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Search .....'
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

    </div>
  )
}


export { ProductsListSearchComponent }



