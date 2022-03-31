import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const AllTests = (props) => {
    // Creating states.
    const [testResponse, setTestResponse] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState(null);
    const [memberId, setMemberId] = useState(null);
    const [memberResponse, setMemberResponse] = useState(null);

    // Creating history.
    const history = useHistory(null);

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Getting All tests data.
        const getAllTests = async () => {
            // Calling get All Tests api.
            let apiResponse = await axios({
                url: BASEURL + "test/get-all-tests",
                method: "post",
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setTestResponse(apiResponse.data.data);
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

        // Calling getAllTests function.
        getAllTests();
    }, []);

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

    // Get tests by search keyword.
    const getTestBySearchKeyword = async () => {
        // Calling get tests by search keyword api.
        let apiResponse = await axios({
            url: BASEURL + "test/get-all-tests-by-search",
            data: { search_keyword: searchKeyword },
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // Setting response.
            setTestResponse(apiResponse.data.data);
        } else {
            // eslint-disable-next-line no-undef
            toastr.error(apiResponse.data.message);
        }
    }

    // Add to cart.
    const addToCart = async (testId) => {
        // Calling add test in cart api.
        let apiResponse = await axios({
            url: BASEURL + "cart/add-test-in-cart",
            data: {
                test_id: testId,
                member_id: memberId,
            },
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
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
                                            <li className="breadcrumb-item"><a href="#">Test Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">All Tests</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="iq-card">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">Add Test For</h4>
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
                            <div className="col-lg-6">
                                <div className="iq-card">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">Search Test</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="new-user-info">
                                            <div className="row">
                                                <div className="form-group col">
                                                    <input onChange={(e) => {
                                                        setSearchKeyword(e.target.value);
                                                        getTestBySearchKeyword(searchKeyword);
                                                    }} type="text" className="text search-input form-control" id="search_keyword" name="search_keyword" placeholder="Type here to search..." />
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
                                            <h4 className="card-title">All Tests</h4>
                                        </div>
                                        <NavLink className="btn btn-primary pull-right assign-test" to="cart"><i className="ri-add-line"></i>Proceed to Cart</NavLink>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-borderless text-nowrap data-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Department</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Color Code</th>
                                                        <th scope="col">Test Type</th>
                                                        <th scope="col">Report Type</th>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">Tests Covered</th>
                                                        <th scope="col">Remarks</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        testResponse ? testResponse.tests.map((test, index) => {
                                                            return <tr key={test.test_id}>
                                                                <td>{test.test_id}</td>
                                                                <td>{test.name}</td>
                                                                <td>{test.department}</td>
                                                                <td>₹ {test.price}</td>
                                                                <td>{test.color_code}</td>
                                                                <td>{test.test_type}</td>
                                                                <td>{test.report_type}</td>
                                                                <td>{test.billing_category}</td>
                                                                <td>{test.parameters_covered}</td>
                                                                <td>{test.remarks}</td>
                                                                <td>
                                                                    <NavLink target="_blank" className="btn btn-primary assign-test" to={"test-parameters/" + test.test_id}><i className="ri-add-line"></i>Get Parameters</NavLink>
                                                                    <button className="btn btn-primary ml-2 assign-test" data-id={test.test_id} onClick={
                                                                        (e) => {
                                                                            addToCart(e.target.getAttribute("data-id"));
                                                                        }}><i className="ri-add-line"></i>Add To Cart</button>
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

export default AllTests;