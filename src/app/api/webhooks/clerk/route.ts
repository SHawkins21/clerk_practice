import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createOrUpdateuser } from '@/actions/_users'
type User = {
    email:string
    name:string
    emailId: string
    images: string | undefined
}



export async function POST(req: NextRequest) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new NextResponse('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type

if(
    eventType === 'user.created' || eventType === 'user.updated'
){
    console.log('User created or updated')
    console.log(evt.data.email_addresses[0].email_address + ' ' + evt.data.last_name + ' ' + evt.data.first_name)

    const user: User = { 
      
        email: evt.data.email_addresses[0].email_address,
        name: evt.data.first_name + ' ' + evt.data.last_name,
        emailId: evt.data.email_addresses[0].id,
        images: evt.data.image_url || undefined
    }
    try { 
        await createOrUpdateuser(user)
    } catch (error) {
        console.log('Error in createOrUpdateuser', error)
    }
}



  
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  return new Response('Webhook received', { status: 200 })
}