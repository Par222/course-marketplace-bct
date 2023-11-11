const EtherPrice=()=>{
    return(
        <div className="flex space-x-5 text-sm">
        <div className="my-3 rounded-md border border-gray-400 px-5 py-4 w-[15%] flex flex-col items-center">
            <div className="flex items-center">
                <img src="/eth.png" height={30} width={30}></img>
                <div>
                    <span className="font-bold">=  3997.56 $</span>
                </div>

            </div>
            <p className="text-xs text-gray-500 my-1">Current ether price</p>
            <div></div>

        </div>
        <div className="my-3 rounded-md border border-gray-400 px-5 py-4 w-[15%] flex flex-col items-center">
            <div className="flex items-center">
                <span className="font-bold">0.03841</span>
                <img src="/eth.png" height={30} width={30}></img>
                <div>
                    <span className="font-bold">=  15 $</span>
                </div>

            </div>
            <p className="text-xs text-gray-500 my-1">Price per course</p>
            <div></div>

        </div>
        </div>
    )
}
export default EtherPrice