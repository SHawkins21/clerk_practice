"use server"
import prisma from "../lib/prisma"

type User = {
    id: string
    email:string
    name:string
    emailId: string
    images: string | undefined
}

export const createOrUpdateuser = async (user: User) => {
    const {
        id,
        email,
        name,
        emailId,
        images
    } = user 

    try {
        await prisma.user.upsert({
            where: {
                id
            }, 
            update: {
                email,
                name,
                emailId,
                images: images || ''
            },
            create: {
                id,
                email,
                name,
                emailId,
                images: images || ''
            }
        })

    } catch (error) {
        console.log('Error in createOrUpdateuser', error)
    }}