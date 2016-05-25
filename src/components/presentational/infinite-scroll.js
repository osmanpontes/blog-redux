import React, {Component} from 'react';
import Loader from 'react-loader';

export default class InfiniteScroll extends Component{

	constructor(props){
		super(props);
	}

	wasReached(){
		const containerRef = this.refs.infiniteContainer;
		return (window.innerHeight + window.scrollY >= containerRef.offsetTop);
	}

	componentDidMount(){
		const {onInfiniteScroll} = this.props;
		
		window.onscroll = function(ev) {
			console.clear();
			console.log('innerHeight',window.innerHeight);
			console.log('scrollY', window.scrollY);
			console.log('body offsetHeight', document.body.offsetHeight);

	    if (this.wasReached()) {
    			onInfiniteScroll();
	    }

		}.bind(this);

	}

	render(){
		return(
			<div ref="infiniteContainer" >
			</div>
		)
	}

}

