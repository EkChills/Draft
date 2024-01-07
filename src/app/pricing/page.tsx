import { PriceCards } from '@/components/component/PriceCards'
import { env } from '@/env'
import React from 'react'

export default async function PricingPage() {
  const subscription = await fetch('https://api.paystack.co/subscription', {
    method:"GET",
    headers:{
      authorization:`Bearer ${env.PAYSTACK_SECRET_KEY}`
    }
  })

  const awaitedSub = await subscription.json() as {status:boolean; data:[{
    status:string
  }]}
  
  console.log('subs',awaitedSub.data[0].status);
  
  return (
    <div>
        <PriceCards />
    </div>
  )
}
