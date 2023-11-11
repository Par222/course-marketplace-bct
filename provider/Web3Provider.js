"use client"
import { useEffect, useState } from "react"
import React from "react"
import { getAccount, intializeWeb3, res, web3 } from "./Providerfunctions"
 import { courses } from "@/components/courses/Course"
// This returns the provider, or null if it wasn't detected.

export const web3Context=React.createContext(
    {
        intializeWeb3:()=>{},
        purchaseCourse:()=>{},
        web3Api:{},
        activateCourse:()=>{},
        deActivateCourse:()=>{},
        returnCourse:()=>{},
        account:null,
        chainId:'',
        ownedCourse:[],
        allCourses:[],
        findAllOwnedCourses:()=>{},
        isAdmin:false,
       allAccounts:[]

    }
)
const Web3Provider=(props)=>{
    const [web3Api,setWeb3Api]=useState({
        provider:null,
        web3:null,
        contract:null
    })
    const [ownedCourse,setOwnedCourses]=useState([])
    const [account,setAccount]=useState(null)
    const [chainId,setChainID]=useState(null)
    const [allAccounts,setAllAccounts]=useState([])
    const [allCourses,setAllCourses]=useState([])
    const [isAdmin,setIsAdmin]=useState(false)
    const purchaseCourse=(ownedCourse)=>{
      setOwnedCourses(ownedCourse)

    }
    

    const fetchWeb3=async()=>{
        const response=await intializeWeb3()
        const acc=await  getAccount()
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainID(chainId)
        setWeb3Api(response)
        setAllAccounts(acc)
        setAccount(acc[0])
        setIsAdmin(acc[0].toLowerCase()=="0xb707f9af6d9d71e6368ae87a4067e40a244e0778")

    }
    const findAllOwnedCourses=async()=>{
        let ownedCourses=[]
        
        for(let i=0;i<courses.length;i++)
        { 
          
          const hexCourseId= web3Api.web3.utils.utf8ToHex(courses[i].id);
          let courseHash=web3Api.web3.utils.soliditySha3(
            {"type":"uint",value:hexCourseId},
            {"type":"address",value:account}
  
          )
          console.log(courseHash)
          
          const course=await web3Api.contract._methods.getCourseByHash(courseHash).call()
         
          console.log(course)
          if(course.owner!="0x0000000000000000000000000000000000000000")
          {
            ownedCourses.push({...courses[i],
            proofId:course.proof,
             owner:course.owner,
             price:course.price,
             orderid:course.id,
             state:course.state
            })
          }
        }
     
      purchaseCourse(ownedCourses)
        
      }
    
    useEffect(()=>{
      fetchWeb3()
      
    },[])
    useEffect(()=>{
    if(web3Api.web3 && account)
    {
     console.log(account)
     findAllOwnedCourses()
    }
    },[web3Api.web3,account])
    useEffect(()=>{
        if(ownedCourse.length>0){
        for(let i=0;i<ownedCourse.length;i++)
        {
    
            courses.map((c,index)=>{
                if(c.id==ownedCourse[i].id)
                courses[index]={...c,isOwned:true,state:ownedCourse[i].state}
            })
        }

      
    }
    setAllCourses(courses)
    },[ownedCourse])
window.ethereum.on('accountsChanged', handleAccountsChanged);

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts.
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== account) {
    // Reload your interface with accounts[0].
    const currentAccount = accounts[0];
    // Update the account displayed (see the HTML for the connect button)
    setAccount(currentAccount)
  }
}

    useEffect(()=>{
     console.log('changed account')
    },[window.ethereum])
    window.ethereum.on('chainChanged', fetchChainId);
    async function fetchChainId(){

    
    
       function handleChainChanged(chainId) {
        setChainID(chainId)
        window.location.reload()
        console.log(chainId)
        // We recommend reloading the page, unless you must do otherwise.
        //window.location.reload();}
    }
    handleChainChanged(chainId)}

   
    const value={
      web3Api:web3Api,
      account:account,
      chainId:chainId,
      ownedCourse,
      purchaseCourse,
      allCourses,
      findAllOwnedCourses,
      isAdmin,
      allAccounts
    }
    return (
        <web3Context.Provider value={{...value}}>
        {props.children}
        </web3Context.Provider>
    )
}
 
export default Web3Provider