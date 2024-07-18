import Image from 'next/image'
import React from 'react'

function BusinessItem({business}) {
  return (
    <div>
      <Image src={business.banner?.url} alt={business.name} width={500} height={130}/>
    </div>
  )
}

export default BusinessItem
