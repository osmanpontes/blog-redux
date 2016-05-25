"use strict";

import React, {Component} from 'react';
import Loader from 'react-loader';

//funcao declarada como global para poder ser reaproveitada nos metodos
//componentDidMount e componentDidUpdate
function onscroll(e){
	const {onInfiniteScroll, isLoading} = this.props;

  if (this.wasReached() && !isLoading) {
  		window.removeEventListener('scroll',onscroll);
			onInfiniteScroll();
  }
}

export default class InfiniteScroll extends Component{

	constructor(props){
		super(props);
	}

	wasReached(){
		const containerRef = this.refs.infiniteContainer;
		return (window.innerHeight + window.scrollY >= containerRef.offsetTop);
	}

	componentWillUpdate(nextProps){
		if(!nextProps.isLoading){

			onscroll = onscroll.bind(this);

			window.addEventListener('scroll', onscroll);
		}
	}

	componentDidMount(){

		onscroll = onscroll.bind(this);
		window.addEventListener('scroll', onscroll);
	}

	render(){
		return(
			<div ref="infiniteContainer" >
				<h2 className="text-center">
					{(this.props.isLoading ? this.props.loadingText : '')}
				</h2>
			</div>
		)
	}

}

InfiniteScroll.propTypes = {
	isLoading: React.PropTypes.bool,
	onInfiniteScroll: React.PropTypes.func.isRequired,
	loadingText: React.PropTypes.string
};

InfiniteScroll.defaultProps = {
	isLoading: false,
	loadingText: '...Carregando'
};

