import { Button } from '@/components/ui/button'
import Image from 'next/image';



import React, { useState } from 'react'

function MenuSection({restaurant}) {

  const[menuItemList,setMenuItemList] = useState([]);

  const FilterMenu = (category)=>{
    const result = restaurant?.menu?.filter((item)=>item.category==category)
    setMenuItemList(result[0]);
  }
  return (
    <div>
      <div className='grid grid-cols-4 mt-2'>
            <div className='hidden md:flex flex-col mr-1 gap-2'>
                {restaurant?.menu?.map((item,index)=>(
                  <Button variant='ghost' key={index} className='flex justify-start' onClick={()=>FilterMenu(item.category)}>{item.category}</Button>
                ))}
            </div>
            <div className='col-span-3 ml-10'>
                <h2 className='font-extrabold text-lg'>{menuItemList.category}</h2>

                <div className='grid grid-cols-1 lg:grid-cols-2'>
                  {console.log(menuItemList.menuItem)}
                    {menuItemList?.menuItem?.map((item,index)=>(
                      <div key={index}>
                      <Image src={item?.productImage[0]?.url}  alt={item.price} width={120} height={120}/>
                      <h2>{item.price}</h2>
                      </div>
                    ))}
                    
                </div>
            </div>

      </div>
    </div>
  )
}

export default MenuSection
