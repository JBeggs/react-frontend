import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeHero from "../../Components/Hero/Home";


export default class PasswordResetDone extends Component {
    render() {
        return (
            <div className="">
                <HomeHero />
                <div className="section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <h3 className="mx-5">An password reset email has been sent to your email. Please follow the link to reset your password.</h3>
                            <Link  className="link" to="/login">Login?</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}