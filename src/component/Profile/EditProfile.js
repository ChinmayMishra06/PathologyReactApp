// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const EditProfile = (props) => {
    // Creating history.
    const history = useHistory(null);

    // Creating states.
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [editResponse, setEditResponse] = useState("");

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
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
                // Crating Js date using php date.
                let dob = new Date(Date.parse(apiResponse.data.data.dob));
                
                // Converting dob in Y-m-d format.
                dob = dob.getFullYear() + "-" + (((dob.getMonth() + 1) > 9) ? dob.getMonth() + 1 : "0" + (dob.getMonth() + 1)) + "-" + (dob.getDate() > 9 ? dob.getDate() : "0" + dob.getDate());
                
                // Setting profile info.
                setName(apiResponse.data.data.name);
                setEmail(apiResponse.data.data.email);
                setGender(apiResponse.data.data.gender);
                setDob(dob);

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

    // Creating verifyOtp function
    const editProfile = async (e) => {
        // Preventing from submitting the form.
        e.preventDefault();

        // Creating postData variable for sending post request data.
        let postData = {
            url : BASEURL + "profile/edit",
            method : "post",
            headers : { "AUTHTOKEN": localStorage.getItem("auth_token") },
            data : {
                name    : name,
                email   : email,
                gender  : gender,
                dob     : dob,
            },
        };

        // Calling verify otp api.
        let apiResponse = await axios(postData);

        // Setting api response.
        setEditResponse(apiResponse);

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // Redirecting to the dashboard.
            history.push("/profile")
        } else {
            // eslint-disable-next-line no-undef
            toastr.error(apiResponse.data.message);
        }
    }

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
                                            <li className="breadcrumb-item active" aria-current="page">Update Profile Details</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="iq-card">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">Update Your Profile Details Here...</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="new-user-info">
                                            <form>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="name">Name:</label>
                                                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                                        {
                                                            editResponse ? editResponse.data.data.name
                                                                ? <i className="text-danger">{editResponse.data.data.name}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="email">Email:</label>
                                                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                                        {
                                                            editResponse ? editResponse.data.data.email
                                                                ? <i className="text-danger">{editResponse.data.data.email}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="dob">DOB:</label>
                                                        <input type="date" className="form-control" onChange={(e) => setDob(e.target.value)} id="dob" name="dob" value={dob} />
                                                        {
                                                            editResponse ? editResponse.data.data.dob
                                                                ? <i className="text-danger">{editResponse.data.data.dob}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="gender">Gender:</label>
                                                        <select type="text" className="form-control" onChange={(e) => setGender(e.target.value)} id="gender" name="gender" value={gender}>
                                                            <option value="">Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                        {
                                                            editResponse ? editResponse.data.data.gender
                                                                ? <i className="text-danger">{editResponse.data.data.gender}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group text-right col-md-12">
                                                        <button onClick={editProfile} type="submit" className="btn btn-primary">Submit</button>
                                                        <button type="reset" className="btn iq-bg-danger">Cancel</button>
                                                    </div>
                                                </div>
                                            </form>
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

export default EditProfile;