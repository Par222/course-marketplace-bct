const GenericModal=(props)=>{
    console.log(props)
    return(
        <>
        <div className="absolute top-0 left-0 opacity-75 z-10 bg-black h-[100vh] w-full" onClick={props.closeHandler}></div>
        <div className="bg-white max-h-[70%]  max-w-[30%] top-[25%] z-50 left-[35%] absolute py-4 px-5 rounded-sm ">
         <div className="font-bold text-sm">{props.title}</div>
         <>
         {props.children}
         </>
    
        </div>
        </>
    )
}
export default GenericModal