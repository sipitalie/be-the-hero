import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';


export default function BaseRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path ="/" exact component ={Login}/>
                <Route path ="/register"  component ={Register}/>
                <Route path ="/profile"  component ={Profile}/>
                <Route path ="/incidents/new"  component ={NewIncident}/>
            </Routes>
        </BrowserRouter>
    );
}