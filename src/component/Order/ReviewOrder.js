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

const ReviewOrder = (props) => {
    // Creating states.
    const [reviewOrderResponse, setReviewOrderResponse] = useState(null);
    const [removeResponse, setRemoveResponse] = useState(null);
    const [paymentMode, setPaymentMode] = useState(null);
    const [extraInstruction, setExtraInstruction] = useState(null);
    const [memberId, setMemberId] = useState(null);
    const [memberResponse, setMemberResponse] = useState(null);
    const location = useLocation(null);

    // Creating history.
    const history = useHistory(null);

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Redirecting if address_id is null.
        if ((location.address_id === undefined) || (location.address_id === null)) {
            history.push("/all-addresses");
        }

        // Getting reviewMyOrder data.
        const reviewMyOrder = async () => {
            // Calling reviewMyOrder api.
            let apiResponse = await axios({
                url: BASEURL + "cart/review-my-order",
                data: {
                    address_id: location.address_id,
                    member_id: memberId,
                },
                method: "post",
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setReviewOrderResponse(apiResponse.data.data);
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

        // Calling reviewMyOrder function.
        reviewMyOrder();
    }, [removeResponse, memberId]);

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

    // Remove from cart.
    const removeFromCart = async (cartTestId) => {
        // Calling remove test from cart api.
        let apiResponse = await axios({
            url: BASEURL + "cart/remove-test-from-cart",
            data: { cart_test_id: cartTestId },
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // eslint-disable-next-line no-undef
            toastr.success(apiResponse.data.message);

            // Setting response.
            setRemoveResponse(apiResponse.data.data);
        } else {
            // eslint-disable-next-line no-undef
            toastr.error(apiResponse.data.message);
        }
    }

    // Get create order.
    const createOrder = async () => {
        // Calling create order api.
        let apiResponse = await axios({
            url: BASEURL + "order/create",
            data: {
                address_id: location.address_id,
                member_id: memberId,
                payment_mode: paymentMode,
                instruction: extraInstruction,
            },
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // Redirecting to order.
            history.push({pathname : "/all-orders", message : apiResponse.data.message});
        } else {
            // If apiResponse.data.data is empty.
            if(apiResponse.data.data.length === 0){
                // eslint-disable-next-line no-undef
                toastr.error(apiResponse.data.message);
            }

            else{
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
                                            <li className="breadcrumb-item"><a href="#">Order Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Review Order Details</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">Retrieve Order Details For</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="new-user-info">
                                            <div className="row">
                                                <div className="form-group col">
                                                    <select onChange={(e) => { setMemberId(e.target.value); }} id="retireve-orders" name="retireve-orders" className="form-control" defaultValue={0}>
                                                        <option disabled>Select Member</option>
                                                        <option value="0">Self</option>
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
                                            <h4 className="card-title">Review Order Details</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-borderless text-nowrap data-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Cart ID</th>
                                                        <th scope="col">Test ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Tests Covered</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        reviewOrderResponse ? reviewOrderResponse.tests ? reviewOrderResponse.tests.map((reviewOrder, index) => {
                                                            return <tr key={reviewOrder.cart_id}>
                                                                <td>{reviewOrder.cart_id}</td>
                                                                <td>{reviewOrder.test_id}</td>
                                                                <td>{reviewOrder.test}</td>
                                                                <td>₹ {reviewOrder.price}</td>
                                                                <td>{reviewOrder.parameters_covered}</td>
                                                                <td>
                                                                    <NavLink className="btn btn-primary assign-test" to={"test-parameters/" + reviewOrder.test_id}><i className="ri-add-line"></i>Get Parameters</NavLink>
                                                                    <button className="btn btn-primary ml-2 assign-test" data-id={reviewOrder.cart_id} onClick={
                                                                        (e) => {
                                                                            removeFromCart(e.target.getAttribute("data-id"));
                                                                        }}><i className="ri-close-line"></i>Remove From Cart</button>
                                                                </td>
                                                            </tr>
                                                        })
                                                            : null
                                                            : null
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                        <hr /><h4 className="card-title">Other Details</h4><hr />
                                        <div className="row">
                                            <div class="col-md-8">
                                                <div className="table-responsive">
                                                    <table className="table mb-0 table-borderless text-nowrap data-table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Name</th>
                                                                <td scope="col">
                                                                    {
                                                                        reviewOrderResponse ? reviewOrderResponse.member ? reviewOrderResponse.member.name : reviewOrderResponse.patient.name : ""
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="col">Contact</th>
                                                                <td scope="col">
                                                                    {
                                                                        reviewOrderResponse ? reviewOrderResponse.member ? reviewOrderResponse.member.contact : reviewOrderResponse.patient.contact : ""
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="col">Email</th>
                                                                <td scope="col">
                                                                    {
                                                                        reviewOrderResponse ? reviewOrderResponse.member ? reviewOrderResponse.member.email : reviewOrderResponse.patient.email : ""
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="col">Slot</th>
                                                                <td scope="col">
                                                                    {
                                                                        reviewOrderResponse ? reviewOrderResponse.slot.slot_date + " " + reviewOrderResponse.slot.slot_time : ""
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="">Address</th>
                                                                <td scope="col">
                                                                    {
                                                                        reviewOrderResponse ?
                                                                            reviewOrderResponse.address.house + " " +
                                                                            reviewOrderResponse.address.address + " " +
                                                                            reviewOrderResponse.address.locality + " " +
                                                                            reviewOrderResponse.address.landmark + " " +
                                                                            reviewOrderResponse.address.city + " " +
                                                                            reviewOrderResponse.address.state + " " +
                                                                            reviewOrderResponse.address.type + " " +
                                                                            reviewOrderResponse.address.pincode
                                                                            : ""
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <table className="table mb-0 table-borderless text-nowrap data-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Collection Charges</th>
                                                            <td scope="col">
                                                                ₹ {
                                                                    reviewOrderResponse ? reviewOrderResponse.sample_collection_charge : ""
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col">Sub Total</th>
                                                            <td scope="col">
                                                                ₹ {
                                                                    reviewOrderResponse ? reviewOrderResponse.sub_total : ""
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col">Payable Total</th>
                                                            <td scope="col">
                                                                ₹ {
                                                                    reviewOrderResponse ? reviewOrderResponse.payable_total : ""
                                                                }

                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="">Payment Mode</th>
                                                            <td scope="col"></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="col">
                                                                <input type="radio" id="offline_payment_mode" name="payment_mode" onClick={(e) => { setPaymentMode(e.target.value); }} value="cash" />
                                                                <label htmlFor="offline_payment_mode"> Offline</label>
                                                            </td>
                                                            <td scope="col">
                                                                <input type="radio" id="online_payment_mode" name="payment_mode" onClick={(e) => { setPaymentMode(e.target.value); }} value="online" />
                                                                <label htmlFor="online_payment_mode"> Online</label>
                                                            </td>
                                                            <td scope="col">
                                                                <input type="radio" id="upi_payment_mode" name="payment_mode" onClick={(e) => { setPaymentMode(e.target.value); }} value="upi" />
                                                                <label htmlFor="upi_payment_mode"> UPI</label>
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-8">
                                                <input onChange={(e) => { setExtraInstruction(e.target.value); }} type="text" id="instruction" name="instruction" placeholder="Type here extra instructions..." className="form-control" onClick={(e) => { setPaymentMode(e.target.value); }} />
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-primary assign-test pull-right" onClick={createOrder}><i className="ri-add-line"></i>Create Order</button>
                                                <NavLink className="btn btn-primary assign-test pull-right mr-2" to="all-tests"><i className="ri-add-line"></i>Add More Tests</NavLink>
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
        </React.Fragment >
    )
}

export default ReviewOrder;