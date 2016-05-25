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

	//quando o usuario navegava da pagina de criacao de posts para a pagina inicial
	// a referencia this.refs.infiniteContainer estava vindo como undefined aqui, dai a variavel global em window
	wasReached(){
		return (window.innerHeight + window.scrollY >= window.containerRef.offsetTop);
	}

	componentWillUpdate(nextProps){
		if(!nextProps.isLoading){

			onscroll = onscroll.bind(this);

			window.addEventListener('scroll', onscroll);
		}
	}

	componentDidMount(){
		console.log('did mount');
		window.containerRef = this.refs.infiniteContainer;
		onscroll = onscroll.bind(this);
		window.addEventListener('scroll', onscroll);
	}

	/**************************************************************************************
 		retirada do listener neste metodo eh essencial!
	***************************************************************************************/
	componentWillUnmount(){
		console.log('will umount');
		window.containerRef= null;
		// onscroll = onscroll.bind(this);  ****se inserir essa linha nao reconhecera o listener e carregara varios***
		window.removeEventListener('scroll', onscroll);
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

