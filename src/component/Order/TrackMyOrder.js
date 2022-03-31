// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const TrackMyOrder = (props) => {
    // Creating states.
    const [trackMyOrderResponse, setTrackMyOrderResponse] = useState(null);

    // Creating history.
    const history = useHistory(null);

    // Creating params.
    const { id } = useParams();

    useEffect(() => {
        // Redirecting if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Getting track my order data.
        const trackOrder = async () => {
            // Calling track my order api.
            let apiResponse = await axios({
                url: BASEURL + "order/track-my-order",
                data: { order_id: id },
                method: "post",
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setTrackMyOrderResponse(apiResponse.data.data);
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

        // Calling trackOrder function.
        trackOrder();
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
                                            <li className="breadcrumb-item active" aria-current="page">Track My Order</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title font-weight-bold">Slot Details</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            {
                                                trackMyOrderResponse ? trackMyOrderResponse.slot.slot_date + " " + trackMyOrderResponse.slot.slot_time : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title font-weight-bold">Track Order</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-borderless text-nowrap data-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Placed</th>
                                                        <td scope="col">
                                                            {
                                                                trackMyOrderResponse ? trackMyOrderResponse.order.created_at : null
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="col">Confirmed / Technician Assigned</th>
                                                        <td scope="col">
                                                            {
                                                                trackMyOrderResponse ? trackMyOrderResponse.technician ? trackMyOrderResponse.order.status_with_time.confirmed + " " + trackMyOrderResponse.technician.name + " - " + trackMyOrderResponse.technician.contact
                                                                    : null
                                                                    : null
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="col">Sample Collected By Technician</th>
                                                        <td scope="col">
                                                            {
                                                                trackMyOrderResponse ? trackMyOrderResponse.order.status_with_time.sample_collected : null
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="col">Sample Submitted At Lab</th>
                                                        <td scope="col">
                                                            {
                                                                trackMyOrderResponse ? trackMyOrderResponse.order.status_with_time.sample_submitted : null
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="col">Report Generated</th>
                                                        <td scope="col">
                                                            {
                                                                trackMyOrderResponse ? trackMyOrderResponse.order.status_with_time.report_issued : null
                                                            }
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                        <hr /><h4 className="card-title">Other Details</h4><hr />
                                        <div className="row">
                                            <div className="col-md-12">
                                                <table className="table mb-0 table-borderless text-nowrap data-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Name</th>
                                                            <td scope="col">
                                                                {
                                                                    trackMyOrderResponse ? trackMyOrderResponse.member ? trackMyOrderResponse.member.name : trackMyOrderResponse.patient.name : ""
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col">Order Number</th>
                                                            <td scope="col">
                                                                {
                                                                    trackMyOrderResponse ? trackMyOrderResponse.order.order_number : ""
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col">Order Amount</th>
                                                            <td scope="col">
                                                                {
                                                                    trackMyOrderResponse ? "₹ " + trackMyOrderResponse.order.payable : ""
                                                                }

                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="">Payment Mode</th>
                                                            <td scope="col">
                                                                {
                                                                    trackMyOrderResponse ? trackMyOrderResponse.order.payment_mode : ""
                                                                }
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                </table>
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

export default TrackMyOrder;