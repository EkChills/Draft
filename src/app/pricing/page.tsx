import { PriceCards } from '@/components/component/PriceCards'
import { env } from '@/env'
import axios from 'axios'
import React from 'react'

export default async function PricingPage() {
  const subscription = await fetch('https://api.paystack.co/subscription', {
    method:"GET",
    headers:{
      Authorization:`Bearer ${env.PAYSTACK_SECRET_KEY}`
    }
  })

  const awaitedSub = await subscription.json() as {status:boolean; data:[{
    status:string
  }]}

  const plan:Awaited<{data:{data:{
    amount:number
  }}}> = await axios('https://api.paystack.co/plan/PLN_t0gluvovnmtmuam', {
    headers:{
      Authorization:`Bearer ${env.PAYSTACK_SECRET_KEY}`
    }
  }) 

  
  
  console.log('subs',awaitedSub.data[0].status);
  
  return (
    <div>
        <PriceCards amount={plan.data.data.amount} />
    </div>
  )
}
