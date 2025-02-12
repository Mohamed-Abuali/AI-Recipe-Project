"use client"


import {useState} from 'react'
import fetchAPI from "@/components/fetchAPI";

const MessgaeInputBox = () => {

const [messgae, setMessgae] = useState("")
const sendHandler = () =>{
    console.log(messgae)
    fetchAPI({prompt: messgae});
    setMessgae("")

}
    return (
        <div className={`w-full h-full p-2 flex items-center justify-center gap-2`}>
            <input type={`text`} value={messgae} onChange={(e) => setMessgae(e.target.value)} placeholder={`enter your message`} className={`bg-transparent p-1 w-full h-[70%] active:border-none `}/>
            <button onClick={sendHandler} className={`w-[158px] h-[46px] bg-slate-200 rounded-xl flex items-center justify-center text-black`}>
                send
            </button>
        </div>
    )
}
export default MessgaeInputBox
