import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import {  useNavigate } from "react-router-dom";

import "./Css/Dashboardstyle.css"
import axios from "axios";

function ProductAdd(){
        var nav=useNavigate()
        const [state,setState]=useState({
            ProjectName:'',
            Reason:'',
            Type:'',
            Division:'',
            Category:'',
            Priority:'',
            Dept:'',
            Location:'',
            Status:"Registered",
            StartDate:'',
            EndDate:'',
        })


        // ERROR
        const [error,seterror]=useState({
            ProjectNameerror:'',
           
        })
        const [error1,seterror1]=useState({
           
            StartDateerror:'',
            
        })
        const [error2,seterror2]=useState({
           
            EndDateerror:'',
        })
        const [error3,seterror3]=useState({
           
            compareDateerror:'',
        })
       
        const changehandel =(e)=>{
            setState({
                ...state,[e.target.name]:e.target.value
            })
        }
    // Input
   
    
    // Submit
    // submitform=async(event)=>{
    //     event.preventDefault();
    //     await axios.post('http://127.0.0.1:8000/Project/',state)
    //     // fetch('http://127.0.0.1:8000/post/',{
    //     //     method:'POST',
    //     //     headers:{
    //     //         Accept:'application/json',
    //     //         'Contaent-Type': 'application/json'
    //     //     },
    //     //     body:JSON.stringify(state)
    //     // })
    //     console.log(state)

    // }
    
    const submitform=async(event)=>{
        event.preventDefault();
        // alert('fdsadf')
        if(validate()){
            // alert('aaaaaaaaaaaa')

            axios.post('http://127.0.0.1:8000/ProjectInfo/',state)
            // console.log(state)
            nav('/productlist')

            
        }
               
    }
    const validate=()=>{
        let error=true;
        if(state.ProjectName == ''){
            error=false;
            // alert("redc")
            seterror({
                ProjectNameerror:"Project Theme Is Required"
            })
        }
        else{
            seterror({
                ProjectNameerror:"",
            })
        }

        if(state.StartDate == ''){
            error=false;
            seterror1({
                StartDateerror:"Start Date Is Required"
            })
        }
        else{
            seterror1({
                StartDateerror:"",
            })
        }

        if(state.EndDate == '' ){
            error=false;
            seterror2({
                EndDateerror:"End Date Is Required"
            })
        }
        else{
            seterror2({
                EndDateerror:"",
            })
        }
        const date1 = new Date(state.EndDate);
        const date2 = new Date(state.StartDate);
        if(date1 <= date2){
            error=false;
            seterror3({
                compareDateerror:"End Date Must Be Greater than Start Date"
            })
        }
        else{
            seterror3({
                compareDateerror:"",
            })
        }
        // alert(date1)
        // alert(date2)
        // alert(error3.compareDateerror)
        return error;
    }
    
    const redirect=() =>{
        localStorage.setItem("login","");

    }
  
    return(
        <>
        <section>
             <div className="section">
                <div className="side shadow m-0">
                    <div className="dashboar">
                    <NavLink to="/dashboard" ><i className="fa fa-gauge dash"></i></NavLink>
                    </div>
                    <div className="prodlist">
                        <NavLink to="/productlist" ><i className="fa-solid fa-bars"></i></NavLink>
                    </div>
                    <div className="prodadd">
                        <NavLink to="/productadd" ><i className="fa-solid fa-plus"></i></NavLink>
                    </div>
                    <div className="logout">
                        <NavLink to="/"  onClick={redirect}><i className="fa fa-arrow-right-from-bracket"></i></NavLink>
                    </div>
                </div>
                <div className="top m-0">
                    <div className="nav">
                        <div className="container-fluid">   
                            <div className="row">
                                <div className="col-lg-3 col-5">
                                    <NavLink to="/dashboard"><h2>Create Project</h2></NavLink>
                                </div>
                                <div className="col-lg-8 col-5">
                                    <img className="imglogo" src="loginLogo.svg" alt="" />  
                                    <div className='circ'></div> 
                                </div>
                                <div className="col-lg-1 col-2">
                                    <NavLink className="logoutbtn" to="/"  onClick={redirect}><i className="fa fa-arrow-right-from-bracket "></i></NavLink>
                                </div>
                            </div>
                        </div>   
                    </div>
                    <div className="mainblock">
                        <div className="block1 ">
                        <form className="form" onSubmit={submitform} > 
                            <div className="container-fluid pt-4 pl-3">
                                <div className="row ">
                                    <div className="col-lg-6 ">
                                        <textarea  onChange={changehandel} value={state.ProjectName} name="ProjectName"  className="form-control" placeholder="Enter Project Theme" style={{height:"70px",border:"2px solid black"}}></textarea>
                                        {error.ProjectNameerror ? <div style={{color:"Red"}}>
                                        {error.ProjectNameerror}
                                        </div>:" "}
                                        {/* <label className="text-danger mt-1">Project Theme Required</label> */}
                                    </div>
                                    {/* ////////////////////////////////////////// */}
                                    <div className="col-5 d-sm-block d-none text-right ">
                                        <button type="submit"   className="btn pl-4 pr-4 text-white" style={{borderRadius:"20px",background:"#025AAB"}}>Save Project</button>
                                    </div>
                                    <div className="col-1 select d-sm-block d-none">
                                        
                                        </div>
                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-1 text-muted">Reason</label><br></br>
                                        <select  onChange={changehandel} value={state.Reason}  name="Reason"  className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}>
                                            <option></option>
                                            <option>For Bussiness</option>
                                            <option>For Dealrship</option>
                                            <option>For Transport</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-1 text-muted">Types</label><br></br>
                                        <select  onChange={changehandel} value={state.Type} name="Type"  className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}>
                                            <option></option>
                                            <option>Internal</option>
                                            <option>External</option>
                                            <option>Vendor</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-1 text-muted">Division</label><br></br>
                                        <select  onChange={changehandel} value={state.Division} name="Division" className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}>
                                            <option></option>
                                            <option>Compressor</option>
                                            <option>Filter</option>
                                            <option>Pumps</option>
                                            <option>Glass</option>
                                            <option>WaterHeater</option>
                                        </select>
                                    </div>
                                    <div className="col-3 select d-sm-block d-none">
                                        
                                    </div>

                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-1 text-muted">Category</label><br></br>
                                        <select  onChange={changehandel} value={state.Category} name="Category" className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}>
                                            <option></option>
                                            <option>QualityA</option>
                                            <option>QualityB</option>
                                            <option>QualityC</option>
                                            <option>QualityD</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-1 text-muted">Priority</label><br></br>
                                        <select  onChange={changehandel} value={state.Priority}  name="Priority" className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}>
                                            <option></option>                                           
                                            <option>High</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-1 text-muted">Dept*</label><br></br>
                                        <select  onChange={changehandel} value={state.Dept} name="Dept" className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}>
                                            <option></option>                                           
                                            <option>Strategy</option>
                                            <option>Finace</option>
                                            <option>Quality</option>
                                            <option>Maintainence</option>
                                            <option>Store</option>
                                        </select>
                                    </div>
                                    <div className="col-3 select d-sm-block d-none">
                                        
                                    </div>

                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-1 text-muted">Start Date as Per Project Plan</label><br></br>
                                        <input onChange={changehandel} value={state.StartDate} name="StartDate" type="date" className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}/>
                                        {error1.StartDateerror ?<div style={{color:"Red"}}>
                                        {error1.StartDateerror}
                                        </div>:""}    
                                        {/* <label className="text-danger mt-1">Start Date required</label> */}

                                    </div>
                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-1 text-muted">End Date as Per Project Plan</label><br></br>
                                        <input onChange={changehandel} value={state.EndDate}  name="EndDate" type="date" className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}/>
                                        {error2.EndDateerror ?<div style={{color:"Red"}}>
                                        {error2.EndDateerror}
                                        </div>:""}
                                        {error3.compareDateerror ?<div style={{color:"Red"}}>
                                        {error3.compareDateerror}
                                        </div>:""}
                                        {/* <label className="text-danger mt-1">End Date required</label> */}
                                                                 
                                    </div>
                                    <div className="col-lg-3 select col-12 ">
                                        <label className=" text-muted mb-1">Location</label><br></br>
                                        <select  onChange={changehandel} value={state.Location}   name="Location" className="form-control" style={{height:"45px",borderRadius:"8px",padding:"10px",marginTop:"0px"}}>
                                            <option></option>
                                            <option>Pune</option>
                                            <option>Delhi</option>
                                            <option>Mumbai</option>
                                        </select>
                                    </div>
                                    <div className="col-3 select d-sm-block d-none">
                                        
                                    </div>

                                    <div className="col-3 select d-sm-block d-none">
                                        
                                    </div>
                                    <div className="col-3 select d-sm-block d-none">
                                        
                                    </div>
                                    <div className="col-lg-3 select col-12 ">
                                        <label className="mb-0 text-muted mr-1">Status: </label>
                                        <label className=" h5 ">Registered</label>
                                        
                                    </div>
                                    {/* //////////////////////////////////////////////// */}
                                    <div className="col-lg-3 col-12 d-sm-none d-block mt-5 pt-2  ">
                                        <button type="submit"  className="btn pl-4 pr-4 text-white form-control" style={{borderRadius:"20px",background:"#025AAB"}}>Save Project</button>
                                    </div>
                                </div>
                            </div>
                                
                            </form>
                        </div>
                    </div>

                </div>
             </div>
        </section>
        </>
    )
   
    
}
 export default ProductAdd
 