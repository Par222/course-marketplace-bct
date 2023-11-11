"use client"
import { web3Context } from "@/provider/Web3Provider"
import { useContext } from "react"
const WalletInfo=()=>{
    const ctx=useContext(web3Context)
    const dict={
        '0x1':'Ethereum Main net',
        '0x539':"Ganache"
    }
    return(
        <>
        <div className="">
            <div className="bg-[#561eff] py-5 px-7  my-1 rounded-md text-white">
                <h1 >Hello, {ctx.account}</h1>
                <p className="text-sm">I hope you are having a great day</p>
                <div className="flex justify-between mt-5 mb-3 items-center">
                    <button className="bg-white text-black text-sm font-semibold rounded-md py-3 px-7">Learn how to purchase</button>
                <div>
                {<p className="text-xs">Currently on <span className="text-base font-bold">{dict[ctx.chainId]}</span></p>}
                    {dict[ctx.chainId]!='Ganache' &&<h1 className="bg-red-400 my-2 text-sm text-white font-semibold rounded-md py-3 px-4 text-center">{`Please connect to Ganache`}</h1>}
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default WalletInfo