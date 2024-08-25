import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeContext } from "../../Theme";
import $ from "jquery"


// const ThemeHeader = () => {
//     const { theme, toggleTheme } = useContext(ThemeContext);
  
//     function onClick (){
//         const _attr = $('html').attr('data-bs-theme');
//         const new_Attr = _attr === 'light' ? 'dark' : 'light';
//         $("html").removeAttr(_attr);
//         $("html").attr({"data-bs-theme": new_Attr});

//     }

//     return (
//       <div className="header-container">
//         <div className="header-toggle-buttons">
//             <button  onClick={() => {
//                   toggleTheme();
//                   onClick();
//                 }}>
//                     {theme}
//             </button>
//         </div>
//       </div>
//     );
// };

class AuthHeader extends Component {

    static propTypes = {
        authenticated: PropTypes.bool
    };

    renderLinks() {

        if (this.props.authenticated) {
            return (
                [
                    <li className="nav-item" key="profile">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>,
                    <li className="nav-item" key="logout">
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </li>
                ]
            );

        } else {
            return (
                [
                    <li className="nav-item" key="login">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>,
                    <li className="nav-item" key="signup">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                ]
            );
        }
    }

    render() {
        
        return (
            <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand">Auth</Link>
                <ul className="navbar-nav">
                    <li className="nav-item" key="signup">
                    </li>
                    {this.renderLinks()}
                </ul>
            </nav>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps)(AuthHeader);