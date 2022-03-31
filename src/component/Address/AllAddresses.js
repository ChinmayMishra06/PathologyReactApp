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

const AllAddresses = (props) => {
    // Creating states.
    const [response, setResponse] = useState(null);
    const [primaryResponse, setPrimaryResponse] = useState(null);
    const [addressId, setAddressId] = useState(null);
    const [memberId, setMemberId] = useState(null);

    // Creating history.
    const history = useHistory(null);

    // Creating Location Variable.
    const location = useLocation()

    // Creating make primary address function
    const makePrimaryAddress = async (id) => {
        // Creating postData variable for sending post request data.
        let postData = {};

        // Storing postData.
        postData["id"] = id;

        // Calling edit address by id api.
        let apiResponse = await axios({
            url: BASEURL + "address/make-primary-address-by-id",
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") },
            data: postData
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // Setting response.
            setPrimaryResponse(apiResponse.data.data);

            // eslint-disable-next-line no-undef
            toastr.success(apiResponse.data.message);
        } else {
            // Displaying all errors response.
            for(var key in apiResponse.data.data){
                // eslint-disable-next-line no-undef
                toastr.error(apiResponse.data.data[key]);
            }
        }
    }

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

        // Getting All Addresses data.
        const getAddresses = async () => {
            // Calling get all addresses api.
            let apiResponse = await axios({
                url: BASEURL + "address/get-all-addresses",
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

        // Calling getAddresses function.
        getAddresses();
    }, [primaryResponse]);

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
                                            <li className="breadcrumb-item active" aria-current="page">Addresses</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">All Addresses</h4>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                            <NavLink to={{ pathname : "/review-my-order", address_id : addressId, "member_id" : memberId}} className="btn btn-primary mr-2"><i className="ri-add-line mr-1 "></i>Review My Order</NavLink>
                                            <NavLink to="add-address" className="btn btn-primary"><i className="ri-add-line mr-1 "></i>Add Address</NavLink>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Choose</th>
                                                        <th scope="col">Address</th>
                                                        <th scope="col">House</th>
                                                        <th scope="col">Pincode</th>
                                                        <th scope="col">Locality</th>
                                                        <th scope="col">Landmark</th>
                                                        <th scope="col">City</th>
                                                        <th scope="col">State</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Primary</th>
                                                        <th scope="col">Created</th>
                                                        <th scope="col" className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        response ? response.addresses.map((address, index) => {
                                                            return <tr key={address.id}>
                                                                <td><input type="radio" address_id={address.id} id={"address_id" + address.id} name="address_id" onClick={(e) => {setAddressId(e.target.getAttribute("address_id"))}} /></td>
                                                                <td>{address.address}</td>
                                                                <td>{address.house}</td>
                                                                <td>{address.pincode}</td>
                                                                <td>{address.landmark}</td>
                                                                <td>{address.locality}</td>
                                                                <td>{address.city}</td>
                                                                <td>{address.state}</td>
                                                                <td>{address.type}</td>
                                                                <td>{address.is_primary}</td>
                                                                <td>{address.created_at}</td>
                                                                <td className="text-center">
                                                                    <div className="iq-card-header-toolbar">
                                                                        <div className="dropdown show">
                                                                            <span className="dropdown-toggle text-primary" id="dropdownMenuButton50" data-toggle="dropdown" aria-expanded="true" role="button">
                                                                                <i className="ri-more-2-line"></i>
                                                                            </span>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <NavLink className="dropdown-item" to={"edit-address/" + address.id}><i className="ri-eye-line mr-2"></i>Edit</NavLink>
                                                                                <button className="dropdown-item" data-id={address.id} onClick={(e) => makePrimaryAddress(e.target.getAttribute("data-id"))}><i className="ri-eye-line mr-2"></i>Make Primary</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>;
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

export default AllAddresses;