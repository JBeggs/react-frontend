import React, { Component } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const withRouter = (Component) => {
	const Wrapper = (props) => {
		const history = useNavigate();
		return <Component history={history} {...props} />;
	};
	return Wrapper;
};

export default function ReuireAuth(ComposedComponent) {
    class Authentication extends Component {

        static propTypes = {
            history: PropTypes.object
        };

        UNSAFE_componentWillMount() {
            this.checkAuthentication(this.props);

        }

        UNSAFE_componentWillUpdate(nextProps) {
            this.checkAuthentication(nextProps);
        }

        checkAuthentication(props) {
            if (!props.authenticated) {
                this.props.history.push("/login");
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated }
    }
    return withRouter(connect(mapStateToProps)(Authentication));
}
