// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const AllMembers = (props) => {
    // Creating states.
    const [response, setResponse] = useState(null);

    // Creating history.
    const history = useHistory(null);

    // Creating Location Variable.
    const location = useLocation()

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Printing toastr message.
        if (location.message) {
            // eslint-disable-next-line no-undef
            toastr.success(location.message);

            // Setting null to message.
            location.message = null;
        }

        // Getting All Members data.
        const getMembers = async () => {
            // Calling get all members api.
            let apiResponse = await axios({
                url: BASEURL + "member/get-all-members",
                method: "post",
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setResponse(apiResponse.data.data);
            } else {
                // If apiResponse.data.data is empty.
                if(apiResponse.data.data.length === 0){
                    // eslint-disable-next-line no-undef
                    toastr.error(apiResponse.data.message);
                }
    
                else{                
                    // Displaying all errors response.
                    for(var key in apiResponse.data.data){
                        // eslint-disable-next-line no-undef
                        toastr.error(apiResponse.data.data[key]);
                    }
                }
            }
        }

        // Calling getMembers function.
        getMembers();
    }, []);

    return (
        <React.Fragment>
            { /*  Wrapper Start  */}
            <div className="wrapper">

                {/* SIDEBAR START */}
                <Sidebar active={props.active} />
                {/*  SIDEBAR END */}

                <div id="content-page" className="content-page">

                    {/* TOP NAVBAR START */}
                    <Navbar />
                    {/* TOP NAVBAR  END  */}

                    {/* MAIN CONTENT START */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="iq-card">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb iq-bg-primary mb-0">
                                            <li className="breadcrumb-item"><a href="#"><i className="ri-home-4-line mr-1 float-left"></i>Dashboard</a></li>
                                            <li className="breadcrumb-item"><a href="#">Member Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">All Members</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">All Members</h4>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                            <NavLink to="add-member" className="btn btn-primary"><i className="ri-add-line mr-1 "></i>Add Member</NavLink>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Member ID | Name</th>
                                                        <th scope="col">Created Date & Time</th>
                                                        <th scope="col">Relation</th>
                                                        <th scope="col" className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        response ? response.members.map((member, index) => {
                                                           return <tr key={index}>
                                                                <td>
                                                                    <div className="training-block d-flex align-items-center">
                                                                        <div className="rounded-circle iq-card-icon iq-bg-primary">
                                                                            <img src={member.image} className="img-fluid" alt="icon" />
                                                                        </div>
                                                                        <div className="ml-3">
                                                                            <h5 className="">{member.unique_code} - {member.name}</h5>
                                                                            <p className="mb-0">{member.contact}</p>
                                                                            <p className="mb-0">{member.email}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{member.created_at}</td>
                                                                <td>{member.relation}</td>
                                                                <td className="text-center">
                                                                    <div className="iq-card-header-toolbar">
                                                                        <div className="dropdown show">
                                                                            <span className="dropdown-toggle text-primary" id="dropdownMenuButton50" data-toggle="dropdown" aria-expanded="true" role="button">
                                                                                <i className="ri-more-2-line"></i>
                                                                            </span>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <NavLink className="dropdown-item" to={"edit-member/" + member.id}><i className="ri-eye-line mr-2"></i>Edit</NavLink>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        })
                                                        : null
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* MAIN CONTENT END */}

                    {/* FOOTER START */}
                    <Footer />
                    {/* FOOTER END */}
                </div>
            </div>
            { /*  Wrapper END */}
        </React.Fragment>
    )
}

export default AllMembers;