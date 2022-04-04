import React from 'react'
import { Routes as Switch, Route, Navigate } from 'react-router-dom'

import PrivateRoute from './components/privateRoute'
import Layout from './components/layout'
import Home from './pages/home'
import Admin from './pages/admin'
import MyCategories from './pages/my-categories'
import MyProducts from './pages/my-products'

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/my-categories' element={<PrivateRoute shouldBeLogged shouldBeAdmin element={<MyCategories />} />} />
                <Route path='/my-products' element={<PrivateRoute shouldBeLogged shouldBeAdmin element={<MyProducts />} />} />
            </Route>
            
            <Route path='/secret/admin' element={<PrivateRoute shouldBeLogged={false} element={<Admin />} />} />
           
            <Route path='*' element={<Navigate replace to='/' />} />
        </Switch>
    )
}


export default Routes