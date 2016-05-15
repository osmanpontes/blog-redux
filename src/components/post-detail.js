import React, {Component} from 'react';


export default class PostDetail extends Component{
	render(){
		return(
			<div>Post Detail - {this.props.params.postId}</div>
		)
	}
}
