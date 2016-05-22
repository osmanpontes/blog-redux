import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';

class Login extends Component{

	constructor(props){
		super(props);
		this.toggleAuthentication = this.toggleAuthentication.bind(this);
	}

	toggleAuthentication(e){
		e.preventDefault();
		const {isAuthenticated} = this.props;
		this.props.login(!isAuthenticated);
	}

	text(){
		const {isAuthenticated} = this.props;
		return isAuthenticated? "Sair" : "Entrar"
	}

	render(){
		return(
			<li><a onClick={this.toggleAuthentication} href="#">{this.text()}</a></li>
		);
	}
}

const mapStateToProps = (state) => {
	return {isAuthenticated:state.isAuthenticated};
}

export default connect(mapStateToProps,{login})(Login)

