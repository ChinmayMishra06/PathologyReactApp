// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import React from 'react';

const Footer = (props) => {
    return (
        <React.Fragment>
            { /* FOOTER START   */}
            <footer className="bg-white iq-footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                                <li className="list-inline-item"><a href="#">Terms of Use</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-6 text-right">Copyright 2021 <a href="#">Ezdat Technology Private Limited</a> All Rights Reserved.</div>
                    </div>
                </div>
            </footer>
            { /* FOOTER END */}
        </React.Fragment>
    )
}

export default Footer;