"use client"
import React, { useState } from 'react';
// import { SignedIn, SignedOut } from "@clerk/nextjs";
import Header from './_components/Header';
import { Toaster } from '@/components/ui/sonner';
import { CartUpdateContext } from './_context/CartUpdateContext';

function Provider({ children }) {
  const [updateCart,setUpdateCart] = useState();
  return (
    <CartUpdateContext.Provider value={{updateCart,setUpdateCart}}>
      <div className='px-10 md:px-20 relative'>
      {/* <SignedIn> */}
        <Header />
        <Toaster/>
      {/* </SignedIn> */}
      {children}
    </div>
    </CartUpdateContext.Provider>
  );
}

export default Provider;
