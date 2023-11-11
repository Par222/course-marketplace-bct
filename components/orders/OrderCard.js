"use client"

import { useRouter } from "next/navigation"

const OrderCard=(props)=>{
    const router=useRouter()
    const clickHandler=()=>{
        if(!props.isReturn)
        {
                  router.push(`/marketplace/${props.course.slug}`)
        }
        else
        {
            props.courseSetter(props.course)
        }
    }
    return(
       
        <>
        <div className="rounded-md shadow-md text-sm flex">
            <div  className="w-[30%]">
            <img src={props.course.coverImage}></img>
            </div>
            <div className="w-[70%]">
            <h1 className="mt-3 font-bold  px-4 flex items-center"><p>{props.course.title}</p> <span> {props.isReturn && <div className="my-2 rounded-full bg-blue-200 text-[#561eff] py-1 px-5 mx-3 text-xs">30 days left</div>}</span></h1>
            <span className="text-xs mb-2  px-4">{props.price} ETH</span>
             <div className="flex justify-between my-2 bg-gray-100 py-3 px-4"><span>Order Id</span> <p>{props.course.orderid+""}</p></div>
             <div className="flex justify-between my-2 py-3 px-4"><span>Proof</span> <p>{props.course.proofId}</p></div>
              {props.isReturn && <div className="my-2 rounded-md bg-green-200 text-green-900 py-3 px-5 mx-3 text-sm">Purchased</div>}
             <button className="bg-[#561eff] text-white py-2 px-5 font-semibold mx-3 my-4 rounded-md" onClick={clickHandler}>{!props.isReturn?'Watch the Course':'Return the Course'}</button>

            </div>
        </div>
        </>
    )
}
export default OrderCard