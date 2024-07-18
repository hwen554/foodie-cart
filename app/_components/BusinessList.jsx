
'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
function BusinesslIST() {
  const params = useSearchParams();
  const [category,setCategory] = useState('all');
  useEffect (()=>{
     params&&setCategory(params.get('category'))
     params&&getBusinessList(params.get('category'))
  },[params])

  const getBusinessList = (category_)=>{
    GlobalApi.GetBusiness(category_).then(resp=>{
        console.log(resp);
    })
  }
  return (
    <div>
      businessList
    </div>
  )
}

export default BusinesslIST
