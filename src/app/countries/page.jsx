import CountriesTable from '@/components/CountriesTable'
import React from 'react'

export default function Countries() {
  return (
    <div className="text-center">
    <h1 className="text-2xl font-bold my-5">
      Counties
    </h1>
    <div className="p-10">
      <CountriesTable />
    </div>
  </div>
  )
}
