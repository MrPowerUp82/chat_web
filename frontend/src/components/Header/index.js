import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect, useCallback} from 'react'

function Header(){

  const [auth,setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')){
      setAuth(true)
    }
  },[])

  const handleLogout = useCallback(() =>{
    localStorage.clear();
    window.location.replace(window.location.origin+'/login').reload()
  },[])

    return(
  <section className="relative mx-auto">
    <nav className="flex justify-between bg-white text-black w-screen">
      <div className="px-2 xl:px-12 py-2 flex w-full items-center">
        <Link to={'/'} className="text-3xl font-bold font-heading">
          Chat
        </Link>
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li><Link to={'/'} className="hover:text-blue-500">Home</Link></li>
          <li><Link to={'/send'} className="hover:text-blue-500">Solicitações</Link></li>
        </ul>
        <div className="hidden xl:flex items-center space-x-5">
         {auth ? (
           <>
            <p onClick={handleLogout} className="hover:text-blue-500 cursor-pointer">
            Logout
          </p>
          </>
         ): (
          <>
          <Link to={'/login'} className="hover:text-blue-500">
          Login
        </Link>
        <Link to={'/register'} className="flex items-center hover:text-blue-500">
          Register
        </Link>
        </>
         ) }
        </div>
      </div>
      {auth ? (
        <>
         <Link to={'/send'} className="xl:hidden flex mr-6 items-center hover:text-blue-500">
        Solicitações
      </Link>
        <p onClick={handleLogout} className="xl:hidden flex mr-6 items-center hover:text-blue-500 cursor-pointer">
        Logout
      </p>
        </>
      ):(
        <>
        <Link to={'/login'} className="xl:hidden flex mr-6 items-center hover:text-blue-500">
        Login
      </Link>
      <Link to={'/register'} className="navbar-burger self-center mr-12 xl:hidden hover:text-blue-500">
        Register
      </Link>
        </>
      )}
      
    </nav>
  </section>
    )
}

export default Header