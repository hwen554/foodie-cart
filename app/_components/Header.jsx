
"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Header() {

  const {user,isSignedIn} = useUser();
  return (
    <div className='flex justify-between items-center p-6 md:px-20 shadow-sm'>
      <Image src="/logo.svg" alt="logo" width={100} height={100}/>

      <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 '>
        <input type='text' className='bg-transparent w-full outline-none' />
        <Search />
      </div>

      {isSignedIn?
        <UserButton afterSignOutUrl="/"/>
        :
        <div className='flex gap-5'>
          <SignInButton mode='modal'>
              <Button variant="outline">Login</Button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      }
    </div>
  )
}

export default Header
