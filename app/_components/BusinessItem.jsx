import Image from 'next/image'
import React from 'react'

function BusinessItem({business}) {
  return (
    <div>
      <Image src={business.banner?.url} alt={business.name} width={500} height={130} className='h-[130px] rounded-xl object-cover'/>
      <div className='mt-2'>
        <h2 className='font-bold text-lg'>{business.name}</h2>
        <div>
          <div>
            <Image src=''
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessItem
