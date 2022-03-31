// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BASEURL from '../Config/Config';

const Navbar = (props) => {
    // Creating history.
    const history = useHistory(null);

    const logout = async () => {
        // Calling logout api.
        let apiResponse = await axios({
            url: BASEURL + "logout",
            method : "post",
            headers : {"AUTHTOKEN" : localStorage.getItem("auth_token")},
        });
    
        // On success response.
        if(apiResponse.data.status === "success"){
            // Removing auth token from local storage.
            localStorage.removeItem("auth_token");
    
            // Redirecting to login page.
            history.push({pathname : "/", message : apiResponse.data.message});
        }
    }

    return (
        <React.Fragment>
            { /* TOP NAVBAR START */}
            <div className="iq-top-navbar">
                <div className="iq-navbar-custom">
                    <div className="iq-sidebar-logo">
                        <div className="top-logo">
                            <a href="index.html" className="logo">
                                <img src={process.env.PUBLIC_URL + "images/demo2.png"} className="img-fluid" alt="" />
                            </a>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg navbar-light p-0">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="ri-menu-3-line"></i>
                        </button>
                        <div className="iq-menu-bt align-self-center">
                            <div className="wrapper-menu">
                                <div className="main-circle"><i className="ri-more-fill"></i></div>
                                <div className="hover-circle"><i className="ri-more-2-fill"></i></div>
                            </div>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto navbar-list">
                                <li className="nav-item">
                                    <a href="#" className="search-toggle iq-waves-effect">
                                        <i className="ri-notification-3-fill"></i>
                                        <span className="bg-danger dots"></span>
                                    </a>
                                    <div className="iq-sub-dropdown">
                                        <div className="iq-card shadow-none m-0">
                                            <div className="iq-card-body p-0">
                                                <div className="bg-primary p-3">
                                                    <h5 className="mb-0 text-white">All Notifications<small className="badge badge-light float-right pt-1">4</small></h5>
                                                </div>

                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL +  "images/user/01.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">Emma Watson Bini</h6>
                                                            <small className="float-right font-size-12">Just Now</small>
                                                            <p className="mb-0">95 MB</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL +  "images/user/02.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">New customer is join</h6>
                                                            <small className="float-right font-size-12">5 days ago</small>
                                                            <p className="mb-0">Jond Bini</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL + "images/user/03.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">Two customer is left</h6>
                                                            <small className="float-right font-size-12">2 days ago</small>
                                                            <p className="mb-0">Jond Bini</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL + "images/user/04.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">New Mail from Fenny</h6>
                                                            <small className="float-right font-size-12">3 days ago</small>
                                                            <p className="mb-0">Jond Bini</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="#" className="search-toggle iq-waves-effect">
                                        <i className="ri-mail-open-fill"></i>
                                        <span className="bg-primary count-mail"></span>
                                    </a>
                                    <div className="iq-sub-dropdown">
                                        <div className="iq-card shadow-none m-0">
                                            <div className="iq-card-body p-0">
                                                <div className="bg-primary p-3">
                                                    <h5 className="mb-0 text-white">All Messages<small className="badge badge-light float-right pt-1">5</small></h5>
                                                </div>
                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL + "images/user/01.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">Bini Emma Watson</h6>
                                                            <small className="float-left font-size-12">13 Jun</small>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL + "images/user/02.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">Lorem Ipsum Watson</h6>
                                                            <small className="float-left font-size-12">20 Apr</small>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL + "images/user/03.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">Why do we use it?</h6>
                                                            <small className="float-left font-size-12">30 Jun</small>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL + "images/user/04.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">Variations Passages</h6>
                                                            <small className="float-left font-size-12">12 Sep</small>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="iq-sub-card">
                                                    <div className="media align-items-center">
                                                        <div className="">
                                                            <img className="avatar-40 rounded" src={process.env.PUBLIC_URL + "images/user/05.jpg"} alt="" />
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0">Lorem Ipsum generators</h6>
                                                            <small className="float-left font-size-12">5 Dec</small>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-list">
                            <li>
                                <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                    <img src="images\user\01.jpg" className="img-fluid rounded mr-3" alt="user" />
                                    <div className="caption">
                                        <h6 className="mb-0 line-height">Chinmay Mishra</h6>
                                        <span className="font-size-12">Available</span>
                                    </div>
                                </a>
                                <div className="iq-sub-dropdown iq-user-dropdown">
                                    <div className="iq-card shadow-none m-0">
                                        <div className="iq-card-body p-0">
                                            <div className="bg-primary p-3">
                                                <h5 className="mb-0 text-white line-height">Hello Chinmay Mishra</h5>
                                                <span className="text-white font-size-12">Available</span>
                                            </div>
                                            <NavLink to="/profile" className="iq-sub-card iq-bg-primary-hover">
                                                <div className="media align-items-center">
                                                    <div className="rounded iq-card-icon iq-bg-primary">
                                                        <i className="ri-file-user-line"></i>
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0">My Profile</h6>
                                                        <p className="mb-0 font-size-12">View personal profile details.</p>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink to="edit-profile" className="iq-sub-card iq-bg-primary-hover">
                                                <div className="media align-items-center">
                                                    <div className="rounded iq-card-icon iq-bg-primary">
                                                        <i className="ri-profile-line"></i>
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0">Edit Profile</h6>
                                                        <p className="mb-0 font-size-12">Modify your personal details.</p>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            {/* <a href="account-setting.html" className="iq-sub-card iq-bg-primary-hover">
                                                        <div className="media align-items-center">
                                                            <div className="rounded iq-card-icon iq-bg-primary">
                                                                <i className="ri-account-box-line"></i>
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0">Account settings</h6>
                                                                <p className="mb-0 font-size-12">Manage your account parameters.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="privacy-setting.html" className="iq-sub-card iq-bg-primary-hover">
                                                        <div className="media align-items-center">
                                                            <div className="rounded iq-card-icon iq-bg-primary">
                                                                <i className="ri-lock-line"></i>
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0">Privacy Settings</h6>
                                                                <p className="mb-0 font-size-12">Control your privacy parameters.</p>
                                                            </div>
                                                        </div>
                                                    </a> */}
                                            <div className="d-inline-block w-100 text-center p-3">
                                                <NavLink onClick={logout} className="bg-primary iq-sign-btn" to="/" role="button">Logout<i className="ri-login-box-line ml-2"></i></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            { /* TOP NAVBAR END */}
        </React.Fragment>
    )
}

export default Navbar;