"use client"
const { default: OrderCard } = require("./OrderCard")
import { courses } from "../courses/Course"
import { web3Context } from "@/provider/Web3Provider"
import { useContext, useEffect, useState } from "react"
const OrderList=(props)=>{
  const ctx=useContext(web3Context)

    const orders=[
      {
        course:{
                "id": "1410474",
                "type": "Next JS",
                "title": "Next JS & Typescript with Shopify Integration - Full Guide",
                "description": "Learn modern Next JS(Next 10+). Code everything in Typescript and integrate with Shopify.",
                "coverImage": "https://thrangra.sirv.com/Next_TypeScript_Shopify_Final.jpg",
                "author": "Filip Jerga",
                "link": "https://academy.eincode.com/courses/next-js-typescript-with-shopify-integration-full-guide",
                "slug": "next-js-typescript-with-shopify-integration-full-guide",
                "wsl": [
                  "Build Next JS apps on your own",
                  "Build ecommerce apps with modern technologies",
                  "Use Shopify to your advantage"
                ],
                "createdAt": ""
              },
        orderId:'0x0xE7e168E9e0E0d5d0E8740670c2FF09143c7127c3',
        proofId:'0xc0cb747cb0fcfe7c2dee77be4c524e5cebc056bd90c0b577ac7cadfc4aa24bd6',
        cost:0.03841

      }
    ]
    const [order,setOrder]=useState(null)
    
    useEffect(()=>{
     ctx.findAllOwnedCourses()
    },[])
    const courseSetter=(course)=>{
      setOrder(course)
    }
    useEffect(()=>{
      if(order)
      {
        returnCourse()
        
      }
    },[order])
    const returnCourse=async()=>{
  
    //Generate hexCourseId
    const hexCourseId=await ctx.web3Api.web3.utils.utf8ToHex(order.id);
  
    console.log(hexCourseId)
    
    const orderHash=await ctx.web3Api.web3.utils.soliditySha3(
      {"type": "uint", value:hexCourseId},
      {"type": "address", value:ctx.account},
  
    )
    console.log(orderHash)
    const course=await ctx.web3Api.contract._methods.getCourseByHash(orderHash).call()
         
    console.log(course)
    //0x709271bf658567dee2a40395297ac4828b03b63608a58bc85ec3076945b54d8d
    //console.log(ctx.web3Api.contract.methods)
   const amount=ctx.web3Api.web3.utils.toWei("0.03841","ether")
   await ctx.web3Api.contract._methods.withdrawCourse(orderHash,order.proofId,amount).send({
      from:ctx.account,
      
    })
    const courseAfter=await ctx.web3Api.contract._methods.getCourseByHash(orderHash).call()
         
    console.log(courseAfter)
  
    }
    return(
        <>
        <div className="flex flex-col">
          {ctx.ownedCourse.map((o,i)=><OrderCard course={o} courseSetter={courseSetter}  isReturn={props.isReturn}></OrderCard>
          )}

        </div>
        </>
    )
}
export default OrderList