
"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
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
import Cart from './Cart'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Header() {

  const {user,isSignedIn} = useUser();
  const {updateCart,setUpdateCart} = useContext(CartUpdateContext);
  const [cart,setCart] = useState([]);

  useEffect(()=>{
    if (!user) return;
    console.log("Execute me");
    GetUserCart();
  },[updateCart,user])

  // 每次 user 或 updateCart 变化时，都重新获取最新购物车
  // useEffect(() => {
  //   if (!user) {
  //     // 如果还没拿到 user 或未登录，清空/或者直接return
  //     setCart([]);
  //     return;
  //   }
  //   // user 存在时再去后端拿最新的购物车
  //   GetUserCart();
  // }, [user, updateCart]);

  const GetUserCart=()=>{
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(resp=>{
      console.log(resp);
      console.log(resp.userCarts);
      
      setCart(resp?.userCarts);
      // console.log(cart)

    })
  }

  

  return (
    <div className="flex justify-between items-center p-6 md:px-20 shadow-sm">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </Link>
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
            <PopoverContent className="w-full">
              <Cart cart={cart} />
            </PopoverContent>
          </Popover>

          {/* <UserButton afterSignOutUrl="/" /> */}
          
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
              src={user?.imageUrl}
              alt="user"
              width={35}
              height={35}
              className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={'/user'}> <DropdownMenuItem>Profile</DropdownMenuItem> </Link>
              <Link href={'/user#/my-orders'}> <DropdownMenuItem>My Orders</DropdownMenuItem> </Link>
              <DropdownMenuItem><SignOutButton>Logout</SignOutButton></DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
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
