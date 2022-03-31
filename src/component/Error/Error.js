// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React from 'react';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Error = (props) => {
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
                                <img src={process.env.PUBLIC_URL + "/images/error/page-not-found.jpg"} alt="logo" />
                                <NavLink className="btn btn-primary m-2" to="/profile">GO BACK TO HOMEPAGE</NavLink>
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

export default Error;