import React, { Component } from "react";
import Modal from 'react-modal';
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { renderField, renderError } from "../../utils/renderUtils";
import { signupUser } from "../../actions/authActions";
import { handleLogin } from "./Login.js";


class Signup extends Component {

    static propTypes = {
        ...propTypes
    };


    render() {
        const { handleSubmit, error } = this.props;
    
        return (
            <form
                className=""
                onSubmit={handleSubmit}
            >

                <div className="text-center signup" style={{padding:"50px 0"}}>
                    <div className="logo">register</div>

                    <div className="main-form-1">

                            <div className="login-form-main-message"></div>
                            <div className="main-all-forms-1">
                                <div className="login-group">
                                    <div className="form-group">
                                        <Field name="username" placeholder="Username" component={renderField}
                                            type="text" validate={[required({message: "This field is required."})]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field name="password1" placeholder="Password" component={renderField}
                                            type="password" validate={[required({message: "This field is required."})]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field name="password2" placeholder="Confirm Password" component={renderField}
                                            type="password" validate={[required({message: "This field is required."})]}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <Field name="email" placeholder="Email" component={renderField}
                                            type="text" validate={[required({message: "This field is required."})]}/>
                                    </div>

                                    <div className="form-group login-group-checkbox">
                                        <input type="checkbox" className="" id="reg_agree" name="reg_agree" />
                                        <label for="reg_agree">i agree with <a href="#">terms</a></label>
                                    </div>
                                </div>
                                { renderError(error) }
                                <button type="submit" className="main-form-button"><i className="fa fa-chevron-right"></i></button>
                            </div>
                            <div className="etc-login-form">
                                <p>already have an account? <br /><a href="#" onClick={handleLogin}>login here</a></p>
                            </div>

                    </div>

                </div>
                {/* <div className="section text-center">
                    <h4 className="">Sign Up</h4>
                    <div className="form-group">
                        <fieldset className="form-group">
                            <Field name="email" placeholder="Email" component={renderField}
                                type="text" validate={[required({message: "This field is required."})]}/>
                        </fieldset>
                        <i className="input-icon uil uil-user"></i>
                    </div>	
                    <div className="form-group mt-2">
                        <fieldset className="form-group">
                            <Field name="username" placeholder="Username" component={renderField}
                                type="text" validate={[required({message: "This field is required."})]}
                            />
                        </fieldset>
                        <i className="input-icon uil uil-at"></i>
                    </div>	
                    <div className="form-group mt-2">
                        <fieldset className="form-group">
                            <Field name="password1" placeholder="Password" component={renderField}
                                type="password" validate={[required({message: "This field is required."})]}
                            />
                        </fieldset>
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <div className="form-group mt-2">
                        <fieldset className="form-group">
                            <Field name="password2" placeholder="Confirm Password" component={renderField}
                                type="password" validate={[required({message: "This field is required."})]}
                            />
                        </fieldset>
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>

                        { renderError(error) }

                    <fieldset className="form-group">
                        <button action="submit" className="btn mt-4">Sign Up</button>
                    </fieldset>
                </div> */}
            </form>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { password1, password2 } = values;
    if (password1 !== password2) {
        errors.password2 = "Password does not match."
    }
    return errors;
};

export default reduxForm({
    form: "signup",
    validate: validateForm,
    onSubmit: signupUser
})(Signup);
