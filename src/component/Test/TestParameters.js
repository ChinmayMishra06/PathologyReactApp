import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import BASEURL from '../Config/Config';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const TestParameters = (props) => {
    // Creating states.
    const [response, setResponse] = useState(null);

    // Creating history.
    const history = useHistory(null);

    // Creating params.
    const { id } = useParams();

    useEffect(() => {
        // Redirecting to login page if not logged in user.
        if (!localStorage.getItem("auth_token")) {
            history.push("/")
        }

        // Getting get test parameters by test id data.
        const getTestById = async () => {
            // Calling get get test parameters by test id api.
            let apiResponse = await axios({
                url: BASEURL + "test/get-test-by-id",
                method: "post",
                data: { id: id },
                headers: { "AUTHTOKEN": localStorage.getItem("auth_token") }
            });

            // On success response returned.
            if (apiResponse.data.status === "success") {
                // Setting response.
                setResponse(apiResponse.data.data);
            } else {
                // Redirecting to all tests.
                history.push("/all-tests");
            }
        }

        // Calling getTestById function.
        getTestById();
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
                                            <li className="breadcrumb-item"><a href="#">Test Management</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">All Test Parameters</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">All Test Parameters</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-borderless text-nowrap data-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Test Name</th>
                                                        <th scope="col">Short Name</th>
                                                        <th scope="col">Units</th>
                                                        <th scope="col">Suffix</th>
                                                        <th scope="col">Min Value</th>
                                                        <th scope="col">Max Value</th>
                                                        <th scope="col">Ref Range</th>
                                                        <th scope="col">Gender</th>
                                                        <th scope="col">Remarks</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        response ? response.parameters.map((parameter, index) => {
                                                            return <tr key={parameter.id}>
                                                                <td>{parameter.id}</td>
                                                                <td>{parameter.name}</td>
                                                                <td>{response.name}</td>
                                                                <td>{parameter.short_name}</td>
                                                                <td>{parameter.units}</td>
                                                                <td>{parameter.suffix}</td>
                                                                <td>{parameter.min_value}</td>
                                                                <td>{parameter.max_value}</td>
                                                                <td>{parameter.ref_range}</td>
                                                                <td>{parameter.gender}</td>
                                                                <td>{parameter.remarks}</td>
                                                                <td>{parameter.status}</td>
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

export default TestParameters;