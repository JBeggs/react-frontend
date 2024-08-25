import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { connect } from "react-redux"
// import { required } from "redux-form-validators"

import { renderField, renderTextAreaField, renderError} from "../../utils/renderUtils";
import { updateUserProfile } from "../../actions/authActions";
import Navigation from "../Navigation";

export class UserProfileEdit extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="">
                <Navigation />
                <div className="form-container">
                    <div className="main-form-1">
                        <div className="text-center login" style={{padding:"50px 0"}}>
                            <div className="logo">User Details</div>
                            <form
                                className=""
                                onSubmit={handleSubmit}
                            >
                                <h4 className="text-md-center">Edit Profile</h4>
                                <hr/>

                                <fieldset className="form-group">
                                    <Field name="first_name" placeholder="First Name" component={renderField}
                                        type="text"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="last_name" placeholder="Last Name" component={renderField}
                                        type="text"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="email" placeholder="Email" component={renderField}
                                        type="text"
                                    />
                                </fieldset>

                                {/* <fieldset className="form-group">
                                    <Field name="phone_number" id="phone_number" placeholder="Phone Number" component={renderField}
                                        type="text"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="bio" label="About Yourself" component={renderTextAreaField}
                                        type="text"
                                    />
                                </fieldset> */}

                                <fieldset className="form-group">
                                    { renderError(error) }
                                    <button action="submit" type="submit" className="main-form-button"><i className="fa fa-chevron-right"></i></button>
                                    {/* <button action="submit" className="btn btn-primary">Save</button> */}
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        initialValues: state.auth.user
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "update_user_profile",
    onSubmit: updateUserProfile
})(UserProfileEdit));
