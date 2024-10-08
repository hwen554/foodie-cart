
"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import GlobalApi from '../_utils/GlobalApi'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Header() {

  const {user,isSignedIn} = useUser();
  const {updateCart,setUpdateCart} = useContext(CartUpdateContext);
  const [cart,setCart] = useState([]);

  useEffect(()=>{
    console.log("Excute me");
    user&&GetUserCart()
    console.log(cart)
  },[updateCart&&user])

  const GetUserCart=()=>{
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(resp=>{
      console.log(resp);
      console.log(resp.userCarts);
      
      setCart(resp?.userCarts);
      console.log(cart)

    })
  }

  

  return (
    <div className="flex justify-between items-center p-6 md:px-20 shadow-sm">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />

      <div className="hidden md:flex border p-2 rounded-lg bg-gray-200 ">
        <input type="text" className="bg-transparent w-full outline-none" />
        <Search />
      </div>

      {isSignedIn ? (
        <div className="flex gap-3 items-center">
           <Popover>
           <PopoverTrigger asChild>
          <div className="flex gap-2 items-center cursor-pointer">
            <ShoppingCart />
            <label className="p-1 px-3 rounded-full bg-slate-200">
              {cart?.length}
            </label>
          </div>
         </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>

          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div className="flex gap-5">
          <SignInButton mode="modal">
            <Button variant="outline">Login</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}

export default Header
