import React, { useState, useEffect, useCallback } from 'react';

function Home(){

    const [msgs,setMsgs] = useState([])
    const [username,setUsername] = useState('')
    const [send_username,setSendUsername] = useState([])
    const [user_id,setUserId] = useState('')
    const [selected_user,setSelectedUser] = useState('')
    const [send_user_id,setSendId] = useState('')
    const [token,setToken]= useState('')
    const [i, setI] = useState(0)

    const handleSend = useCallback(async(e)=>{
        e.preventDefault()
        await fetch('https://webcoffee.herokuapp.com/api/v1/msgs/',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({send_user_msg_id:user_id, recv_user_msg_id: send_user_id, msg: e.target.msg.value})
		}).then(res=>res.json()).then(json=>{
            if(msgs.error !== undefined){
                window.location.reload()
            }else{
                setMsgs([...msgs,json])
            }
        })
    },[msgs,send_user_id,token,user_id])


    
    const handleMsg = useCallback(async(id,username)=>{
       async function getMsgs(token, user_id, send_id,username){
            let url = `https://webcoffee.herokuapp.com/api/v1/msgs/${user_id}/${send_id}/`
             await fetch(url,{
                headers: {'Authorization': `Bearer ${token}`}
            }).then(r=>r.json()).then(json=>{
                    setMsgs(json)
                    setSendId(send_id)
                    setSelectedUser(username)
                    localStorage.setItem('send_user_id', send_id)
                    localStorage.setItem('selected_user', username)
            })
        }
        getMsgs(localStorage.getItem('token'),localStorage.getItem('user_id'),id,username)
    }, [])

    useEffect(()=>{
        async function getSendUsername(token,url){
            await fetch(url,{
                headers: {'Authorization': `Bearer ${token}`}
            }).then(r=>r.json()).then(json=>{
                    setSendUsername(json)
            })
        }
        getSendUsername(localStorage.getItem('token'),'https://webcoffee.herokuapp.com/api/v1/friends/'+localStorage.getItem('user_id')+'/')
        setUsername(localStorage.getItem('username'))
        setUserId(localStorage.getItem('user_id'))
        setToken(localStorage.getItem('token'))
        if (localStorage.getItem('token')== null){
            window.location.replace(window.location.origin+'/login').reload()
        }
        localStorage.removeItem('selected_user')
        setInterval(()=>{
            setI(Math.random(1,1000)+1)
        },10000)
    },[])
    

    useEffect(()=>{
        if(localStorage.getItem('selected_user') !== null){
            async function getMsgs(token, user_id, send_id,username){
                let url = `https://webcoffee.herokuapp.com/api/v1/msgs/${user_id}/${send_id}/`
                 await fetch(url,{
                    headers: {'Authorization': `Bearer ${token}`}
                }).then(r=>r.json()).then(json=>{
                        setMsgs(json)
                        setSendId(send_id)
                        setSelectedUser(username)
                })
            }
            getMsgs(localStorage.getItem('token'),localStorage.getItem('user_id'),localStorage.getItem('send_user_id'),localStorage.getItem('selected_user'))
        }
    },[i])

    return(
        <div className="w-screen">
        <div className="grid grid-cols-3 min-w-full border rounded" >
                <div className="col-span-1 bg-white border-r border-gray-300">
                    <div className="my-3 mx-3 ">
                        <div className="relative text-gray-600 focus-within:text-gray-400">
                        </div>
                    </div>
                    <ul className="overflow-auto" style={{height: '500px'}}>
                        <h2 className="ml-5 mb-2 text-blue-600 text-lg my-2 uppercase font-bold">Olá {username}</h2>
                        <hr/>
                        <h2 className="ml-5 mb-2 text-gray-600 text-lg my-2 uppercase font-bold">Amigos</h2>
                        <hr/>
                        <li>
                           {send_username.detail ? <strong className="ml-2">Nenhum Amigo</strong> : (
                               <>
                               {send_username.map(item=>{
                               return(
                                <div key={item[0].id} onClick={()=>handleMsg(item[0].id,item[0].username)} className="bg-white border-b px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:bg-gray-300 transition duration-150 ease-in-out">
                                <div className="w-full pb-2">
                                    <div className="flex justify-between">
                                        <span className="block ml-2 font-semibold text-base text-gray-600 ">{item[0].username}</span>
                                    </div>
                                </div>
                                </div>
                               )
                           })}
                               </>
                           ) }
                        </li>
                    </ul>
                </div>
                <div className="col-span-2 bg-white">
                    <div className="w-full">
                        <div className="flex items-center border-b border-gray-300 pl-3 py-3">
                            <span className="block ml-2 font-bold text-base text-gray-600">{selected_user === null ? '' : selected_user}</span>
                        </div>
                        <div id="chat" className="w-full overflow-y-auto p-5 relative" style={{height: "700px"}}>
                            <ul>
                                <li className="clearfix2">
                                    {msgs.error === '' ? <strong>Nenhuma Mensagem</strong> : (<>
                                    {msgs.map(item=>(
                                            <>
                                            {user_id.toString() === item.send_user_msg_id.toString() ? (
                                                    <div key={item.id} className="w-full flex justify-end">
                                                    <div className="bg-gray-100 rounded px-2 py-2 my-2 text-black relative" style={{maxWidth: "300px"}}>
                                                        <span className="block">{item.msg}</span>
                                                        <span className="block text-xs text-left">{item.data.split('T')[0].split('-').reverse().join('/')} ás {item.data.split('T')[1].split('.')[0].split('').splice(0,5)}</span>
                                                    </div>
                                                </div>
                                            ) : ''}
                                            {user_id.toString() === item.recv_user_msg_id.toString() ? (
                                                    <div key={item.id} className="w-full flex justify-start">
                                                    <div className="bg-blue-200 rounded px-2 py-2 my-2 text-black relative" style={{maxWidth: "300px"}}>
                                                        <span className="block">{item.msg}</span>
                                                        <span className="block text-xs text-right">{item.data.split('T')[0].split('-').reverse().join('/')} ás {item.data.split('T')[1].split('.')[0].split('').splice(0,5)}</span>
                                                    </div>
                                                </div>
                                            ) : ''}                
                                            </>
                                        )
                                    )     
                                }
                                    </>)}
                                
                                </li>
                            </ul>
                        </div>
                            <form onSubmit={handleSend}>
                            <div className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
                            <input name="msg" id="msg" aria-placeholder="Escribe un mensaje aquí" placeholder="Escreva aqui"
                                className="py-4 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" type="text" required/>

                            <button className="outline-none focus:outline-none" type="submit">
                                <svg className="text-gray-400 h-7 w-7 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                            </div>
                            </form>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Home