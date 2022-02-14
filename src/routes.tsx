import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

// import PrivateRoute from './components/privateRoute'
import Layout from './components/layout'
import Home from './pages/home'
import Admin from './pages/admin'

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
            </Route>
            <Route path='/secret/admin' element={<Admin />} />
        </Switch>
    )
}


export default Routes