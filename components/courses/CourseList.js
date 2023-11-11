"use client";
import { useContext, useEffect, useState } from "react";
import { courses } from "./Course";
import CourseCard from "./CourseCard";
import GenericModal from "../common/GenericModal";
import { web3Context } from "@/provider/Web3Provider";
const CourseList = () => {
  const [modal, setModal] = useState(false);
  const [course, setCourse] = useState(null);
  const ctx=useContext(web3Context)
  const [deactivate,setDeactivate]=useState(false)
  const clickHandler = async(course,action) => {
    setCourse(course);
    if(action)
    setModal(true);
    else{
   setDeactivate(true)
  }
  };
  useEffect(()=>{
    if(course && deactivate)
    {
       
        deActivateFunc(course)
    }

  },[deactivate,course])
  const activateHandler=async(course)=>{
  await ActivateFunc(course)
  }
  const deActivateFunc=async(selected)=>{
    for(let i=0;i<ctx.allAccounts.length;i++)
    {
        const hexCourseId=ctx.web3Api.web3.utils.utf8ToHex(selected.id);

        console.log(hexCourseId)
       
       
        
        const orderHash=ctx.web3Api.web3.utils.soliditySha3(
          {"type": "uint", value:hexCourseId},
          {"type": "address", value:ctx.allAccounts[i]},
      
        )
        const course=await ctx.web3Api.contract._methods.getCourseByHash(orderHash).call()
         
        console.log(course)
        if(course.owner!="0x0000000000000000000000000000000000000000")
         await ctx.web3Api.contract._methods.deactivateCourse(orderHash).send({from:ctx.allAccounts[i]})
    }

}
const ActivateFunc=async(selected)=>{
    for(let i=0;i<ctx.allAccounts.length;i++)
    {
        const hexCourseId=ctx.web3Api.web3.utils.utf8ToHex(selected.id);

        console.log(hexCourseId)
       
       
        
        const orderHash=ctx.web3Api.web3.utils.soliditySha3(
          {"type": "uint", value:hexCourseId},
          {"type": "address", value:ctx.allAccounts[i]},
      
        )
        const course=await ctx.web3Api.contract._methods.getCourseByHash(orderHash).call()
         
        console.log(course)
        if(course.owner!="0x0000000000000000000000000000000000000000")
         await ctx.web3Api.contract._methods.activateCourse(orderHash).send({from:ctx.allAccounts[i]})
    }

}
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [error, setError] = useState(false);

  const purchasCourse=async()=>{
  console.log(ctx.web3Api)
  //Generate hexCourseId
  const hexCourseId=await ctx.web3Api.web3.utils.utf8ToHex(course.id);

  console.log(hexCourseId)
  //Generate email Hash
  const emailHash=await ctx.web3Api.web3.utils.soliditySha3(email)
  
  const orderHash=await ctx.web3Api.web3.utils.soliditySha3(
    {"type": "bytes16", value:hexCourseId},
    {"type": "address", value:ctx.account},

  )
  console.log(orderHash)
  //0x709271bf658567dee2a40395297ac4828b03b63608a58bc85ec3076945b54d8d
  const proof=await ctx.web3Api.web3.utils.soliditySha3({"type": "uint", value:emailHash},{"type": "bytes32", value:orderHash},
  )
  console.log(proof)
  //console.log(ctx.web3Api.contract.methods)
 await ctx.web3Api.contract._methods.purchaseCourse(hexCourseId,proof).send({
    from:ctx.account,
    value:ctx.web3Api.web3.utils.toWei("0.03841","ether")
  })

  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (email != repeatEmail) {
      console.log("error");
      setError(true);
      return;
    }
    if (setError) {
      setError(false);
    }
    await purchasCourse().then(()=>{
        setModal(false);
    })
   
  };
  
  return (
    <>
      {modal && (
        <GenericModal title={course.title} closeHandler={() => setModal(false)}>
          <form
            className="text-sm my-4 flex flex-col"
            submitHandler={submitHandler}
          >
            <span className="font-semibold my-3">Price (eth)</span>
            <p className="shadow-sm py-2 px-1 text-xs">0.03841</p>
            <label className="font-semibold my-2">Email</label>
            <input
              className="py-2 px-1 text-xs shadow-sm"
              placeholder="x@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <p className="text-[11px]">
              It is important to fill the correct email, otherwise the order
              wont be verified . We are not storing your email anywhere
            </p>
            <label className="font-semibold my-2">Repeat Email</label>
            <input
              className="py-2 px-1 text-xs shadow-sm"
              placeholder="x@gmail.com"
              onChange={(e) => setRepeatEmail(e.target.value)}
            ></input>
            <div className="flex">
              <input type="checkbox" checked={true}></input>
              <p className="text-[11px] mx-2">
                I hereby Eincode 'terms of service' and I agree my order can be
                rejected in case the details provided by me are incorrect
              </p>
            </div>
            {error && (
              <h1 className="bg-yellow-200 rounded-md py-2 px-3 text-yellow-700 text-[11px] my-3">
                E-Mail is not matching . Please enter correctly
              </h1>
            )}
            <footer className="text-sm flex space-x-2 items-baseline">
              <button
                className="py-2 px-5 text-white bg-[#561eff] rounded-md"
                onClick={submitHandler}
                type="submit"
              >
                Submit
              </button>
              <button
                className="py-2 px-5 text-white bg-red-700 rounded-md"
                onClick={()=>setModal(false)}
                type="button"
              >
                Cancel
              </button>
            </footer>
          </form>
        </GenericModal>
      )}
      <div className="grid grid-cols-2">
        {ctx.allCourses && ctx.allCourses.map((c, i) => (
          <CourseCard {...c} clickHandler={clickHandler} activateHandler={activateHandler}></CourseCard>
        ))}
      </div>
    </>
  );
};
export default CourseList;
