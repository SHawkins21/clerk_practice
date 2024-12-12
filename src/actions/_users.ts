"use server"
import prisma from "../lib/prisma"

type User = {
  
    email:string
    name:string
    emailId: string
    images: string | undefined
}

export const createOrUpdateuser = async (user: User) => {
    const {
 
        email,
        name,
        emailId,
        images
    } = user 

    try {
        await prisma.user.upsert({
            where: {
                emailId
            }, 
            update: {
                email,
                name,
                emailId,
                images: images || ''
            },
            create: {
                email,
                name,
                emailId,
                images: images || ''
            }
        })

    } catch (error) {
        console.log('Error in createOrUpdateuser', error)
    }}