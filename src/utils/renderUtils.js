import React from "react";

export const renderField = ({ placeholder, input, label, type, meta: { touched, error } }) => (
    <div>
        
        {/* <div> */}
            <input className="form-control" {...input} type={type} placeholder={[placeholder]} />
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        {/* </div> */}
        
    </div>
);

export const renderTextAreaField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea className="form-control" {...input} type={type}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderError = (errorMessages) => {
    if ( errorMessages) {
        console.log(errorMessages)
        console.log("------------");
        return (
            <div className="alert alert-danger">
                {errorMessages}
            </div>
        )
    }
};
