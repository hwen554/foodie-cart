'use client'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ArrowBigRight, Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

function Checkout() {

  const params = useSearchParams();
  const [userName,setUserName] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState();
  const [zip,setZip] = useState();
  const [address,setAddress] = useState();
  const {user} = useUser();
  const [cart,setCart] = useState([]);
  const {updateCart,setUpdateCart} = useContext(CartUpdateContext);
  const [deliveryAmount,setDeliveryAmount] = useState(5);
  const [taxAmount,setTaxAmount] = useState(0);
  const [subTotal,setSubTotal] = useState(0);
  const [total,setTotal] = useState(0);
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  useEffect(()=>{
    console.log(params.get('restaurant'));
    user&&GetUserCart();
  },[user||updateCart]);

//   useEffect(() => {
//     if (user) {
//       GetUserCart();
//     }
//   }, [user, updateCart]); // 监听 updateCart

  const GetUserCart=()=>{
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(resp=>{
      console.log(resp);
      console.log(resp.userCarts);
      setCart(resp?.userCarts);
      CalculateTotalAmount(resp?.userCarts);
    })
  }

  const CalculateTotalAmount = (cart_)=>{
    let total = 0;
    cart_?.forEach(item=>{
      total=total+item.price;
    });
    setSubTotal(total.toFixed(2));
    setTaxAmount(total*0.09);
    setTotal(total+total*0.09+deliveryAmount)
  }

  const addToOrder = () =>{
    setLoading(true);
    const data={
        email:user.primaryEmailAddress.emailAddress,
        orderAmount: total,
        restaurantName: params.get('restaurant'),
        userName: user.fullName,
        address: address,
        phone: phone,
        zipCode:zip
    }
    GlobalApi.CreateNewOrder(data).then(resp=>{
        const resultId = resp?.createOrder?.id;
        if(resultId) {
            cart.forEach((item)=>{
                GlobalApi.UpdateOrderToAddOrderItems(item.productName,item.price,resultId,user?.primaryEmailAddress.emailAddress)
                .then(result=>{
                    console.log(result);
                    setLoading(false);
                    toast('Order placed successfully');
                    setUpdateCart(!updateCart);
                    SendEmail();
                    router.replace('/confirmation');
                    // setCart([]);  // 清空购物车
                    // setUpdateCart(prev => !prev); // 触发购物车更新
                },(err)=>{
                    setLoading(false);
                    toast.error('Failed to place order'+error)
                })
            })
        }    
    },(error)=>{
        setLoading(false);
    })
  }

  
  const SendEmail = async() =>{
    try{
        const response = await fetch('/api/send-email',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:user?.primaryEmailAddress.emailAddress})
        })
        if (!response.ok){
            toast('Error sending email');
        }else{
            toast('Confirmation Email Sent successfully')
        }
    }catch(err){
        console.error(err);
        toast.error('Failed to send email');
    }
  }

  return (
    // <div>
    //     <h2 className='font-bold text-2xl my-5'>Checkout</h2>
    //     <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
    //         <div className='md:col-span-2 mx-20'>
    //             <h2 className='font-bold text-3xl'>Billing Details</h2>
    //             <div className='grid grid-cols-2 gap-10 mt-3'>
    //                 <Input placeholder='Name' onChange={(e)=>setUserName(e.target.value)}/>
    //                 <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
    //             </div>
    //             <div className='grid grid-cols-2 gap-10 mt-3'>
    //                 <Input placeholder='Phone' onChange={(e)=>setPhone(e.target.value)}/>
    //                 <Input placeholder='Zip' onChange={(e)=>setZip(e.target.value)}/>
    //             </div>
    //             <div className='mt-3'>
    //                 <Input placeholder='Address' onChange={(e)=>setAddress(e.target.value)}/>
    //             </div>
    //         </div>
    //     </div>

    //     <div className='mx-10 border w-full md:w-1/3 bg-white p-6 shadow rounded-lg'>
    //         <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({cart?.length})</h2>
    //         <div className='p-4 flex flex-col gap-4'>
    //             <h2 className='font-bold flex justify-between'>Subtotal : <span>${subTotal}</span></h2>
    //             <hr></hr>
    //             <h2 className='flex justify-between'>Delivery : <span>${deliveryAmount}</span></h2>
    //             <h2 className='flex justify-between'>Tax (9%) : <span>${taxAmount.toFixed(2)}</span></h2>
    //             <hr></hr>
    //             <h2 className='font-bold flex justify-between'>Total : <span>${total.toFixed(2)}</span></h2>
    //             {/* <Button onClick={()=>onApprove({})}>Make Payment<ArrowBigRight/></Button> */}
    //             <Button onClick={()=>addToOrder()}>
    //                 {loading?<Loader className='animate-spin'/>:'Make Payment'}
    //             </Button>

    //             <PayPalButtons style={{ layout: "horizontal" }} />
    //         </div>
    //     </div>
    // </div>
    <div className='max-w-6xl mx-auto p-6'>
      <h2 className='font-bold text-2xl my-5'>Checkout</h2>

      {/* 使用 flex 使内容左右排列 */}
      <div className='flex flex-col md:flex-row gap-12'>

        {/* 左侧：Billing Details */}
        <div className='w-full md:w-2/3 bg-white p-6 shadow rounded-lg'>
          <h2 className='font-bold text-3xl mb-5'>Billing Details</h2>
          <div className='grid grid-cols-2 gap-6'>
            <Input placeholder='Name' onChange={(e) => setUserName(e.target.value)} />
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='grid grid-cols-2 gap-6 mt-3'>
            <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className='mt-3'>
            <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>

        {/* 右侧：Cart Summary */}
        <div className='w-full md:w-1/3 bg-white p-6 shadow rounded-lg'>
          <h2 className='font-bold text-xl mb-4'>Total Cart ({cart?.length})</h2>
          <div className='space-y-4'>
            <h2 className='font-bold flex justify-between'>Subtotal : <span>${subTotal}</span></h2>
            <hr />
            <h2 className='flex justify-between'>Delivery : <span>${deliveryAmount}</span></h2>
            <h2 className='flex justify-between'>Tax (9%) : <span>${taxAmount.toFixed(2)}</span></h2>
            <hr />
            <h2 className='font-bold flex justify-between text-lg'>Total : <span>${total.toFixed(2)}</span></h2>
          </div>

          {/* 按钮：放在右侧面板 */}
          <div className='mt-6 flex flex-col gap-4 '>
            {/* <Button onClick={() => SendEmail()} className='bg-red-500 text-white hover:bg-red-700 w-full'>
              {loading ? <Loader className='animate-spin' /> : 'Make Payment'}
            </Button> */}

            {total>5&&<PayPalButtons 
                disabled={!(userName&&email&&address&&zip)||loading}
                style={{ layout: "horizontal" }}
                onApprove={addToOrder}
                createOrder={(data,action)=>{
                    return action.order.create({
                        purchase_units:[{
                            amount:{
                                value:total.toFixed(2),
                                currency_code: "USD",
                            }
                        }]
                    })
                }}
            />}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout
