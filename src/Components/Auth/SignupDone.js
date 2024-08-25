import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SignupDone extends Component {
    render() {
        return (
            <div className="text-center login" style={{padding:"150px 0 46%"}}>
                <div className="logo">Thanks for your registration, <br />please follow the link sent to your provided email to confirm your email. <br /><br /> your account has been activated.</div>

                    <div className="row justify-content-center">
                        <h3 className="mx-5">
                            
                        </h3>
                        <Link  className="link" to="/login">Login?</Link>
                    </div>
            </div>
        )
    }
}