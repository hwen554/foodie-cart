import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import Link from 'next/link'

function Cart({cart}) {

  const {updateCart,setUpdateCart} = useContext(CartUpdateContext);

  const CalculateCartAmount = () =>{
    let total = 0;
    cart.forEach((item)=>{
        total = total + item.price; 
    })
    return total.toFixed(2);
  }

  const RemoveItemFromCart = async(id) =>{
    GlobalApi.DisconnectRestaurantFromUserCartItem(id).then(resp=>{
        console.log(resp)
        if(resp){
            GlobalApi.DeleteItemFromCart(id).then(resp=>{
                console.log(resp);
                toast('Removed from Cart successfully');
                setUpdateCart(!updateCart);
            })
        }
        
        
    })
    // try {
    //     // 1. 先断开关联
    //     const disconnectResp = await GlobalApi.DisconnectRestaurantFromUserCartItem(id);
    //     console.log("Disconnect response:", disconnectResp);
    
    //     if (disconnectResp) {
    //       // 2. 关联断开后删除
    //       const deleteResp = await GlobalApi.DeleteItemFromCart(id);
    //       console.log("Delete response:", deleteResp);
    
    //       if (deleteResp?.deleteUserCart?.id) {
    //         toast("Removed from Cart successfully");
    //         // 这里可以更新购物车状态
    //       } else {
    //         throw new Error("Failed to delete cart item.");
    //       }
    //     } else {
    //       throw new Error("Failed to disconnect restaurant from cart item.");
    //     }
    //   } catch (error) {
    //     console.error("Error while removing item from cart:", error);
    //     toast.error("Failed to remove item from cart.");
    //   }
  }
  return (
    <div>
        <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
        <div className='mt-5 flex flex-col gap-3'>
            <h2 className='font-bold'>My Order</h2>
            {cart&&cart.map((item,index)=>(
                <div key={index} className='flex justify-between gap-8 items-center'>
                    <div className='flex items-center gap-2'>
                        <Image src={item.productImage}
                            alt={item.productName}
                            width={40}
                            height={40}
                            className='h-[40px] w-[40px] rounded-lg object-cover'
                        />
                        <h2 className='text-sm'>{item?.productName}</h2>
                    </div>
                    <h2 className='font-bold flex gap-2'>{item?.price}</h2>
                    <X onClick={()=>RemoveItemFromCart(item.id)} className='h-4 w-4 text-red-500 '/>
                </div>
            ))}
            <Link href={'/checkout?restaurant='+cart[0]?.restaurant?.name}>
                <Button className="w-full">Check Out ${CalculateCartAmount()}</Button>
            </Link>
        </div>
    </div>
  )
}

export default Cart

