import React from 'react'
import { CiSearch } from 'react-icons/ci'

const CustomButton = () => {
  return (
    <button className="btn btn-sm text-white bg-blue-800 hover:bg-blue-900 ">
          Search
          <CiSearch />
        </button>
  )
}

export default CustomButton