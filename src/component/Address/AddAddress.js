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

const AddAddress = (props) => {
    // Creating states.
    const [response, setResponse] = useState(null);
    const [address, setAddress] = useState(null);
    const [house, setHouse] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [locality, setLocality] = useState(null);
    const [landmark, setLandmark] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [type, setType] = useState(null);

    // Creating history.
    const history = useHistory(null);

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/");
        }
    }, []);

    // Creating add address function
    const addAddress = async (e) => {
        // Preventing from submitting the form.
        e.preventDefault();

        // Creating postData variable for sending post request data.
        let postData = {};

        // Storing postData.
        postData["address"] = address;
        postData["house"] = house;
        postData["pincode"] = pincode;
        postData["locality"] = locality;
        postData["landmark"] = landmark;
        postData["city"] = city;
        postData["state"] = state;
        postData["type"] = type;

        // Calling add address api.
        let apiResponse = await axios({
            url: BASEURL + "address/add",
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") },
            data: postData
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // Redirecting to the all addresss.
            history.push({pathname : "/all-addresses", "message" : apiResponse.data.message});
        } else {
            // Setting response.
            setResponse(apiResponse.data.data);

            // Displaying all errors response.
            for(var key in apiResponse.data.data){
                // eslint-disable-next-line no-undef
                toastr.error(apiResponse.data.data[key]);
            }
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
                                            <li className="breadcrumb-item active" aria-current="page">Add New Address</li>
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
                                                        <label htmlFor="address">Address:</label>
                                                        <input type="text" className="form-control" id="address" name="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                                                        {
                                                            response ? response.address
                                                                ? <i className="text-danger">{response.address}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="house">House:</label>
                                                        <input type="text" className="form-control" id="house" name="house" placeholder="House" onChange={(e) => setHouse(e.target.value)} />
                                                        {
                                                            response ? response.house
                                                                ? <i className="text-danger">{response.house}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="locality">Locality:</label>
                                                        <input type="text" className="form-control" id="locality" name="locality" placeholder="Locality" onChange={(e) => setLocality(e.target.value)} />
                                                        {
                                                            response ? response.locality
                                                                ? <i className="text-danger">{response.locality}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="landmark">Landmark:</label>
                                                        <input type="text" className="form-control" id="landmark" name="landmark" placeholder="Landmark" onChange={(e) => setLandmark(e.target.value)} />
                                                        {
                                                            response ? response.landmark
                                                                ? <i className="text-danger">{response.landmark}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="city">City:</label>
                                                        <input type="text" className="form-control" id="city" name="city" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                                                        {
                                                            response ? response.city
                                                                ? <i className="text-danger">{response.city}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="State">State:</label>
                                                        <input type="text" className="form-control" id="state" name="state" placeholder="State" onChange={(e) => setState(e.target.value)} />
                                                        {
                                                            response ? response.state
                                                                ? <i className="text-danger">{response.state}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="pincode">Pincode:</label>
                                                        <input type="text" className="form-control" id="pincode" name="pincode" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} />
                                                        {
                                                            response ? response.pincode
                                                                ? <i className="text-danger">{response.pincode}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="address-type">Type:</label>
                                                        <select type="text" className="form-control" id="address-type" name="type" onChange={(e) => setType(e.target.value)}>
                                                            <option value="select">Select Address Type</option>
                                                            <option value="home">Home</option>
                                                            <option value="office">Office</option>
                                                        </select>
                                                        {
                                                            response ? response.type
                                                                ? <i className="text-danger">{response.type}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group text-right col-md-12">
                                                        <button onClick={addAddress} type="submit" className="btn btn-primary">Submit</button>
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

export default AddAddress;