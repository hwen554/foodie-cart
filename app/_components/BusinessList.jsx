
'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import BusinessItem from './BusinessItem';
function BusinesslIST() {
  const params = useSearchParams();
  const [category,setCategory] = useState('all');
  const [businessList,setBusinessList] = useState([]);
  useEffect (()=>{
     params&&setCategory(params.get('category'))
     params&&getBusinessList(params.get('category'))
  },[params])

  const getBusinessList = (category_)=>{
    GlobalApi.GetBusiness(category_).then(resp=>{
        setBusinessList(resp?.restaurants);
    })
  }
  return (
    <div>
      <h2 className='font-bold text-2xl'>Popular {category} Restaurants</h2>
      <h2 className='font-bold text-primary'>{businessList?.length} Results</h2>

      <div className='grid grid-cols-1'>
        {businessList.map((restaurants,index)=>(
          <BusinessItem key={index} business = {restaurants}/>
        ))}
      </div>
    </div>
  )
}

export default BusinesslIST
