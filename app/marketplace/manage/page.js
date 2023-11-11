"use client"
import NavBar from "@/components/common/Navbar"
import WalletInfo from "@/components/wallet/WalletInfo"
import EtherPrice from "@/components/wallet/EtherPrice"
import Link from "next/link"
import OrderList from "@/components/orders/OrderList"
import { useRouter} from "next/router"
import { usePathname } from "next/navigation"
const Home=()=>{
    const router=usePathname()
    
     
    return(
        <>
         <div className="mx-[8%]">
          <NavBar></NavBar>
          <WalletInfo></WalletInfo>
          <EtherPrice></EtherPrice>
          <div className="flex justify-end my-2 text-xs text-gray-600">
           <Link href={'/marketplace'} className="">Buy </Link>
           <Link href={'/marketplace/courses'} className=""><span className="mx-4">|</span> My Courses</Link>
           <Link href={'/marketplace/manage'}><span className="mx-4">|</span> Manage Courses</Link>

          </div>
          <div>
            <input className="my-2 mx-1 rounded-sm shadow-sm py-2 text-xs px-2" placeholder="x@y.com"></input>
            <button className="bg-[#561eff] text-white rounded-sm text-xs py-2 px-7">Search</button>
            <OrderList isReturn={router && router.includes('manage')}></OrderList>

           
          </div>
        </div>
        </>
    )
}
export default Home