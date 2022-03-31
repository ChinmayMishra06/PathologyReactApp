// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';

const VerifyOTP = (props) => {
    // Creating history.
    const history = useHistory(null);

    // Creating states.
    const [otp, setOtp] = useState("");
    const [response, setResponse] = useState("");

    // Redirecting if already logged in user.
    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
            history.push("/profile");
        }
    }, []);

    // Creating otpVerification function
    const otpVerification = async (e) => {
        // Preventing from submitting the form.
        e.preventDefault();

        // Creating postData variable for sending post request data.
        let postData = {};

        // Storing contact in postData.
        postData["contact"] = localStorage.getItem("contact");
        postData["otp"] = otp;

        // Calling verify otp api.
        let apiResponse = await axios.post(BASEURL + "verify-otp", postData);

        // Setting api response.
        setResponse(apiResponse);

        // On success response returned.
        if(apiResponse.data.status === "success"){
            // Checking if registration completed or not?
            if(apiResponse.data.data.registration_status === "completed"){
                // Storing auth token in the local storage.
                localStorage.setItem("auth_token", JSON.stringify(apiResponse.data.data.auth_token));

                // Redirecting to the dashboard.
                history.push("/profile");
            }
        
            // Redirecting to the dashboard.
            history.push({pathname : "/register", registration_id : apiResponse.data.data.id});
        } else{
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

    return (
        <React.Fragment>
            {/* MAIN CONTENT START */}
            {/* LOADER START */}
            <div id="loading">
                <div id="loading-center"></div>
            </div>
            {/* LOADER END */}

            <section className="sign-in-page">
                <div className="container sign-in-page-bg mt-5 p-0">
                    <div className="row no-gutters">
                        <div className="col-md-6 text-center">
                            <div className="sign-in-detail text-white">
                                <a className="sign-in-logo mb-5" href="#"><img src={process.env.PUBLIC_URL + "/images/demo2.png"} className="img-fluid" alt="logo" /></a>
                                <div className="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                                    <div className="item">
                                        <img src={process.env.PUBLIC_URL + "/images/login/1.png"} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Manage your orders</h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                    </div>
                                    <div className="item">
                                        <img src={process.env.PUBLIC_URL + "/images/login/2.png"} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Manage your orders</h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                    </div>
                                    <div className="item">
                                        <img src={process.env.PUBLIC_URL + "/images/login/3.png"} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Manage your orders</h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 position-relative">
                            <div className="sign-in-from">
                                <h1 className="mb-0">Verify OTP Here</h1>
                                <p>You must login to access the entire site.</p>
                                <form className="mt-4">
                                    <div className="form-group">
                                        <label htmlFor="otp">Enter OTP</label>
                                        <input type="text" className="form-control mb-0" onChange={(e) => setOtp(e.target.value)} id="otp" name="otp" placeholder="Enter Your OTP Number Here..." />
                                        {
                                            response ? response.data.data.otp
                                                ? <i className="text-danger">{response.data.data.otp}</i>
                                                : ""
                                                : ""
                                        }
                                    </div>
                                    <div className="d-inline-block w-100">
                                        <button type="submit" onClick={otpVerification} className="btn btn-primary float-right">Verify OTP</button>
                                    </div>
                                    <div className="sign-info">
                                        <ul className="iq-social-media">
                                            <li>
                                                <a target="_blank" href="https://www.facebook.com/ChinmayMishra6/"><i className="ri-facebook-line"></i></a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="https://www.linkedin.com/in/chinmay-mishra-a57200112/"><i className="ri-linkedin-box-line"></i></a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="https://twitter.com/ChinmayMishra06"><i className="ri-twitter-line"></i></a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="https://www.instagram.com/chinmaymishra06/"><i className="ri-instagram-line"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* MAIN CONTENT END */}
        </React.Fragment>
    )
}
export default VerifyOTP;