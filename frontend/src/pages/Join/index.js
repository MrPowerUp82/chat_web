import React, { useCallback, useState, useEffect} from 'react';

function RegisterPage(){

	const [result, setResult] = useState('')

	const handleSubmit=useCallback(async (e)=>{
		e.preventDefault();
		await fetch('https://webcoffee.herokuapp.com/api/v1/users/',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username:e.target.username.value, email:e.target.email.value, password: e.target.password.value, nome_chat: ''})
		}).then(res=>res.json()).then(json=>setResult(json))
	},[])

	useEffect(()=>{
		if(result !== ''){
			window.location.replace(window.location.origin+'/login').reload()
		}
	},[result])

		return(
			<div className="w-screen h-screen flex justify-center items-center bg-gray-100">
				<form onSubmit={handleSubmit} className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
					<p className="mb-5 text-3xl uppercase text-gray-600">Register</p>
					<input type="email" name="email" className="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" placeholder="Email" required/>
					<input type="text" name="username" className="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" placeholder="Username" required/>
					<input type="password" name="password" className="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" placeholder="Password" required/>
					<button className="bg-blue-600 hover:bg-blue-900 text-white font-bold p-2 rounded w-80" id="login" type="submit"><span>Register</span></button>
				</form>
			</div>
			)
}


export default RegisterPage