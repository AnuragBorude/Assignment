import React, { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {compare} from 'n-krypta'




function Protected(props){
    var nav=useNavigate()

    const {Component}=props
    useEffect(()=>
    {
        var key="key"
        let val =localStorage.getItem('login')
        let login=compare('LoginIDPASS',val,key)
        if (!login)
        {
            nav('/')
        }
        
    })
   
    
    return(
        <>
            <Component />
        </>
    )
}
 export default Protected
 