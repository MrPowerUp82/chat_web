import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Join'
import Header from './components/Header';
import InvitePage from './pages/Invite';

const Routes = () =>{
    return(
        <BrowserRouter>
        <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/send" component={InvitePage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes