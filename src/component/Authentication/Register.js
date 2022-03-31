// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import BASEURL from '../Config/Config';

const Register = (props) => {
    // Creating history.
    const history = useHistory(null);
    const location = useLocation(null);

    // Creating states.
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [response, setResponse] = useState("");

    // Redirecting to profile page if already logged in user.
    useEffect(() => {
        // if (localStorage.getItem("auth_token")) {
        //     history.push("/profile");
        // }

        // Redirecting if registration_id is null.
        if ((location.registration_id === undefined) || (location.registration_id === null)) {
            history.push("/")
        }
    }, []);

    // Creating registration function
    const registration = async (e) => {
        // Preventing from submitting the form.
        e.preventDefault();

        // Calling register api.
        let apiResponse = await axios({
            url: BASEURL + "new_register",
            method: "post",
            data: {
                id: location.registration_id,
                name: name,
                email: email,
                gender: gender,
                dob: dob,
            },
        });

        // Setting api response.
        setResponse(apiResponse.data.data);

        // On success response returned.
        if (apiResponse.data.status === "success") {
            // Storing auth token in the local storage.
            localStorage.setItem("auth_token", JSON.stringify(apiResponse.data.data.auth_token));

            // Redirecting to the dashboard.
            history.push("/profile");
        } else {
            // eslint-disable-next-line no-undef
            toastr.error(apiResponse.data.message);
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
                                <div className="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0"
                                >
                                    <div className="item">
                                        <img src={process.env.PUBLIC_URL + "images/login/1.png"} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Manage your orders</h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                    </div>
                                    <div className="item">
                                        <img src={process.env.PUBLIC_URL + "images/login/2.png"} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Manage your orders</h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                    </div>
                                    <div className="item">
                                        <img src={process.env.PUBLIC_URL + "images/login/3.png"} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Manage your orders</h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 position-relative">
                            <div className="sign-in-from">
                                <h1 className="mb-0">Register Here</h1>
                                <p>You must register yourself first to access the entire site.</p>
                                <form className="mt-4">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Name</label>
                                        <input type="text" className="form-control mb-0" id="exampleInputEmail1" name="name" onChange={(e) => { return setName(e.target.value) }} placeholder="Enter Your Name Here..." />
                                        {
                                            response ? response.name
                                                ? <i className="text-danger">{response.name}</i>
                                                : ""
                                                : ""
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email Address</label>
                                        <input type="text" className="form-control mb-0" id="exampleInputEmail1" name="email" onChange={(e) => { return setEmail(e.target.value) }} placeholder="Enter Your Email Address Here..." />
                                        {
                                            response ? response.email
                                                ? <i className="text-danger">{response.email}</i>
                                                : ""
                                                : ""
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Gender</label>
                                        <select className="form-control mb-0" id="exampleInputEmail1" name="gender" onChange={(e) => { return setGender(e.target.value) }}>
                                            <option>Select Your Gender Here...</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {
                                            response ? response.gender
                                                ? <i className="text-danger">{response.gender}</i>
                                                : ""
                                                : ""
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">DOB</label>
                                        <input type="date" className="form-control mb-0" id="exampleInputEmail1" name="dob" onChange={(e) => { return setDob(e.target.value) }} />
                                        {
                                            response ? response.dob
                                                ? <i className="text-danger">{response.dob}</i>
                                                : ""
                                                : ""
                                        }
                                    </div>
                                    <div className="d-inline-block w-100">
                                        <button onClick={registration} type="submit" className="btn btn-primary float-right">Register</button>
                                    </div>
                                    <div className="sign-info">
                                        <span className="dark-color d-inline-block line-height-2">Don't have an account? <a href="#">Sign up</a></span>
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

export default Register;