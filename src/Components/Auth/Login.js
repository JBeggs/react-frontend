import "./Css/Login.css";
import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators"
import $ from "jquery";
import { renderField, renderError} from "../../utils/renderUtils";
import { loginUser } from "../../actions/authActions";


export const handleShowSignup = () => {
    $('.forgot-password').hide();
    $('.login').hide();
    $('.signup').show();
}

export const handleForgotPassword = () => {
    $('.forgot-password').show();
    $('.login').hide();
    $('.signup').hide();
}

export const handleLogin = () => {
    $('.forgot-password').hide();
    $('.login').show();
    $('.signup').hide();
}

class Login extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        
        const { handleSubmit, error } = this.props;

        return (
            <form
            onSubmit={handleSubmit}
        >
                <div className="text-center login" style={{padding:"50px 0"}}>
                    <div className="logo">login</div>

                    <div className="main-form-1">
                        {/* <form id="login-form" className="text-left"> */}
                            <div className="login-form-main-message"></div>
                            <div className="main-all-forms-1">
                                <div className="login-group">
                                    <div className="form-group">
                                        <label for="lg_username" className="sr-only">Username</label>
                                        <Field 
                                            className="form-control"
                                            placeholder="Your Username"
                                            id="username" 
                                            name="username"
                                            component={renderField}
                                            type="text"
                                            validate={[required({message: "This field is required."})]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Field
                                            placeholder="Your Password"
                                            name="password"
                                            component={renderField}
                                            type="password"
                                            validate={[required({message: "This field is required."})]}
                                        />
                                    </div>
                                    <div className="form-group login-group-checkbox">
                                        <input type="checkbox" id="remember" name="remember" />
                                        <label for="remember">remember</label>
                                    </div>
                                </div>
                                { renderError(error) }
                                <button type="submit" className="main-form-button"><i className="fa fa-chevron-right"></i></button>
                            </div>
                            <div className="etc-login-form">
                                <p>forgot your password? <br /><a href="#" onClick={handleForgotPassword}>click here</a></p>
                                <p>new user? <br /> <a href="#" onClick={handleShowSignup}>create new account</a></p>
                            </div>
                        {/* </form> */}
                    </div>

                </div>

            {/* <div className="section text-center">
                <h4 className="mb-4 pb-3">Log In</h4>
                <div className="form-group">				

                    <Field 
                        placeholder="Your Username"
                        name="username"
                        component={renderField}
                        type="text"
                        validate={[required({message: "This field is required."})]}
                    />
                    <i className="input-icon uil uil-at"></i>

                </div>	
                <div className="form-group mt-2">
                    <Field
                        placeholder="Your Password"
                        name="password"
                        component={renderField}
                        type="password"
                        validate={[required({message: "This field is required."})]}
                    />
                    <i className="input-icon uil uil-lock-alt"></i>
                </div>


                <fieldset className="form-group">
                    { renderError(error) }
                    <button action="submit" className="btn mt-4">Login</button>
                </fieldset>
                <Link  className="link" to="/reset_password">forgot password?</Link>

            </div> */}
        </form>
        )
    }
}

export default reduxForm({
    form: "login",
    onSubmit: loginUser
})(Login);
