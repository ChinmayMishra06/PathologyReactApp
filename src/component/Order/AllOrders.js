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

const AllOrders = (props) => {
    // Creating states.
    const [orderResponse, setOrderResponse] = useState(null);
    const [memberResponse, setMemberResponse] = useState(null);
    const [memberId, setMemberId] = useState(null);

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

        // Getting all orders data.
        const getOrders = async () => {
            // Calling get all orders api.
            let apiResponse = await axios({
                url: BASEURL + "order/get-all-orders",
                data: { member_id: memberId },
                method: "post",
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setOrderResponse(apiResponse.data.data);
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

        // Calling getOrders function.
        getOrders();
    }, [memberId]);

    useEffect(() => {
        // Getting all members data.
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
                setMemberResponse(apiResponse.data.data);
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
                                            <li className="breadcrumb-item"><a href="#">Order Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">All Orders</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">Retrieve Orders For</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="new-user-info">
                                            <div className="row">
                                                <div className="form-group col">
                                                    <select onChange={(e) => { setMemberId(e.target.value); }} id="retireve-orders" name="retireve-orders" className="form-control" defaultValue={0}>
                                                        <option defaultValue="0">Self</option>
                                                        {
                                                            memberResponse ? memberResponse.members
                                                                ? memberResponse.members.map((member, index) => {
                                                                    return <option value={member.id}>{member.name}</option>
                                                                })
                                                                : null
                                                                : null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">All Orders</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-borderless text-nowrap data-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Order ID</th>
                                                        <th scope="col">Patient ID | Name</th>
                                                        <th scope="col">Placed Date & Time</th>
                                                        <th scope="col">Slot Date & Time</th>
                                                        <th scope="col">Test Name</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Pay Mode</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        orderResponse ? orderResponse.orders.map((order, index) => {
                                                            let testData = [];

                                                            for (let i = 0; i < order.tests.length; i++) {
                                                                testData[i] = order.tests[i].name;
                                                            }

                                                            if (order.member) {
                                                                return <tr key={index}>
                                                                    <td>{order.order.order_number}</td>
                                                                    <td>
                                                                        <div className="training-block d-flex align-items-center patient-member-details" data-toggle="modal" data-target="#patientdetails" order_number="{{ strtoupper($order->order_number) }}">
                                                                            <div className="rounded-circle iq-card-icon iq-bg-primary">
                                                                                <img src={order.member.image} className="rounded-circle avatar-50" alt="icon" />
                                                                            </div>
                                                                            <div className="ml-3">
                                                                                <h5 className="">{order.member.name}</h5>
                                                                                <p className="mb-0">{order.member.contact}</p>
                                                                                <p className="mb-0">{order.member.email}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>{order.order.created_at}</td>
                                                                    <td>{order.slot.slot_date} {order.slot.slot_time}</td>
                                                                    <td>{testData.toString()}</td>
                                                                    <td>₹{order.order.payable}</td>
                                                                    <td>{order.order.payment_mode}</td>
                                                                    <td>{order.order.order_status}</td>
                                                                    <td>
                                                                        <NavLink className="btn btn-primary assign-order" to={ "/track-my-order/" + order.order.order_number }><i className="ri-add-line"></i>Track My Order</NavLink>
                                                                    </td>
                                                                </tr>
                                                            }
                                                            return <tr key={index}>
                                                                <td>{order.order.order_number}</td>
                                                                <td>
                                                                    <div className="training-block d-flex align-items-center patient-member-details" data-toggle="modal" data-target="#patientdetails" order_number="{{ strtoupper($order->order_number) }}">
                                                                        <div className="rounded-circle iq-card-icon iq-bg-primary">
                                                                            <img src={order.patient.image} className="rounded-circle avatar-50" alt="icon" />
                                                                        </div>
                                                                        <div className="ml-3">
                                                                            <h5 className="">{order.patient.name}</h5>
                                                                            <p className="mb-0">{order.patient.contact}</p>
                                                                            <p className="mb-0">{order.patient.email}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{order.order.created_at}</td>
                                                                <td>{order.slot.slot_date} {order.slot.slot_time}</td>
                                                                <td>{testData.toString()}</td>
                                                                <td>₹{order.order.payable}</td>
                                                                <td>{order.order.payment_mode}</td>
                                                                <td>{order.order.order_status}</td>
                                                                <td>
                                                                    <NavLink className="btn btn-primary assign-order" to={ "/track-my-order/" + order.order.order_number }><i className="ri-add-line"></i>Track My Order</NavLink>
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
        </React.Fragment >
    )
}

export default AllOrders;