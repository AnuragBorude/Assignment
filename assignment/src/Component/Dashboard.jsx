import React, { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import Chart from "react-apexcharts"
import axios from "axios"
import "./Css/Dashboardstyle.css";
import { useNavigate } from 'react-router-dom';


function Dashboard()
{
    var nav=useNavigate()
    const [swiperRef, setSwiperRef] = useState(null);
    
    // DATE
    // const current = new Date();
    // const date = `${current.getFullYear()}-${checkNum(current.getMonth()+1)}-${checkNum(current.getDate())}`;
    // console.log(date)

    const[data,setdata]=useState();


    const[Totallen, setTotallen]=useState()
    const[Closedlen, setClosedlen]=useState()
    const[Runninglen, setRunninglen]=useState()
    const[Cancellen, setCancellen]=useState()
    const[Closurelen, setClosurelen]=useState()


    const[STRTOTAL, setSTRTOTAL]=useState()
    const[STRCLOSE, setSTRCLOSE]=useState()
    const[STRPER, setSTRPER]=useState()

    const[FINTOTAL, setFINTOTAL]=useState()
    const[FINCLOSE, setFINCLOSE]=useState()
    const[FINPER, setFINPER]=useState()

    const[QLTTOTAL, setQLTTOTAL]=useState()
    const[QLTCLOSE, setQLTCLOSE]=useState()
    const[QLTPER, setQLTPER]=useState()

    const[MANTOTAL, setMANTOTAL]=useState()
    const[MANCLOSE, setMANCLOSE]=useState()
    const[MANPER, setMANPER]=useState()


    
    // Load Data
    useEffect(()=>
    {
            loaduser();
    
    },[])
    const loaduser=async () =>{
        var DATA= await axios.get(`http://127.0.0.1:8000/dashboard/`)
        
        // console.log("closure",DATA.data);
        // var rrrr=DATA.data.close
        // console.log("ccccccccccccccccllllllllllllllllllloooooooooooooooooosssssssssssssssssssssseeeeeeeeeeeeeeeeeeee",rrrr)
        // var av=(Closure.data.records);
        // setClosurelen(av)
 

        setTotallen(DATA.data.Total)
        setClosedlen(DATA.data.close)
        setRunninglen(DATA.data.Running)
        setCancellen(DATA.data.cancel)
        setClosurelen(DATA.data.Closure)

        
        setSTRTOTAL(DATA.data.StrTot)
        setSTRCLOSE(DATA.data.StrClo)
        setSTRPER(DATA.data.Strper)

        setFINTOTAL(DATA.data.FinTot)
        setFINCLOSE(DATA.data.FinClo)
        setFINPER(DATA.data.Finper)

        setQLTTOTAL(DATA.data.QuaTot)
        setQLTCLOSE(DATA.data.QuaClo)
        setQLTPER(DATA.data.Qltper)

        setMANTOTAL(DATA.data.MainTot)
        setMANCLOSE(DATA.data.MainClo)
        setMANPER(DATA.data.Manper)
  
       
    }
    const redirect=() =>{
        localStorage.setItem("login","");

    }
    // Card
   var str=STRPER+"% STR"
   var fin=FINPER+"% FIN"
   var qlt=QLTPER+"% QLT"
   var man=MANPER+"% MAN"
    return(
        <>
        <section>
             <div className="section">
                <div className="side shadow m-0 ">
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
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-lg-3 col-4 ">
                                            <h2>Dashboard</h2>
                                        </div>
                                        <div className="col-lg-8 col-6 ">
                                            <img className="imglogo" src="loginLogo.svg" alt="" />  
                                            <div className='circ'></div> 
                                        </div>
                                        <div className="col-lg-1 col-2 ">
                                            <NavLink className="logoutbtn" to="/" onClick={redirect}><i className="fa fa-arrow-right-from-bracket "></i></NavLink>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="card d-sm-block d-none  ">
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Total Projects</h6>
                            <h1>{Totallen}</h1>
                        </div>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Closed</h6>
                            <h1>{Closedlen}</h1>
                        </div>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Running</h6>
                            <h1>{Runninglen}</h1>
                        </div>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Closure Delay</h6>
                            <h1>{Closurelen}</h1>
                        </div>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Cancelled</h6>
                            <h1>{Cancellen}</h1>
                        </div>
                    </div>
                    <div className="card d-sm-none d-block pt-4 ">
                        <div style={{overflow:"scroll",width:"1000px"}}>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Total Projects</h6>
                            <h1>{Totallen}</h1>
                        </div>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Closed</h6>
                            <h1>{Closedlen}</h1>
                        </div>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Running</h6>
                            <h1>{Runninglen}</h1>
                        </div>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Closure Delay</h6>
                            <h1>{Closurelen}</h1>
                        </div>
                        <div className="shadow box1 p-2 pl-4" >
                            <h6 className="text-muted">Cancelled</h6>
                            <h1>{Cancellen}</h1>
                        </div>
                        </div>
                        
                    </div>
                    
        
                    <br></br>
                   
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-12 mt-3 ">
                                <h4 className="depatment">Department Wise - Total vs Closed</h4>
                            </div>

                            <div className="col-lg-5 col-12 mt-1 ">
                                <div className=" graph">
                                    <Chart type="bar" height="400px" width="100%"
                                     series={
                                        [{
                                            name:"Total",
                                            data: [STRTOTAL,FINTOTAL,QLTTOTAL,MANTOTAL]
                                          }, 
                                          {
                                            name:"Closed",
                                            data: [STRCLOSE,FINCLOSE,QLTCLOSE,MANCLOSE]
                                          }
                                        ]
                                     }
                                     options={{
                                        plotOptions: {
                                            bar: {
                                              
                                              dataLabels: {
                                                position: 'top',
                                              },
                                            }
                                          },
                                          dataLabels: {
                                            offsetX: -6,
                                            style: {
                                              fontSize: '12px',
                                              colors: ['#fff']
                                            }
                                          },
                                          stroke: {
                                            show: true,
                                            width: 1,
                                            colors: ['#fff']
                                          },
                                          
                                          xaxis: {
                                            categories: [str, fin, qlt, man],
                                          },
                                     }}
                                     
                                    ></Chart>
                                </div> 
                            </div>
                        </div>    
                    </div> 
                </div>
             </div>
        </section>
        </>
    )
}
 export default Dashboard
 