// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const AddMember = (props) => {
    // Creating states.
    const [relationResponse, setRelationResponse] = useState(null);
    const [addMemberResponse, setAddMemberResponse] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState(null);
    const [relation, setRelation] = useState(null);

    // Creating history.
    const history = useHistory(null);

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Getting All Family Relations data.
        const getFamilyRelations = async () => {
            // Calling get all family relations api.
            let apiResponse = await axios({
                url: BASEURL + "member/get-all-family-relations",
                method: "post",
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setRelationResponse(apiResponse.data.data);
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

        // Calling getFamilyRelations function.
        getFamilyRelations();
    }, []);

    // Creating add member function
    const addMember = async (e) => {
        // Preventing from submitting the form.
        e.preventDefault();

        // Creating postData variable for sending post request data.
        let postData = {};

        // Storing postData.
        postData["name"] = name;
        postData["email"] = email;
        postData["contact"] = contact;
        postData["dob"] = dob;
        postData["gender"] = gender;
        postData["relation"] = relation;
        
        // Calling add member api.
        let apiResponse = await axios({
            url: BASEURL + "member/add",
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") },
            data : postData
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {            
            // Redirecting to the all members.
            history.push({pathname : "/all-members", "message" : apiResponse.data.message});
        } else {
            // Setting response.
            setAddMemberResponse(apiResponse.data.data);
            
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
                                            <li className="breadcrumb-item"><a href="#">Member Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Add New Member</li>
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
                                            <h4 className="card-title">Add New Member Details Here...</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="new-user-info">
                                            <form>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="name">Name:</label>
                                                        <input type="text" className="form-control" id="name" name="name" onChange={(e) => setName(e.target.value)}  placeholder="Name" />
                                                        {
                                                            addMemberResponse ? addMemberResponse.name
                                                                ? <i className="text-danger">{addMemberResponse.name}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="email">Email:</label>
                                                        <input type="email" className="form-control" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                                        {
                                                            addMemberResponse ? addMemberResponse.email
                                                                ? <i className="text-danger">{addMemberResponse.email}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="contact">Contact:</label>
                                                        <input type="text" className="form-control" id="contact" name="contact" onChange={(e) => setContact(e.target.value)} placeholder="Contact" />
                                                        {
                                                            addMemberResponse ? addMemberResponse.contact
                                                                ? <i className="text-danger">{addMemberResponse.contact}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="dob">DOB:</label>
                                                        <input type="date" className="form-control" id="dob" name="dob" onChange={(e) => setDob(e.target.value)} />
                                                        {
                                                            addMemberResponse ? addMemberResponse.dob
                                                                ? <i className="text-danger">{addMemberResponse.dob}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="gender">Gender:</label>
                                                        <select type="text" className="form-control" id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
                                                            <option value="">Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                        {
                                                            addMemberResponse ? addMemberResponse.gender
                                                                ? <i className="text-danger">{addMemberResponse.gender}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="relation">Relation:</label>
                                                        <select type="text" className="form-control" id="relation" name="relation" onChange={(e) => setRelation(e.target.value)}>
                                                            <option value="">Select Relation</option>
                                                            {
                                                                relationResponse ? relationResponse.map((relation, index) => {
                                                                    return <option value={relation}>{relation}</option>;
                                                                })
                                                                : null
                                                            }
                                                        </select>
                                                        {
                                                            addMemberResponse ? addMemberResponse.relation
                                                                ? <i className="text-danger">{addMemberResponse.relation}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group text-right col-md-12">
                                                        <button onClick={addMember} type="submit" className="btn btn-primary">Submit</button>
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

export default AddMember;