// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Cart = (props) => {
    // Creating states.
    const [cartResponse, setCartResponse] = useState(null);
    const [removeResponse, setRemoveResponse] = useState(null);
    const [memberResponse, setMemberResponse] = useState(null);
    const [memberId, setMemberId] = useState(null);

    // Creating history.
    const history = useHistory(null);

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Getting cart data.
        const getCartDetails = async () => {
            // Calling get cart details api.
            let apiResponse = await axios({
                url: BASEURL + "cart/get-cart-details",
                data: { member_id: memberId },
                method: "post",
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setCartResponse(apiResponse.data.data);
            } else {
                // Displaying all errors response.
                // eslint-disable-next-line no-undef
                toastr.error(apiResponse.data.message);
            }
        }

        // Calling getCartDetails function.
        getCartDetails();
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

    // Get create order.
    const createOrder = async () => {
        // Calling create order api.
        let apiResponse = await axios({
            url: BASEURL + "order/create-order",
            // data: { search_keyword: searchKeyword },
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // Setting response.
            // setTestResponse(apiResponse.data.data);
        } else {
            // eslint-disable-next-line no-undef
            toastr.error(apiResponse.data.message);
        }
    }

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
                                            <li className="breadcrumb-item"><a href="#">Cart Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Cart Details</li>
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
                                            <h4 className="card-title">Cart Details</h4>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <NavLink className="btn btn-primary pull-right assign-test" to="slot"><i className="ri-add-line"></i>Book Slot</NavLink>
                                                <NavLink className="btn btn-primary assign-test pull-right mr-2" to="all-tests"><i className="ri-add-line"></i>Add More Tests</NavLink>
                                            </div>
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
                                                        cartResponse ? cartResponse.tests ? cartResponse.tests.map((cart, index) => {
                                                            return <tr key={cart.id}>
                                                                <td>{cart.id}</td>
                                                                <td>{cart.test_id}</td>
                                                                <td>{cart.test}</td>
                                                                <td>₹ {cart.price}</td>
                                                                <td>{cart.parameters_covered}</td>
                                                                <td>
                                                                    <NavLink className="btn btn-primary assign-test" to={"test-parameters/" + cart.test_id}><i className="ri-add-line"></i>Get Parameters</NavLink>
                                                                    <button className="btn btn-primary ml-2 assign-test" data-id={cart.id} onClick={
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

export default Cart;