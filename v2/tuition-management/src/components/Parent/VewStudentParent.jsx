import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Apiurl from '../Apiurl';
import Sidebar from './Sidebar';
import Dashhead from './Dashhead';
import { Link } from 'react-router-dom';
import User from '../User';
import { useCookies } from 'react-cookie';


const ViewStudentParent = () => {
    const [students, setStudents] = useState([]);

    const [cookies, setCookie] = useCookies(['user']);

    const getstu = async(e) =>{
        console.log(cookies.id);
        const id = cookies.email;
        try {
            const response = await axios.get(`${Apiurl}/getparentstu/${id}`);
            setStudents(response.data);
            
            
        } catch (error) {
            console.log("error in getting data")
        }

    }

    useEffect(()=>{
        getstu();
    },[])


    return (
        <section>
            {/* <!-- Dashboard --> */}
            <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">

                <Sidebar />


                {/* <!-- Main content --> */}
                <div class="h-screen flex-grow-1 overflow-y-lg-auto">

                    {/* <!-- Header --> */}
                    <Dashhead />

                    {/* <!-- Main --> */}
                    <main class="py-6 bg-surface-secondary">
                        <div class="container-fluid">
                            <div className="row mb-3 mt-3">
                                <h1>Student Data</h1>
                                <div className="col-sm-12 mb-5 mt-3">
                                <a class="nav-link" href="/notice">
                                <button type="button" class="btn btn-success">Notices</button> 
                                </a>
                                    
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Full Name</th>
                                                    <th>Name with Inniti</th>
                                                    <th>Address</th>
                                                    <th>DOB</th>
                                                    <th>Gender</th>
                                                    <th>NIC</th>
                                                    <th>Payment</th>
                                                    <th>Attendence</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {students.map((stu) =>
                                                <tr>
                                                    <td>{stu.sfullname}</td>
                                                    <td>{stu.snamewithini}</td>
                                                    <td>{stu.saddress}</td>
                                                    <td>{stu.dob}</td>
                                                    <td>{stu.sgender}</td>
                                                    <td>{stu.snic}</td>
                                                    <td><Link to={`/paymentp/${stu.id}`} className='btn btn-info'>Pament</Link></td>
                                                    <td><Link to={`/pattendece/${stu.id}`} className='btn btn-info'>Attendence</Link></td>
                                                </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>


            </div>
        </section>
    )
}


export default ViewStudentParent;