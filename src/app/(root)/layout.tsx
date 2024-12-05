'use client'
import NavBar from "../comp/NavBar"

type Child = {
    children: React.ReactNode
}
const layout = ({children}:Child) => {
  return (
    <>
    <NavBar/>
    {children}
    
    </>
  )
}
export default layout