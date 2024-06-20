import React, { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import axios from 'axios'

import "./Css/Dashboardstyle.css"

function ProductList(){

    const[data,setdata]=useState();
    const[datalen,setdatalen]=useState("");
    
    const[search,setsearch]=useState("")
    const[sortvalue,setsortvalue]=useState("");

    const[status,setstatus]=useState({
        "Status":"Running"
    });
    const[close,setclose]=useState({
        "Status":"Closed"
    });
    const[cancel,setcancel]=useState({
        "Status":"Cancelled"
    });



    // PAGINATION
    const[currentpage,setcurrentpage]=useState('1')
    const recordperpage =5
    const LastIndex=currentpage * recordperpage
    const FirstIndex=LastIndex - recordperpage
    const records=data?.slice(FirstIndex,LastIndex)

    const npage= Math.ceil(((datalen / recordperpage)))
    // console.log(recordperpage)
    // console.log(datalen)
    // console.log(npage)
    const numbers= [...Array(npage + 1).keys()].slice(1)



    // LOAD DATA
    useEffect(()=>{
        loaduser();
    },[])

    const loaduser=async() =>{
        var res= await axios.get(`http://127.0.0.1:8000/ProjectInfo/`)
        setdata(res.data)
        setdatalen(res.data.length)
        // console.log(res.data.length)
        // console.log(res.data)
    }



    // SORTING
    const sortoption=["ProjectName","Reason","Type","Division","Category","Priority","Dept","Location","Status","StartDate","EndDate"]

    const handelsort=async (e) =>{
        let val=e.target.value;
        setsortvalue(val)
       await axios.get(`http://127.0.0.1:8000/ProjectInfo/?ordering=${val}`)
        .then((response) =>{
            setdata(response.data)
            // Data is coming but it is not sorted
            
        })
        .catch((error)=> console.log(error))
    }
    //SEARCHING

    const handelsearch=async (e) =>{
        let val=e.target.value;
        setsearch(val)
       await axios.get(`http://127.0.0.1:8000/ProjectInfo/?search=${val}`)
        .then((response) =>{
            setdata(response.data)
            // Data is coming but it is not sorted
            
        })
        .catch((error)=> console.log(error))
    }

    // UPDATE
    // console.log(status)
    const startstatus=(e)=>{
        
        var val=e.target.value
        axios.patch(`http://127.0.0.1:8000/ProjectUpdate/${val}/`,status)
        .then(responce=>{
            
        })
        .catch(error=>{
        })
        window.location.reload(false)
    }

    const closestatus=(e)=>{
        
        var val=e.target.value
        axios.patch(`http://127.0.0.1:8000/ProjectUpdate/${val}/`,close)
        .then(responce=>{
        })
        .catch(error=>{
        })
        window.location.reload(false)

    }

    const cancelstatus=(e)=>{
        
        var val=e.target.value
        axios.patch(`http://127.0.0.1:8000/ProjectUpdate/${val}/`,cancel)
        
        .then(responce=>{
        })
        .catch(error=>{
        })
        window.location.reload(false)

    }
    
    const redirect=() =>{
        localStorage.setItem("login","");

    }

   
    return(
        <>
        <section>
             <div className="section">
                <div className="side shadow m-0 p-2">
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
                        <NavLink to="/" onClick={redirect}><i className="fa fa-arrow-right-from-bracket"></i></NavLink>
                    </div>
                </div>
                <div className="top m-0">
                    <div className="nav">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3 col-5 ">
                                    <NavLink to="/dashboard"><h2>Project Listing</h2></NavLink>
                                </div>
                                <div className="col-lg-8 col-5  ">
                                    <img className="imglogo" src="loginLogo.svg" alt="" />  
                                    <div className='circ'></div> 
                                </div>
                                <div className="col-lg-1 col-2 ">
                                    <NavLink className="logoutbtn" to="/" onClick={redirect}><i className="fa fa-arrow-right-from-bracket "></i></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainblock">
                        <div className="block3 bg-daner shadow-none">
                            <div className="container-fluid">
                                <div className="row p-4">
                                    <div className="col-12">
                                        <div className="row p-0 ">
                                        <div className="col-lg-6 col-12 d-sm-none d-block  sort  ">
                                                <label className="d-sm-inline d-none">Sort By:</label>
                                                <select className="sort1" onChange={handelsort} value={sortvalue}  style={{border:"none",textDecoration:"none",outline:"none",fontSize:"20px",marginLeft:"5px"}}>
                                                    {sortoption.map((item,index)=>(
                                                        <option value={item} key={index}>{item}</option> 
                                                    ))}         
                                                </select>
                                            </div>
                                            <div className="col-lg-6 search1 pl-0 col-12">
                                                <input className="search" type="text" name="" id="" placeholder="&#61442; Search" value={search}  style={{border:"none",textDecoration:"none",outline:"none",width:"310px",fontSize:"20px"}}
                                                onChange={handelsearch}/>
                                                <div className="searchborder" style={{borderTop:"1px solid gray",height:"5px",width:"310px"}}></div>
                                            </div>
                                            <div className="col-lg-6 col-12  d-sm-block d-none sort  ">
                                                <label className="d-sm-inline d-none">Sort By:</label>
                                                <select className="sort1" onChange={handelsort} value={sortvalue}  style={{border:"none",textDecoration:"none",outline:"none",fontSize:"20px",marginLeft:"5px"}}>
                                                    {sortoption.map((item,index)=>(
                                                        <option value={item} key={index}>{item}</option> 
                                                    ))}         
                                                </select>
                                            </div>
                                        </div>                                       
                                    </div>
                                    <div className="container-fluid  p-0">
                                        <div className="row pt-3">
                                                <div className="col-12  mt-0 d-sm-block d-none">
                                                    <table className="table ">
                                                        <thead>
                                                        <tr style={{background:'#EBF5FF'}}>
                                                            <th >Project Name</th>
                                                            <th>Reason</th>
                                                            <th>Type</th>
                                                            <th>Division</th>
                                                            <th>Category</th>
                                                            <th>Priority</th>
                                                            <th>Dept*</th>
                                                            <th>Location</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                        </tr> 
                                                        </thead>      
                                                        <tbody>                 
                                                        {
                                                            records?.map((item)=>{
                                                                return(
                                                            <tr >
                                                                <td >{item.ProjectName}<br></br>
                                                                    {item.StartDate} to <br /> {item.EndDate}
                                                                </td>
                                                                <td>{item.Reason}</td>
                                                                <td>{item.Type}</td>
                                                                <td>{item.Division}</td>
                                                                <td>{item.Category}</td>
                                                                <td>{item.Priority}</td>
                                                                <td>{item.Dept}</td>
                                                                <td>{item.Location}</td>
                                                                <td style={{color:"#2D4E6C",fontWeight:"bold",fontSize:"16px"}}>{item.Status}</td>
                                                                <td>
                                                                    <div className="row  pt-0 ">
                                                                        <div  className="col-4 p-0 text-right"><button onClick={startstatus} value={item.id} className="btn btn-primary pl-4 pr-4 " style={{borderRadius:"20px",background:"#025AAB"}}>Start</button></div>
                                                                        <div  className="col-4  p-0 text-center"><button onClick={closestatus} value={item.id} className="btn btn-outline-primary  pl-4 pr-4" style={{borderRadius:"20px"}}>close</button></div>
                                                                        <div  className="col-4  p-0 text-left"><button onClick={cancelstatus} value={item.id} className="btn btn-outline-primary  pl-4 pr-4" style={{borderRadius:"20px"}}>cancel</button></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-12   p-2 d-sm-none d-block">
                                                    <div className="row">
                                                        {
                                                            records?.map((item)=>{
                                                                return(
                                                                        <>
                                                                            <div className="col-12 card1 p-3 mt-4" style={{borderRadius:"10px"}}>
                                                                                <div className="row">
                                                                                    <div className="col-8 pl-4">
                                                                                        {item.ProjectName}<br></br>
                                                                                        {item.StartDate}  to  <br />{item.EndDate}
                                                                                    </div>
                                                                                    <div className="col-4 text-right pr-4">
                                                                                        {item.Status}
                                                                                    </div>
                                                                                    <div className="col-12 mt-3">
                                                                                        <span className="text-muted">Reason: </span>{item.Reason}
                                                                                    </div>
                                                                                    <div className="col-12 mt-1">
                                                                                        <span className="text-muted">Type: </span>{item.Type} <i className="fa-sharp fa-solid fa-circle text-muted ml-1" style={{fontSize:"6px"}}></i>  <span className="text-muted">Category: </span>{item.Category}
                                                                                    </div>
                                                                                    <div className="col-12 mt-1">
                                                                                        <span className="text-muted">Div: </span>{item.Division} <i className="fa-sharp fa-solid fa-circle text-muted ml-1" style={{fontSize:"6px"}}></i>  <span className="text-muted">Dept: </span>{item.Dept}
                                                                                    </div>
                                                                                    <div className="col-12 mt-1">
                                                                                        <span className="text-muted">Location: </span>{item.Location}
                                                                                    </div>
                                                                                    <div className="col-12 mt-1">
                                                                                        <span className="text-muted">Priority: </span>{item.Priority}
                                                                                    </div>
                                                                                        <div className="col-12 mt-1">
                                                                                        <div className="row  pt-0 ">
                                                                                            <div  className="col-4 p-0 text-right"><button onClick={startstatus} value={item.id} className="btn btn-primary pl-4 pr-4 " style={{borderRadius:"20px",background:"#025AAB"}}>Start</button></div>
                                                                                            <div  className="col-4  p-0 text-center"><button onClick={closestatus} value={item.id} className="btn btn-outline-primary  pl-4 pr-4" style={{borderRadius:"20px"}}>close</button></div>
                                                                                            <div  className="col-4  p-0 text-left"><button onClick={cancelstatus} value={item.id} className="btn btn-outline-primary  pl-4 pr-4" style={{borderRadius:"20px"}}>cancel</button></div>
                                                                                        </div>
                                                                                    </div>
                                                                                   
                                                                                </div>
                                                                            </div>

                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                    </div>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <nav className="d-flex justify-content-center" aria-label="Page navigation example">
                                                        <ul className="pagination">
                                                            <li className="page-item">
                                                            <button className="page-link"  onClick={prepage} aria-label="Previous">
                                                                <span aria-hidden="true">&laquo;</span>
                                                            </button>
                                                            </li>
                                                            {
                                                                numbers.map((item,index)=> (
                                                                    <li className={`page-item ${currentpage === item? 'active':''}`} key={index}>
                                                                        <a href="#" className="page-link" onClick={()=>changeCPage(item)} >{item}</a>
                                                                    </li>
                                                                ))
                                                            }
                                                            <li className="page-item">
                                                            <button className="page-link"   onClick={nextpage} aria-label="Next">
                                                                <span aria-hidden="true">&raquo;</span>
                                                            </button>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
        
        <script>

        </script>
        </>
    )

    function prepage(){
        if(currentpage !== 1){
            setcurrentpage(currentpage - 1)
        }
    }
    function changeCPage(id){
        setcurrentpage(id)       
    }
    function nextpage(){
        if(currentpage !== npage){
            setcurrentpage(currentpage + 1)
        }
    }
}
 export default ProductList
 