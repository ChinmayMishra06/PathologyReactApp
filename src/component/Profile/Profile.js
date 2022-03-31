// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Profile = (props) => {
    // Creating history.
    const history = useHistory(null);

    // Creating user info variable.
    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token") || (localStorage.getItem("auth_token") === "")) {
            history.push("/")
        }

        // Getting profile data.
        const getProfile = async () => {
            // Calling verify otp api.
            let apiResponse = await axios({
                url : BASEURL + "profile/get",
                method : "post",
                headers : { "AUTHTOKEN" : localStorage.getItem("auth_token")}
            });
    
            // On success response returned.
            if(apiResponse.data.status === "success"){
                // Setting user info.
                setUserInfo(apiResponse.data.data);
            } else{
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

        // Calling getProfile function.
        getProfile();
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
                                            <li className="breadcrumb-item"><a href="#">Profile Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">View Profile Details</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="rounded text-center">
                                                <div className="donter-profile">
                                                    <img src={userInfo.image} className="img-fluid rounded-circle" id="patient_member_image_pd" alt="user-img" />
                                                </div>
                                            </div>
                                            <div className="doctor-description mt-3">
                                                <table className="table mb-0">
                                                    <tbody>
                                                        <tr>
                                                            <th>Name :</th>
                                                            <td id="patient_member_name_unique_code_pd">{ userInfo.name }</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Contact No :</th>
                                                            <td id="patient_member_contact_pd">{ userInfo.contact }</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Email ID :</th>
                                                            <td id="patient_member_email_pd">{ userInfo.email }</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Unique Code :</th>
                                                            <td id="patient_member_address_pd">{ userInfo.unique_code }</td>
                                                        </tr>
                                                        <tr>
                                                            <th>DOB :</th>
                                                            <td id="patient_member_dob_pd">{ userInfo.dob }</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Gender :</th>
                                                            <td id="patient_member_gender_pd">{ userInfo.gender }</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Registration Date & Time :</th>
                                                            <td id="patient_member_created_pd">{ userInfo.created_at }</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Registration Status :</th>
                                                            <td id="patient_member_order_status_pd">{ userInfo.registration_status }</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
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

export default Profile;