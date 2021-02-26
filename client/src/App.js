import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import MenuBar from "./Components/MenuBar";
import Home from './Pages/home'
import Login from './Pages/login'
import Register from "./Pages/register";
import Services from "./Pages/services";
import Appointment from "./Pages/appointments";
import Profile from "./Pages/profile";
import {AuthProvider} from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import ProtectRoute from "./util/ProtectRoute";
import Success from "./Pages/success";
import Footer from "./Components/Footer";
import {MobileViewProvider} from "./context/mobile";

function App() {
    return (
        <MobileViewProvider>
            <AuthProvider>
                <Router>
                    <MenuBar/>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/services' component={Services}/>
                    <Route exact path='/bookings' component={Appointment}/>
                    <AuthRoute exact path='/login' component={Login}/>
                    <AuthRoute exact path='/register' component={Register}/>
                    <ProtectRoute exact path='/profile' component={Profile}/>
                    <ProtectRoute exact path='/success' component={Success}/>
                    <Footer/>
                </Router>
            </AuthProvider>
        </MobileViewProvider>
    )
}

export default App;
