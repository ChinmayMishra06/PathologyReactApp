import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';

const Slot = (props) => {
    // Creating states.
    const [slotResponse, setSlotResponse] = useState(null);
    const [errorResponse, setErrorResponse] = useState(null);
    const [slotDate, setSlotDate] = useState(null);
    const [memberResponse, setMemberResponse] = useState(null);
    const [memberId, setMemberId] = useState(null);

    // Creating history.
    const history = useHistory(null);

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Setting today date.
        let today = new Date();
        let htmlDate = new Date();

        // Creating date.
        today = (today.getDate() > 9 ? today.getDate() : "0" + today.getDate()) + "-" + (((today.getMonth() + 1) > 9) ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)) + "-" + today.getFullYear();

        // Setting html attribute date.
        document.getElementById("search_slot").value = htmlDate.getFullYear() + "-" + (((htmlDate.getMonth() + 1) > 9) ? htmlDate.getMonth() + 1 : "0" + (htmlDate.getMonth() + 1)) + "-" + (htmlDate.getDate() > 9 ? htmlDate.getDate() : "0" + htmlDate.getDate());

        // Getting slot data.
        const searchSlotByDate = async () => {
            // Calling search slot by api.
            let apiResponse = await axios({
                url: BASEURL + "slot/search-slot-by-date",
                data: { slot_date: today },
                method: "post",
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setSlotResponse(apiResponse.data.data);
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

        // Calling searchSlotByDate function.
        searchSlotByDate();
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

    // Book slot keyword.
    const bookSlot = async (slotTime) => {
        // Calling book slot api.
        let apiResponse = await axios({
            url: BASEURL + "slot/book-slot",
            data: {
                member_id: memberId,
                slot_time: slotTime,
                slot_date: document.getElementById("search_slot").value,
            },
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // eslint-disable-next-line no-undef
            toastr.success(apiResponse.data.message);
        } else {
            // eslint-disable-next-line no-undef
            toastr.error(apiResponse.data.message);
        }
    }

    // Search slot by date keyword.
    const searchSlotByDate = async (slotDate) => {
        // Calling search slot by date api.
        let apiResponse = await axios({
            url: BASEURL + "slot/search-slot-by-date",
            data: { slot_date: slotDate },
            method: "post",
            headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
        });

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // Setting response.
            setSlotResponse(apiResponse.data.data);

            // Setting error response.
            setErrorResponse(null);
        } else {
            // Setting error response.
            setErrorResponse(apiResponse.data.data);

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
                                            <li className="breadcrumb-item"><a href="#">Slot Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">All Slots</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">Book Slot For</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="new-user-info">
                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="Country">Select Member:</label>
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
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="Country">Date</label>
                                                    <input onChange={(e) => {
                                                        setSlotDate(e.target.value);
                                                        searchSlotByDate(e.target.value);
                                                    }} type="date" className="text search-input form-control" id="search_slot" name="search_slot" placeholder="Type here to search..." />
                                                    {
                                                        errorResponse ? errorResponse.slot_date
                                                            ? <i className="text-danger">{errorResponse.slot_date}</i>
                                                            : ""
                                                            : ""
                                                    }
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
                                            <h4 className="card-title">All Slots</h4>
                                        </div>
                                        <NavLink className="btn btn-primary pull-right assign-test" to="all-addresses"><i className="ri-add-line"></i>Choose Addrss</NavLink>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-borderless text-nowrap data-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Slot Time</th>
                                                        <th scope="col">Booking Left</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        slotResponse ? slotResponse.map((slot, index) => {
                                                            return <tr key={slot.slot_id + 1}>
                                                                <td>{slot.slot_id + 1}</td>
                                                                <td>{slot.slot_time}</td>
                                                                <td>{slot.booking_left}</td>
                                                                {
                                                                    slot.booking_left > 0 ?
                                                                        <td>
                                                                            <button className="btn btn-primary assign-test" slot_time={slot.slot_id} onClick={(e) => bookSlot(e.target.getAttribute("slot_time"))}><i className="ri-add-line"></i>Book Now</button>
                                                                        </td>
                                                                        :
                                                                        <td>
                                                                            <button onClick={(e) => {
                                                                                // eslint-disable-next-line no-undef
                                                                                toastr.error("Choose Another Date.");
                                                                            }} className="btn btn-primary assign-test"><i className="ri-close-line"></i>Booking Closed</button>
                                                                        </td>
                                                                }
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

export default Slot;