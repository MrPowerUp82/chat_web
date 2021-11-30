import React, { useEffect, useCallback, useState } from 'react';
import {FaTimes, FaCheck} from 'react-icons/fa'

function MsgPage(){

	const [invites, setInvites] = useState([])
	const [users,setUsers] = useState([])


	useEffect(()=>{
		async function getInvites(token,url){
			await fetch(url,{
                headers: {'Authorization': `Bearer ${token}`}
            }).then(r=>r.json()).then(json=>{
				setInvites(json)
			})
		}
		async function getUsers(token,url){
			await fetch(url,{
                headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'}
            }).then(r=>r.json()).then(json=>{
				setUsers(json)
			})
		}
		getInvites(localStorage.getItem('token'),'https://webcoffee.herokuapp.com/api/v1/invites/'+localStorage.getItem('user_id')+'/')
		getUsers(localStorage.getItem('token'),'https://webcoffee.herokuapp.com/api/v1/users/'+localStorage.getItem('user_id')+'/')
        if (localStorage.getItem('token')== null){
            window.location.replace(window.location.origin+'/login').reload()
        }
	},[])

	const handleSendInvite=useCallback(async(e)=>{
		e.preventDefault()
		async function sendInvite(token, user_id,username){
            let url = `https://webcoffee.herokuapp.com/api/v1/invites/`
             await fetch(url,{
				method: 'POST',
                headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
				body: JSON.stringify({send_user_id:user_id, recv_user_id:e.target.user.value, status: 0, send_username: username})
            }).then(r=>r.json()).then(json=>{
                    console.log(json)
                    console.log(e.target.user.value)

            })
        }
		sendInvite(localStorage.getItem('token'),localStorage.getItem('user_id'), localStorage.getItem('username'))
	},[])


	const handleAccept=useCallback(async(send_user_id,send_username,id)=>{
		async function acceptInvite(token, user_id){
            let url = `https://webcoffee.herokuapp.com/api/v1/invites/`
             await fetch(url,{
				method: 'POST',
                headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
				body: JSON.stringify({id:id,send_user_id:send_user_id, recv_user_id:user_id, status: 1, send_username: send_username})
            }).then(r=>r.json()).then(json=>{
                    console.log(json)
                    

            })
        }
		acceptInvite(localStorage.getItem('token'),localStorage.getItem('user_id'))
        window.location.reload()
	},[])

	const handleDelete=useCallback(async(id)=>{
		async function deleteInvite(token){
            let url = `https://webcoffee.herokuapp.com/api/v1/invites/${id}/`
             await fetch(url,{
				method: 'DELETE',
                headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}
            }).then(r=>r.json()).then(json=>{
                    console.log(json)
                    

            })
        }
		deleteInvite(localStorage.getItem('token'))
        window.location.reload()
	},[])

		return(
			<div className="w-screen">
        <div className="grid grid-cols-3 min-w-full border rounded" >
                <div className="col-span-1 bg-white border-r border-gray-300">
                    <div className="my-3 mx-3 ">
                        <div className="relative text-gray-600 focus-within:text-gray-400">
                        </div>
                    </div>
                    <ul className="overflow-auto" style={{height: '500px'}}>
                        <h2 className="sm:text-xs ml-5 mb-2 text-blue-600 md:text-lg my-2 uppercase font-bold mr-2">Solicitação de Amizade</h2>
                        <hr/>
                        <li>
                                <p className="bg-white border-b px-3 py-2 flex items-center text-sm justify-center">
                                <div className="w-full pb-2">
                                    {invites.detail ? <strong>Nenhuma Solicitação</strong> : (
                                        <>
                                        {invites.map((item)=>(
										<div className="justify-start grid grid-flow-col">
                                        <span className="block ml-4 font-semibold text-base text-gray-600 ">{item.send_username}</span>
                                        <span onClick={()=>handleAccept(item.send_user_id, item.send_username,item.id)} className="block ml-4 font-semibold text-base text-green-700 cursor-pointer"><FaCheck size={20}/></span>
                                        <span onClick={()=>handleDelete(item.id)}className="block ml-4 font-semibold text-base text-red-600 cursor-pointer"><FaTimes size={20}/></span>
                                    	</div>
									))}
                                        </>
                                    )}
                                </div>
                                </p>
                        </li>
                    </ul>
                </div>
                <div className="col-span-2 bg-white">
                    <div className="w-full">
                        <div className="flex items-center border-b border-gray-300 pl-3 py-3">
                            <span className="block ml-2 font-bold text-base text-gray-600"></span>
                        </div>
                        <div id="chat" className="w-full p-10 relative" style={{height: "700px"}}>
								<form onSubmit={handleSendInvite} className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
									<p className="sm:text-sm mb-5 md:text-2xl uppercase text-gray-600">Enviar Solicitação de Amizade</p>
									<p className="sm:text-xs mb-5 md:text-xl text-blue-600">Selecione o Usuário</p>
										{users.detail ? <strong>Nenhum Usuário Ainda</strong> : (
                                            <>
                                            <select id="user" name="user"className="mb-5 p-3 w-auto focus:border-blue-700 rounded border-2 outline-none">
                                            {users.map(item=>(
											<option value={item.id}>{item.username}</option>
										))}
                                            </select>
                                            </>
                                        )}
									
									<button className="bg-blue-600 hover:bg-blue-900 text-white font-bold p-2 rounded w-auto" id="login" type="submit"><span>Send</span></button>
								</form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
			)
	}

export default MsgPage