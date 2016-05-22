import React, {Component} from 'react';
import {connect} from 'react-redux';
import { sendFlashMessage } from '../../actions/index';

export default function Authentication(WrappedComponent){
	class Authentication extends Component{

		static contextTypes = {
	    router: React.PropTypes.object
	  };

	  redirectToHome(){
	  	this.context.router.push('/');
	  }


		componentWillMount(){
			const {isAuthenticated, sendFlashMessage} = this.props;
			if(!isAuthenticated){
				setTimeout(function(){
					sendFlashMessage("Fazer Login!","alert-warning");
				});
				this.redirectToHome();
			}
		}

		componentWillUpdate(nextProps){
			const {isAuthenticated} = nextProps;
			if(!isAuthenticated){
				this.redirectToHome();
			}
		}

		render(){
			return(
				<div>
					<WrappedComponent />
				</div>
			)
		}
	}

	function mapStateToProps(state){
		return {isAuthenticated: state.isAuthenticated};
	}

	return connect(mapStateToProps, {sendFlashMessage})(Authentication);
}