import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RequireAuth from "./Auth/RequireAuth";
import Modal from 'react-modal';

import HomePage from "../Pages/Home";
import ArticlesPage from "../Pages/Articles/ArticlesPage.js";
import ArticleDetailPage from "../Pages/Articles/ArticleDetailPage.js";

import Control from "./Auth/Control";
import Logout from "./Auth/Logout";
import Signup from "./Auth/Signup";
import SignupDone from "./Auth/SignupDone";
import AccountActivation from "./Auth/AccountActivation";
import UserProfile from "./Auth/UserProfile";
import UserProfileEdit from "./Auth/UserProfileEdit";
import PasswordChange from "./Auth/PasswordChange";
import { AcceptTerms } from "./Auth/AcceptTerms.js";
import PasswordReset from "./Auth/PasswordReset";
import PasswordResetDone from "./Auth/PasswordResetDone";
import PasswordResetConfirm from "./Auth/PasswordResetConfirm";


// import NoMatch from "./NoMatch";

function MainContent(){
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<HomePage />}/>

                <Route path="/articles" element={<ArticlesPage/>}/>
                <Route path="/article/:slug" element={<ArticleDetailPage />} />
                <Route path="/accept_terms" element={<AcceptTerms />}/>
                <Route path="/login" element={<Control />}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/account/confirm-email/:key" element={<AccountActivation />}/>
                <Route path="/signup_done" element={<SignupDone />}/>
                <Route path="/reset_password" element={<PasswordReset />}/>
                <Route path="/reset_password_done" element={<PasswordResetDone />}/>
                <Route path="/reset/:uid/:token/" element={<PasswordResetConfirm />}/>
                <Route path="/profile" element={<UserProfile />}/>
                <Route path="/profile_edit" element={<UserProfileEdit />}/>
                <Route path="/change_password" element={<PasswordChange />}/>
                {/* <Route element={NoMatch}/> */}
            </Routes>
            {previousLocation && (
                <Routes>
                    <Route path="/modal/" element={<Modal />} />
                </Routes>
            )}
        </div>
    )
}

export default MainContent;
