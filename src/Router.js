import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import HomePage from "./Pages/Home";
import ArticlesPage from "./Pages/Articles/ArticlesPage.js";
import ArticleDetailPage from "./Pages/Articles/ArticleDetailPage.js";

import Control from "./Components/Auth/Control";
import Logout from "./Components/Auth/Logout";
import Signup from "./Components/Auth/Signup";
import SignupDone from "./Components/Auth/SignupDone";
import AccountActivation from "./Components/Auth/AccountActivation";
import UserProfile from "./Components/Auth/UserProfile";
import UserProfileEdit from "./Components/Auth/UserProfileEdit";
import PasswordChange from "./Components/Auth/PasswordChange";
import { AcceptTerms } from "./Components/Auth/AcceptTerms.js";
import PasswordReset from "./Components/Auth/PasswordReset";
import PasswordResetDone from "./Components/Auth/PasswordResetDone";
import PasswordResetConfirm from "./Components/Auth/PasswordResetConfirm";
import ProtectedRoute from './ProtectedRoute.js';


// Function to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get('toekn');
}

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!getAccessToken();
}

// Create the router configuration
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
      index: true
    },
    {
        path: '/articles',
        element: <ArticlesPage />,
        index: true
    },
    {
        path: '/article/:slug',
        element: <ArticleDetailPage />,
        index: true
    },
    {
        path: '/accept_terms',
        element: <AcceptTerms />,
        index: true
    },
    {
        path: '/login',
        element: <Control />,
        index: true
    },
    {
        path: '/logout',
        element: <Logout />,
        index: true
    },
    {
        path: '/signup',
        element: <Signup />,
        index: true
    },
    {
        path: '/signup_done',
        element: <SignupDone />,
        index: true
    },
    {
        path: '/account/confirm-email/:key',
        element: <AccountActivation />,
        index: true
    },
    {
      element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
      children: [
        {
          path: '/reset_password',
          element: <PasswordReset />
        },
        {
          path: '/reset_password_done',
          element: <PasswordResetDone />
        },
        {
          path: '/reset/:uid/:token/',
          element: <PasswordResetConfirm />
        },
        {
            path: '/UserProfile',
            element: <UserProfile />
        },
        {
            path: '/profile_edit',
            element: <UserProfileEdit />
        },
        {
            path: '/change_password',
            element: <PasswordChange />
        },
      ]
    },
    {
      path: '*',
      element: <p>404 Error - Nothing here...</p>
    }
  ]
);

export default router;