import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from "web3";
import contract from '@truffle/contract';
export  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error("ERROR HAPPENDED"+err);
        }
      })
      console.log(accounts)
      return accounts;
    }
    
   
    
   
   export const intializeWeb3=async()=>{
        const provider =await detectEthereumProvider()
        console.log(provider)
        if(provider)
        { 
         const web3=new Web3(provider)
          const contract=await loadContract("Courses",web3)
          return {web3:web3,provider:provider,contract:contract}
        }
     
      
    }
    export const loadContract=async(name,web3)=>{
    //build\contracts\Courses.json
    const response=fetch(`/build/contracts/${name}.json`)
    const Artifact=await (await response).json()
    console.log(Artifact)
    let contract = null

    try {
      contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks['5777'].address
    )
    console.log(contract)
  } catch {
    console.log(`Contract ${name} cannot be loaded`)
  }

  return contract
    

   }