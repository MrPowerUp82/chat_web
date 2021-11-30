import React, { useState, useCallback, useEffect } from 'react';
const LoginPage = () =>{

	const [token, setToken] = useState('')
	const [user_id, setUserId] = useState('')
	const [username,setUsername] = useState('')

	const handleSubmit=useCallback(async (e)=>{
		e.preventDefault();
		await fetch('https://webcoffee.herokuapp.com/token/',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username:e.target.username.value, password: e.target.password.value})
		}).then(res=>res.json()).then(json=>localStorage.setItem('token', json.access)).then(()=>fetch('https://webcoffee.herokuapp.com/api/v1/user/',{
			headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
		}).then(res=>res.json()).then(json=>{
			console.log(json)
			setUsername(json[0].username)
			setToken(localStorage.getItem('token'))
			setUserId(json[0].id)}))
	},[])

	useEffect(()=>{
		localStorage.clear();
		if (user_id !== ''){
			localStorage.setItem('token', token)
			localStorage.setItem('user_id', user_id)
			localStorage.setItem('username', username)
			window.location.replace(window.location.origin+'/').reload()
		}
	},[user_id,token,username])

	return(
		<div className="w-screen h-screen flex justify-center items-center bg-gray-100">
			<form className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md" onSubmit={handleSubmit}>
				<p className="mb-5 text-3xl uppercase text-gray-600">Login</p>
				<input type="text" name="username" className="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" placeholder="Username" required/>
				<input type="password" name="password" className="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" placeholder="Password" required/>
				<button className="bg-blue-600 hover:bg-blue-900 text-white font-bold p-2 rounded w-80" id="login" type="submit"><span>Login</span></button>
			</form>
		</div>
		)
}



export default LoginPage