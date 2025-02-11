"use client"
import React, { useState } from 'react';
// import { SignedIn, SignedOut } from "@clerk/nextjs";
import Header from './_components/Header';
import { Toaster } from '@/components/ui/sonner';
import { CartUpdateContext } from './_context/CartUpdateContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function Provider({ children }) {
  const [updateCart,setUpdateCart] = useState(false);
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <CartUpdateContext.Provider value={{updateCart,setUpdateCart}}>
        <div className='px-10 md:px-20 relative mb-20'>
        {/* <SignedIn> */}
          <Header />
          <Toaster/>
        {/* </SignedIn> */}
          {children}
        </div>
      </CartUpdateContext.Provider>
    </PayPalScriptProvider>
  );
}

export default Provider;
