import React, { Component, useState, useEffect } from "react";
import Iframe from 'react-iframe'
import $ from "jquery";
import history from "../../utils/historyUtils";

export function AcceptTerms (){

        function handleTerms(e) {
            e.preventDefault();
            if($('#accept_terms').is(":checked")){
                localStorage.setItem("terms_acctepted", true);
                history.push("/");
                window.location.reload();
            }
        }

        return (
            <div className="terms-container">

                <div className="text-center terms-conditions" style={{padding:"50px 0"}}>
                    <div className="logo">Please accept terms and conditions</div>

                    <div className="terms-form-1">

                            <div className="etc-terms-form">
                                <p>To continue to the site please accept the terms and conditions...</p>
                            </div>
                            <div className="terms-form-main-message">
                            <Iframe url={process.env.REACT_APP_PUBLIC_HTML + "/terms.html"}
                                id=""
                                className=""
                                display="block"
                                position="relative"
                                width="100%"
                                height="100%"
                            />
                            
                            </div>
                            <div className="main-terms-form">
                                <div className="terms-group">
                                    <div className="form-group">
                                    <input type="checkbox" id="accept_terms" name="accept_terms" />
                                        <label for="accept_terms">Accept Terms</label>
                                    </div>
                                </div>
                                <button onClick={handleTerms} type="submit" className="terms-button"><i className="fa fa-chevron-right"></i></button>
                            </div>

                    </div>

                </div>

                {/* <form
                    className=""
                    onSubmit={handleSubmit}
                >
                    <div className="section text-center">
                        <h4 className="mb-4 pb-3">Reset Your Password</h4>
                        <div className="form-group">				

                            <Field 
                                name="email" 
                                placeholder="Please enter your email" 
                                component={renderField}
                                type="text" 
                                validate={[required({message: "This field is required."})]}
                            />
                            <i className="input-icon uil uil-at"></i>

                        </div>

                        <fieldset className="form-group">
                            { renderError(error) }
                            <button action="submit" className="btn mt-4">Reset Password</button>
                        </fieldset>
                        <Link  className="link" to="/terms">terms?</Link>

                    </div>
                </form> */}

                </div>

        )
    }
