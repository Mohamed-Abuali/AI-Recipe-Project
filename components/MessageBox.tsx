"use client"

import React,{useState,useEffect} from 'react'

import fetchAPI from "@/components/fetchAPI";
import {MessageBubble} from "@/components/MessageBubble";
const MessageBox:React.FC = ()  => {



    const [messgae, setMessgae] = useState<{ text: string; isUser: boolean; id: number }[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [input, setInput] = useState("");

    interface InputUser {
        text:string,
        isUser: boolean,
    }



    const handleMessage = (inputUser: InputUser) => {
        const { text, isUser } = inputUser;
        setMessgae((prevMessages) => {
            return [
                ...prevMessages,
                {
                    text,
                    isUser,
                    id: Date.now(),
                },
            ];
        });
    };
    useEffect(() => {


    }, []);
    const sendHandler = async () =>{
        console.log(input)
        setIsLoading(true);
        handleMessage({ text: input, isUser: true })
        const aiRespone = await  fetchAPI({prompt: input});
        setInput("")

        if(aiRespone){
            setIsLoading(false);
            handleMessage({ text: aiRespone, isUser: false })
    }
    }
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center p-5 overflow-y-auto`}>
            <div className={`w-full h-full  p-1 pt-4 flex flex-col items-center justify-start gap-5 overflow-y-auto `}>

                {messgae.map((msg,i) => (
                    <div key={i}
                         className={` w-full  flex  ${msg?.isUser?'justify-end':'justify-start' }   p-2`}>
                        {msg.isUser ? (

                        <MessageBubble message={msg.text} isUser={msg.isUser} id={msg.id}/>

                        ): (


                            <MessageBubble id={msg.id} message={msg.text} isUser={msg.isUser}/>


                        )}
                    </div>
                ))}


            </div>
            <div className={`w-[80%] h-[10%] bg-slate-700 rounded-2xl flex items-center justify-center `}>

            <div className={`w-full h-full p-2 flex items-center justify-center gap-2`}>
                    <input type={`text`} value={input} onChange={(e) => setInput(e.target.value)}
                           placeholder={`enter your message`}
                           className={`bg-transparent p-1 w-full h-[70%] active:border-none `}/>
                    <button onClick={sendHandler}
                            disabled={isLoading}
                            onKeyDown={(e) => e.key === "Enter" && console.log('preesed')}
                            className={`w-[158px] h-[46px] ${isLoading? 'bg-slate-400' : 'bg-slate-200'} rounded-xl flex items-center justify-center text-black`}>
                        {isLoading? '...Loading' : 'Send'}
                    </button>
                </div>
            </div>

        </div>
    )
}
export default MessageBox
