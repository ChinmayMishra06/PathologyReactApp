// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
    return (
        <React.Fragment>
            {/* SIDEBAR START */}
            <div className="iq-sidebar">
                <div className="iq-sidebar-logo d-flex justify-content-between">
                    <a href="dashboard.html">
                        <img src={process.env.PUBLIC_URL + "images/demo2.png"} className="img-fluid" alt="" />
                        { /* <span>XRay</span>   */}
                    </a>
                    <div className="iq-menu-bt-sidebar">
                        <div className="iq-menu-bt align-self-center">
                            <div className="wrapper-menu">
                                <div className="main-circle"><i className="ri-more-fill"></i></div>
                                <div className="hover-circle"><i className="ri-more-2-fill"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sidebar-scrollbar">
                    <nav className="iq-sidebar-menu">
                        <ul id="iq-sidebar-toggle" className="iq-menu">
                            <li className={(props.active === "members") ? "active" : ""}>
                                <NavLink exact to="/all-members" className="iq-waves-effect"><i className="ri-hospital-fill"></i><span>Member</span></NavLink>
                            </li>
                            <li className={(props.active === "addresses") ? "active" : ""}>
                                <NavLink exact to="/all-addresses" className="iq-waves-effect"><i className="ri-hospital-fill"></i><span>Address</span></NavLink>
                            </li>
                            <li className={(props.active === "orders") ? "active" : ""}>
                                <NavLink exact to="/all-orders" className="iq-waves-effect"><i className="ri-hospital-fill"></i><span>Order</span></NavLink>
                            </li>
                            <li className={(props.active === "slots") ? "active" : ""}>
                                <NavLink exact to="/slot" className="iq-waves-effect"><i className="ri-hospital-fill"></i><span>Slot</span></NavLink>
                            </li>
                            <li className={(props.active === "carts") ? "active" : ""}>
                                <NavLink exact to="/cart" className="iq-waves-effect"><i className="ri-hospital-fill"></i><span>Cart</span></NavLink>
                            </li>
                            <li className={(props.active === "tests") ? "active" : ""}>
                                <NavLink exact to="/all-tests" className="iq-waves-effect"><i className="ri-hospital-fill"></i><span>Test</span></NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="p-3"></div>
                </div>
            </div>
            {/* SIDEBAR END */}
        </React.Fragment>
    )
}

export default Sidebar;