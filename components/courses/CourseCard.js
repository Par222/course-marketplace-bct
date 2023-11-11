"use client"
import { web3Context } from "@/provider/Web3Provider"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const CourseCard=(props)=>{
    const router=useRouter()
    const ctx=useContext(web3Context)

    return(
         <>
        <div className="mx-4  max-h-[300px] my-3  shadow-md rounded-md cursor-pointer" key={props.id} >
            <div className="flex">
                <img src={props.coverImage} width={300} height={300}>
                </img>
                <div className="flex flex-col text-xs py-2 px-5">
                {props.state+""=="2" && <span className="bg-red-200 py-1 px-3 text-center text-red-800 rounded-full w-[40%] my-2 text-xs">Deactivated</span>}
                    {props.state=="0" && props.isOwned && <span className="bg-yellow-200 py-1 px-3 text-center text-yellow-800 rounded-full w-[40%] my-2 text-xs">Purchased</span>}
                    <h1 className="text-sm font-medium text-[#561eff]">{props.type}</h1>
                    <p className="my-1 font-semibold text-sm" onClick={()=>router.push(`/marketplace/${props.slug}`)}>{props.title}</p>
                    <span className="text-gray-500 my-1">{props.description}</span>
                    {ctx.isAdmin && <div>
                          <button className="my-2 rounded-sm text-green-700 bg-green-200 py-2 px-4 w-[40%] mx-2" onClick={()=>props.activateHandler(props)}>{'Activate'}</button>
                          <button className="my-2 rounded-sm text-red-700 bg-red-200 py-2 px-4 w-[40%] mx-2" onClick={()=>props.clickHandler(props,false)} >{'Deactivate'}</button>
                    </div>}
                    {!ctx.isAdmin && <button className="my-2 rounded-sm text-[#561eff] bg-[#d2e9ff] py-2 px-4 w-[40%]" disabled={props.isOwned} onClick={()=>props.clickHandler(props,true)}>{props.isOwned?'View':'Purchase'}</button>}
                </div>
            </div>


        </div>
        </>
    )
}
export default CourseCard