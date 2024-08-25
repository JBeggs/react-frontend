import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../actions/authActions";
import Navigation from "../Navigation";
import HomeHero from "../Hero/Home";

export class UserProfile extends Component {

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    UNSAFE_componentWillMount() {
        this.props.getUserProfile();
    }

    renderUser() {
        const user = this.props.user;

        if (user) {
            localStorage.setItem("user_id", user.id)
            return (
                <div className="mx-2">
                    <h4>username: {localStorage.getItem("username")}</h4>
                    <h4>First Name: {user.first_name}</h4>
                    <h4>Last Name: {user.last_name}</h4>
                    {/* <h4>Phone Number: {user.phone_number}</h4> */}
                    <h4>email: {user.email}</h4>

                    <hr />
                    {/* <h4>About Myself:</h4>
                    <p>{user.profile.bio}</p> */}

                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="form-container">
                <div className="main-form-1">
                    <div className="text-center login" style={{padding:"50px 0"}}>
                        <div className="logo">User</div>
                        <div className="main-all-forms-1">
                            {this.renderUser()}
                            {" "}
                            <hr />
                            <Link className="btn" to="/profile_edit"> Update Details</Link>
                            {/* <Link className="btn btn-primary" to="/change_password">Change Password</Link> */}
                            {/* <button type="submit" className="main-form-button"><i className="fa fa-chevron-right"></i></button> */}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getUserProfile } )(UserProfile);