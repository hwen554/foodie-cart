import React from 'react';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Header from './_components/Header';

function Provider({ children }) {
  return (
    <div className='px-10 md:px-20 relative'>
      {/* <SignedIn> */}
        <Header />
      {/* </SignedIn> */}
      {children}
    </div>
  );
}

export default Provider;
