// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const EditAddress = (props) => {
    // Creating states.
    const [editAddressResponse, setEditAddressResponse] = useState(null);
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

    // Creating params.
    const { id } = useParams();

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Getting address data by id.
        const getAddressById = async () => {
            // Calling get address by id api.
            let apiResponse = await axios({
                url: BASEURL + "address/get-address-by-id",
                method: "post",
                data: { id: id },
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setAddress(apiResponse.data.data.address);
                setHouse(apiResponse.data.data.house);
                setPincode(apiResponse.data.data.pincode);
                setLocality(apiResponse.data.data.locality);
                setLandmark(apiResponse.data.data.landmark);
                setCity(apiResponse.data.data.city);
                setState(apiResponse.data.data.state);
                setType(apiResponse.data.data.type);
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
        // Calling getAddressById function.
        getAddressById();
    }, []);

    // Creating edit address function
    const editAddress = async (e) => {
        // Preventing from submitting the form.
        e.preventDefault();

        // Creating postData variable for sending post request data.
        let postData = {};

        // Storing postData.
        postData["id"] = id;
        postData["address"] = address;
        postData["house"] = house;
        postData["pincode"] = pincode;
        postData["locality"] = locality;
        postData["landmark"] = landmark;
        postData["city"] = city;
        postData["state"] = state;
        postData["type"] = type;
        
        // Calling edit address by id api.
        let apiResponse = await axios({
            url: BASEURL + "address/edit-address-by-id",
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") },
            data : postData
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {            
            // Redirecting to the all addresses.
            history.push({pathname : "/all-addresses", "message" : apiResponse.data.message});
        } else {
            // Setting response.
            setEditAddressResponse(apiResponse.data.data);
            
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
                                            <li className="breadcrumb-item"><a href="#">Address Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Update Address Details</li>
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
                                            <h4 className="card-title">Update Address Details Here...</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="new-user-info">
                                            <form>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="address">Name:</label>
                                                        <input type="text" className="form-control" id="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} value={address} />
                                                        {
                                                            editAddressResponse ? editAddressResponse.address
                                                                ? <i className="text-danger">{editAddressResponse.address}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="house">House:</label>
                                                        <input type="text" className="form-control" id="house" placeholder="House" onChange={(e) => setHouse(e.target.value)} value={house} />
                                                        {
                                                            editAddressResponse ? editAddressResponse.house
                                                                ? <i className="text-danger">{editAddressResponse.house}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="locality">Locality:</label>
                                                        <input type="text" className="form-control" id="locality" placeholder="Locality" onChange={(e) => setLocality(e.target.value)} value={locality} />
                                                        {
                                                            editAddressResponse ? editAddressResponse.locality
                                                                ? <i className="text-danger">{editAddressResponse.locality}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="landmark">Landmark:</label>
                                                        <input type="text" className="form-control" id="landmark" placeholder="Landmark" onChange={(e) => setLandmark(e.target.value)} value={landmark} />
                                                        {
                                                            editAddressResponse ? editAddressResponse.landmark
                                                                ? <i className="text-danger">{editAddressResponse.landmark}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="city">City:</label>
                                                        <input type="text" className="form-control" id="city" placeholder="City" onChange={(e) => setCity(e.target.value)} value={city} />
                                                        {
                                                            editAddressResponse ? editAddressResponse.city
                                                                ? <i className="text-danger">{editAddressResponse.city}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="State">State:</label>
                                                        <input type="text" className="form-control" id="State" placeholder="State" onChange={(e) => setState(e.target.value)} value={state} />
                                                        {
                                                            editAddressResponse ? editAddressResponse.state
                                                                ? <i className="text-danger">{editAddressResponse.state}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col">
                                                        <label htmlFor="pincode">Pincode:</label>
                                                        <input type="text" className="form-control" id="pincode" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} value={pincode} />
                                                        {
                                                            editAddressResponse ? editAddressResponse.pincode
                                                                ? <i className="text-danger">{editAddressResponse.pincode}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className="form-group col">
                                                        <label htmlFor="address-type">Type:</label>
                                                        <select type="text" className="form-control" id="address-type" name="type" onChange={(e) => setType(e.target.value)} value={type}>
                                                            <option value="select">Select Address Type</option>
                                                            <option value="home">Home</option>
                                                            <option value="office">Office</option>
                                                        </select>
                                                        {
                                                            editAddressResponse ? editAddressResponse.type
                                                                ? <i className="text-danger">{editAddressResponse.type}</i>
                                                                : ""
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group text-right col-md-12">
                                                        <button onClick={editAddress} type="submit" className="btn btn-primary">Submit</button>
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

export default EditAddress;