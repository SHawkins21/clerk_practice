'use client'
import { 
    UserButton,
    SignedIn,
    
 } from "@clerk/nextjs";


const NavBar = () => {
  return (
    <div className=" bg-sky-400 py-6 px-2 flex justify-between items-center">
        
        <div>
            Logo
        </div>
        <div>
        </div>
        <SignedIn>
            <UserButton
              appearance={{
                elements:{
                    avatarBox:"w-10 h-10"
                }
              }}
            
            />
        </SignedIn>
        
        </div>
  )
}
export default NavBar
