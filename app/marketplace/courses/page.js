import NavBar from "@/components/common/Navbar"
import WalletInfo from "@/components/wallet/WalletInfo"
import EtherPrice from "@/components/wallet/EtherPrice"
import Link from "next/link"
import OrderList from "@/components/orders/OrderList"
const Home=()=>{
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
            <OrderList></OrderList>

           
          </div>
        </div>
        </>
    )
}
export default Home