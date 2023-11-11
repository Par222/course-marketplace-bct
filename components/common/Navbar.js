"use client"
import Link from "next/link";
import { web3Context } from "@/provider/Web3Provider";;
import { useContext } from "react";
import { intializeWeb3 } from "@/provider/Providerfunctions";
const NavBar = () => {
  const ctx=useContext(web3Context)
  return (
    <>
      <div className="flex py-3  text-sm text-gray-500 items-center">
        <nav className="flex space-x-6 w-[70%] mx-[8%]">
          <Link href={"/home"}>Home</Link>
          <Link href={"/marketplace"}>Marketplace</Link>
          <Link href={"/blogs"}>Blogs</Link>
        </nav>
        <div className="w-[30%] flex space-x-5 items-center">
          <Link href={"/wishlist"}>Wishlist</Link>
          <button className="bg-[#5600FF] text-white py-2 px-4  rounded-md" onClick={()=>intializeWeb3}>{ctx.web3Api.provider?ctx.isAdmin?"Hi there,Admin":"Hi there":"Connect to Wallet"}</button>
        </div>
      </div>
    </>
  );
};
export default NavBar
