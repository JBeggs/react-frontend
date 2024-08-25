import "./Navigation.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "../../Pictures/logo.png";

class Navigation extends Component {

    static propTypes = {
        authenticated: PropTypes.bool
    };

    renderLinks() {

        if (this.props.authenticated) {
            return (
                [
                    <>
                        <li className="nav-item">
                            <a className="nav-link" href="/articles">Articles</a>
                        </li>
                        <li className="nav-item" key="profile">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item" key="logout">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                    </>
                ]
            );

        } else {
            return (
                [
                    <li className="nav-item" key="login">
                        <Link className="nav-link" to="/login">Login / Signup</Link>
                    </li>,

                ]
            );
        }
    }


    render() {
        
        return (
            // <u>{this.renderLinks()}</u>
        // <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container px-4 px-lg-5">
                    
                        <img src={Logo} width={80} height={80} /><a href="#1"> Opensource Solutions</a>
                    
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                            
                            {this.renderLinks()}
                            
                        </ul>
                    </div>
                </div>
                
            </nav>
        // </div>
        )
    }
}
  


function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps)(Navigation);
