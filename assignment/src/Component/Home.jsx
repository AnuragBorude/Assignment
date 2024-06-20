import React, { useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import "./Css/Homestyle.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {encrypt} from 'n-krypta'



function Home(){
    var nav=useNavigate()


    // Password
    const [PasswordData,setPasswordData] =useState('')
    const [ShowPassword,setShowPAssword] =useState(false)

    const handleInput =(e)=>{
        setPasswordData(e.target.value)
    }
    const handelshowpassword =()=>{
        setShowPAssword(!ShowPassword)
    }
    

    // Save User Provided Data
    const[values,setvalues]=useState({
        Email:"",
        Password:""
    }) 
       
    const handelchange=(event)=>{
        setvalues({
            ...values,
            [event.target.name]:event.target.value
            
        })
    }

    const[errors,seterrors]=useState({})
    const[Matcherrors,setMatcherrors]=useState(false)

    // Foem Submit

    const submit= (event) =>{
        event.preventDefault()
        seterrors(validation(values))
        // const em=values.Email
        // const pa=values.Password
        var checklogin = axios.post(`http://127.0.0.1:8000/LoginCheck/`,values)
        .then(function(res){
            // console.log(res.data);
            if(res.data.status=="true")
            {
                var key="key"
                var str="LoginIDPASS"
                var login=encrypt(str,key)
                localStorage.setItem("login",login);
                nav('/dashboard')
            }
            else
            {
                // alert("Login Failed");
                setMatcherrors(true)

            }
    
        })
    }
 
    const validation=(values)=>{
        let errors={}

        if(!values.Email){
            // alert("validate")
            errors.email="Email is Required"
        }

        if(!values.Password){
            // alert("validate")
            errors.password="Password is Required"
        }
        return errors
    }
    
    return(
        <>
            <div className="container-fluid p-0 m-0">
                <div className="row p-0 m-0">
                    <div className="main" >
                        <div className='circle'></div>     
                        <div className='logo'>             
                                <img className="" src="loginLogo.svg" alt="" />
                                <h6 className="" >Online Project Management</h6>
                        </div>         
                    </div>
                    <div className='loginbox p-5'>
                        <h4 className='text-muted'>Login to get started</h4>

                        <form  onSubmit={submit}>
                            
                            <label className='label1 text-muted'>Email</label><br />
                            <input onChange={handelchange} className='form-control' type="text" name="Email" id="" value={values.Email} placeholder='Email...' />
                            {errors.email ? <p >{errors.email}</p> :
                            <p> </p>}

                            <label className='text-muted'>Password</label><br />
                            <div className="password-container mb-3">
                            <input onChange={handelchange}   className='form-control'  type={ShowPassword ? 'text': 'password'} placeholder="Password..." autoComplete='off' name='Password' id="password" value={values.Password} />
                            {ShowPassword ?
                            <i className="fa-solid fa-eye eye" onClick={handelshowpassword}></i>:<i className="fa-solid fa-eye-slash eye"  onClick={handelshowpassword}></i>}
                            </div>
                            {errors.password ? <p >{errors.password}</p> :
                            <p> </p>} <a href="#">Forget Password?</a>
                             
                            <div className='d-sm-none d-block Invaliddd'>
                            {Matcherrors ? <h4 className='in'>Invalid Credintials</h4> :
                            <h4 className='in'></h4>}
                            </div>
                            <button className='btn btn-sm p-2 pl-5 pr-5 text-white' >Login</button>
                         </form>
                    </div>     
                </div>
                <div className='d-sm-block d-none'>
                {Matcherrors ? <h4 className='in'>Invalid Credintials</h4> :
                <h4 className='in'></h4>}
                </div>
                

            </div>
            
            
        </>
    )
    
    
}
 export default Home;
