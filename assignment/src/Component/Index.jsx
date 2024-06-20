import React from "react";
import {BrowserRouter as  Router, Routes,Route } from "react-router-dom";

import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx"
import ProductList from "./ProductList.jsx";
import ProductAdd from "./Productadd.jsx";
import Protected from "./Protected.jsx";


function Index(){
    return(
        <>
          <Router>
                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/dashboard' element={<Protected Component={Dashboard}/>}></Route>
                    <Route path='/productlist' element={<Protected Component={ProductList}/>}></Route>
                    <Route path='/productadd' element={<Protected Component={ProductAdd}/>}></Route>
                </Routes>
          </Router>
        </>
    )
}
 export default Index;