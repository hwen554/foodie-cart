import { Button } from '@/components/ui/button'
import React from 'react'

function MenuSection({restaurant}) {
  return (
    <div>
      <div className='grid grid-cols-4 mt-2'>
            <div className='hidden md:flex'>
                {restaurant?.menu?.map((item,index)=>(
                  <Button>{item.category}</Button>
                ))}
            </div>
            <div className='col-span-3'>
                Menu List
            </div>
      </div>
    </div>
  )
}

export default MenuSection
